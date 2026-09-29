import "server-only";
import { createHmac, randomUUID } from "node:crypto";
import { isIP } from "node:net";
import { ContactError, httpReason, networkReason, type Diagnostic } from "./errors";
import type { Enquiry } from "./validation";

export const limits = { ip: [5, 600], email: [3, 1800], burst: [2, 60], duplicate: 900 } as const;
const unavailable = (reason: Diagnostic["reason"] = "malformed_response", status?: number) => new ContactError("CONTACT_RATE_LIMIT_SERVICE_UNAVAILABLE", undefined, { service: "upstash", reason, status });

export function fingerprint(value: string): string {
  const salt = process.env.CONTACT_HASH_SALT;
  if (!salt || salt.length < 32) throw unavailable("configuration");
  return createHmac("sha256", salt).update(value).digest("hex");
}

async function redis(command: (string | number)[]): Promise<unknown> {
  try {
    const url = process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN;
    if (!url || new URL(url).protocol !== "https:" || !token) throw unavailable("configuration");
    const response = await fetch(url, { method: "POST", headers: {
      Authorization: `Bearer ${token}`, "Content-Type": "application/json",
    }, body: JSON.stringify(command), cache: "no-store", signal: AbortSignal.timeout(4000) });
    if (!response.ok) throw unavailable(httpReason(response.status), response.status);
    const body = await response.json();
    if (!body || typeof body !== "object" || body.error || !("result" in body)) throw unavailable();
    return body.result;
  } catch (error) { throw error instanceof ContactError ? error : unavailable(error instanceof SyntaxError ? "malformed_response" : networkReason(error)); }
}

const rateScript = `
if redis.call('EXISTS', KEYS[4]) == 1 then return math.max(redis.call('TTL', KEYS[4]), 1) end
local retry = 0
for i = 1, 3 do
  local key = KEYS[i]
  local count = tonumber(redis.call('GET', key) or '0')
  if count >= tonumber(ARGV[(i-1)*2+1]) then
    retry = math.max(retry, redis.call('TTL', key), 1)
  end
end
if retry > 0 then return retry end
for i = 1, 3 do
  local key = KEYS[i]
  local count = redis.call('INCR', key)
  if count == 1 then redis.call('EXPIRE', key, ARGV[(i-1)*2+2]) end
end
return 0`;

export async function rateLimit(request: Request, email: string): Promise<string> {
  // Vercel supplies this header. Never accept client-forwarded IPs on another host.
  const raw = process.env.VERCEL === "1" ? request.headers.get("x-vercel-forwarded-for")?.trim()
    : process.env.NODE_ENV === "development" ? "127.0.0.1" : undefined;
  if (!raw || !isIP(raw)) throw unavailable("configuration");
  const ip = isIP(raw) === 6 ? new URL(`http://[${raw}]`).hostname : raw;
  const ipHash = fingerprint(`ip:${ip}`);
  const cooldown = `kamanda:contact:cooldown:${ipHash}`;
  const result = await redis(["EVAL", rateScript, 4,
    `kamanda:contact:ip:${ipHash}`, `kamanda:contact:email:${fingerprint(`email:${email}`)}`,
    `kamanda:contact:burst:${ipHash}`, cooldown, ...limits.ip, ...limits.email, ...limits.burst]);
  if (typeof result !== "number" || !Number.isFinite(result)) throw unavailable();
  if (result > 0) throw new ContactError("CONTACT_RATE_LIMITED", result);
  return cooldown;
}

const reserveScript = `
if redis.call('EXISTS', KEYS[1]) == 1 then return 0 end
if redis.call('EXISTS', KEYS[3]) == 1 then return -1 end
if redis.call('SET', KEYS[2], ARGV[1], 'EX', ARGV[2], 'NX') then
  redis.call('SET', KEYS[3], ARGV[1], 'EX', 60)
  return 1
end
return 0`;

export async function reserveDuplicate(data: Enquiry, cooldown: string) {
  const normalized = [data.email, data.name, data.businessName, data.phone, data.clientType, data.service, data.subject, data.message]
    .map((value) => value.normalize("NFKC").trim().replace(/\s+/g, " ").toLowerCase());
  const hash = fingerprint(JSON.stringify(normalized));
  const key = `kamanda:contact:duplicate:${hash}`;
  const pending = `${key}:pending`;
  const owner = randomUUID();
  const reserved = await redis(["EVAL", reserveScript, 3, key, pending, cooldown, owner, limits.duplicate]);
  if (reserved === -1) throw new ContactError("CONTACT_RATE_LIMITED", 60);
  if (reserved === 0) throw new ContactError("CONTACT_DUPLICATE", limits.duplicate);
  if (reserved !== 1) throw unavailable();
  return { key, pending, owner, hash, cooldown };
}

export async function acceptDuplicate(reservation: Awaited<ReturnType<typeof reserveDuplicate>>) {
  const result = await redis(["EVAL", `
if redis.call('GET', KEYS[2]) ~= ARGV[1] then return 0 end
redis.call('SET', KEYS[1], '1', 'EX', ARGV[2])
redis.call('DEL', KEYS[2])
if redis.call('GET', KEYS[3]) == ARGV[1] or redis.call('EXISTS', KEYS[3]) == 0 then
  redis.call('SET', KEYS[3], ARGV[1], 'EX', 60)
end
return 1`, 3, reservation.key, reservation.pending, reservation.cooldown, reservation.owner, limits.duplicate]);
  if (result !== 1) throw unavailable();
}

export async function releaseDuplicate(reservation: Awaited<ReturnType<typeof reserveDuplicate>>) {
  await redis(["EVAL", `
if redis.call('GET', KEYS[2]) == ARGV[1] then redis.call('DEL', KEYS[2]) end
if redis.call('GET', KEYS[1]) == ARGV[1] then return redis.call('DEL', KEYS[1]) end return 0`,
    2, reservation.pending, reservation.cooldown, reservation.owner]);
}
