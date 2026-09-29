import "server-only";
import { getBaseUrl } from "@/lib/site";
import { ContactError, httpReason, networkReason, type Diagnostic } from "./errors";
import type { Submission } from "./validation";

export function allowedHostnames(): string[] {
  const configured = (process.env.RECAPTCHA_ALLOWED_HOSTNAMES ?? "")
    .split(",").map((host) => host.trim().toLowerCase()).filter(Boolean);
  return [...new Set(configured.length ? configured : [new URL(getBaseUrl()).hostname])];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

export async function verifyCaptcha(data: Submission): Promise<void> {
  const unavailable = (reason: Diagnostic["reason"] = "malformed_response", status?: number) => new ContactError("CONTACT_CAPTCHA_SERVICE_UNAVAILABLE", undefined, { service: "google", reason, status });
  const project = process.env.GCP_PROJECT_ID?.trim();
  const apiKey = process.env.GOOGLE_RECAPTCHA_API_KEY?.trim();
  const siteKey = data.recaptchaVersion === "v3"
    ? process.env.NEXT_PUBLIC_RECAPTCHA_V3_SITE_KEY : process.env.NEXT_PUBLIC_RECAPTCHA_V2_SITE_KEY;
  const threshold = Number(process.env.RECAPTCHA_V3_MIN_SCORE?.trim() || "0.5");
  if (!project || !apiKey || !siteKey || !Number.isFinite(threshold) || threshold < 0 || threshold > 1) throw unavailable("configuration");
  let result: Record<string, unknown>;
  try {
    const url = new URL(`https://recaptchaenterprise.googleapis.com/v1/projects/${encodeURIComponent(project)}/assessments`);
    url.searchParams.set("key", apiKey);
    const response = await fetch(url, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event: {
        token: data.recaptchaToken, siteKey,
        ...(data.recaptchaVersion === "v3" ? { expectedAction: "contact_form" } : {}),
      } }),
      cache: "no-store", signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw unavailable(httpReason(response.status), response.status);
    const json: unknown = await response.json();
    if (!isRecord(json) || json.error) throw unavailable();
    result = json;
  } catch (error) { throw error instanceof ContactError ? error : unavailable(error instanceof SyntaxError ? "malformed_response" : networkReason(error)); }
  const properties = result.tokenProperties;
  if (!isRecord(properties)) throw unavailable();
  // Protobuf JSON can omit false defaults on invalid tokens.
  if (properties.valid === false || (properties.valid === undefined && typeof properties.invalidReason === "string")) {
    throw new ContactError("CONTACT_CAPTCHA_FAILED");
  }
  if (properties.valid !== true) throw unavailable();
  if (typeof properties.hostname !== "string" || !allowedHostnames().includes(properties.hostname.toLowerCase())) {
    throw new ContactError("CONTACT_CAPTCHA_FAILED");
  }
  if (data.recaptchaVersion === "v3") {
    if (properties.action !== "contact_form") throw new ContactError("CONTACT_CAPTCHA_FAILED");
    const risk = result.riskAnalysis;
    if (!isRecord(risk) || typeof risk.score !== "number" || !Number.isFinite(risk.score) || risk.score < 0 || risk.score > 1) throw unavailable();
    if (risk.score < threshold) throw new ContactError("CONTACT_CAPTCHA_REQUIRED");
  }
}
