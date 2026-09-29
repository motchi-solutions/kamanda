import "server-only";
import { emailIdempotencyKey } from "./idempotency";
import { after } from "next/server";
import { ContactError, contactErrors } from "./errors";

let nextAlert = 0;
const interval = 30 * 60 * 1000;

// Allowlisted diagnostics only: never serialize errors, request bodies, or provider URLs.
export function reportContactError(error: unknown, requestId: string, operation = "submission", referenceId?: string) {
  const known = error instanceof ContactError ? error : new ContactError("CONTACT_INTERNAL_ERROR");
  const event = {
    code: known.code, errorCode: contactErrors[known.code].shortCode, requestId, referenceId,
    operation, timestamp: new Date().toISOString(), environment: process.env.VERCEL_ENV || process.env.NODE_ENV,
    ...(known.diagnostic ?? { service: "application", reason: "unexpected" }),
  };
  if (contactErrors[known.code].status < 500) return;
  console.error(JSON.stringify(event));
  // Email outages must be handled by independent log monitoring, not the failing sender.
  if (event.service === "brevo" || process.env.VERCEL_ENV !== "production") return;
  after(async () => {
    if (Date.now() < nextAlert) return;
    nextAlert = Date.now() + interval;
    const bucket = Math.floor(Date.now() / interval);
    try {
      // Shared limit across instances; Brevo idempotency also protects Redis-outage fallback.
      const url = process.env.UPSTASH_REDIS_REST_URL;
      const token = process.env.UPSTASH_REDIS_REST_TOKEN;
      if (url && token && new URL(url).protocol === "https:") {
        const response = await fetch(url, {
          method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
          body: JSON.stringify(["SET", "kamanda:contact:admin-alert", "1", "EX", 1800, "NX"]),
          signal: AbortSignal.timeout(2000), cache: "no-store",
        });
        if (response.ok) {
          const result = await response.json();
          if (result?.result === null && !result.error) return;
        }
      }
    } catch { /* Retain local cooldown and provider idempotency during Redis outages. */ }
    try {
      const key = process.env.BREVO_API_KEY;
      if (!key) throw new Error();
      const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST", headers: { "api-key": key, "Content-Type": "application/json" },
        body: JSON.stringify({
          sender: { name: "Kamanda Website Monitoring", email: process.env.BREVO_SENDER_EMAIL || "no-reply@kamandagroup.com" },
          to: [{ email: "admin@motchi.ca" }],
          subject: `Kamanda contact form: ${event.errorCode} — ${event.service}`,
          textContent: `Contact form service failure\n\n${JSON.stringify(event, null, 2)}\n\nSearch server logs using requestId. Other failures during this alert window remain in logs. Alerts are limited to one per 30 minutes across error categories. No visitor data is included.`,
          headers: { idempotencyKey: emailIdempotencyKey(`admin-${bucket}`) },
        }), cache: "no-store", signal: AbortSignal.timeout(5000),
      });
      if (!response.ok) throw new Error();
    } catch {
      // Never recurse or alter the enquiry result if an alert fails.
      console.error(JSON.stringify({ code: "CONTACT_ADMIN_ALERT_FAILED", requestId, timestamp: new Date().toISOString() }));
    }
  });
}
