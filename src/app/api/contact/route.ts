import { reportContactError } from "@/lib/contact/alerts";
import { randomBytes, randomUUID } from "node:crypto";
import { allowedHostnames, verifyCaptcha } from "@/lib/contact/captcha";
import { ContactError, errorResponse } from "@/lib/contact/errors";
import { emailConfig, EmailError, sendEmail } from "@/lib/contact/email";
import { acceptDuplicate, rateLimit, releaseDuplicate, reserveDuplicate } from "@/lib/contact/rate-limit";
import { validate } from "@/lib/contact/validation";

export const runtime = "nodejs";
export const maxDuration = 60;
const maxBodyBytes = 32 * 1024;

async function readBody(request: Request): Promise<unknown> {
  if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json" ||
    Number(request.headers.get("content-length")) > maxBodyBytes || !request.body) {
    throw new ContactError("CONTACT_INVALID_REQUEST");
  }
  const reader = request.body.getReader();
  let timer: ReturnType<typeof setTimeout> | undefined;
  const consume = async () => {
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maxBodyBytes) throw new ContactError("CONTACT_INVALID_REQUEST");
      chunks.push(value);
    }
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
    return JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes)) as unknown;
  };
  try {
    return await Promise.race([consume(), new Promise<never>((_, reject) => {
      timer = setTimeout(() => reject(new ContactError("CONTACT_INVALID_REQUEST")), 5000);
    })]);
  } catch { throw new ContactError("CONTACT_INVALID_REQUEST"); }
  finally { clearTimeout(timer); void reader.cancel().catch(() => {}); }
}

export async function POST(request: Request) {
  const requestId = randomUUID();
  try {
    // Only this site's browser origins may submit; never derive trust from Host/XFF.
    const origin = request.headers.get("origin");
    if (!origin) throw new ContactError("CONTACT_INVALID_REQUEST");
    let source: URL;
    try { source = new URL(origin); } catch { throw new ContactError("CONTACT_INVALID_REQUEST"); }
    if (!allowedHostnames().includes(source.hostname) ||
      (source.protocol !== "https:" && !(process.env.NODE_ENV === "development" && source.protocol === "http:"))) {
      throw new ContactError("CONTACT_INVALID_REQUEST");
    }
    const data = validate(await readBody(request));
    if (data.website) throw new ContactError("CONTACT_INVALID_REQUEST");
    const cooldown = await rateLimit(request, data.email);
    await verifyCaptcha(data);
    emailConfig();
    const reservation = await reserveDuplicate(data, cooldown);
    const referenceId = `KAM-${new Date().toISOString().slice(0, 10).replaceAll("-", "")}-${randomBytes(6).toString("hex").toUpperCase()}`;
    try {
      await sendEmail(data, referenceId, reservation.hash);
    } catch (error) {
      // A timeout/5xx may follow acceptance. Keep the reservation to prevent double sends.
      if (error instanceof EmailError && !error.ambiguous) {
        try { await releaseDuplicate(reservation); }
        catch (error) { reportContactError(error, requestId, "duplicate_release", referenceId); }
      }
      throw error;
    }
    try { await sendEmail(data, referenceId, reservation.hash, true); }
    catch (error) { reportContactError(error, requestId, "confirmation_email", referenceId); }
    try { await acceptDuplicate(reservation); }
    catch (error) { reportContactError(error, requestId, "duplicate_finalization", referenceId); }
    // Internal acceptance is final, even if confirmation or Redis finalization fails.
    return Response.json({ ok: true, referenceId }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    reportContactError(error, requestId);
    return errorResponse(error, requestId);
  }
}
