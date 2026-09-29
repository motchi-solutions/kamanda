import "server-only";
import { emailIdempotencyKey } from "./idempotency";
import { messageHtml } from "./message-format";
import { ContactError, httpReason, networkReason, type Diagnostic } from "./errors";
import { isEmail, services, type Enquiry } from "./validation";

const company = "Kamanda Management LLC";
const escape = (value: string) => value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]!);
const row = (label: string, value: string) => `<tr><th scope="row" align="left" valign="top" style="padding:10px 12px 10px 0;border-bottom:1px solid #e5e7eb;color:#1b3a66;font-weight:600;width:30%">${label}</th><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;word-break:break-word">${value}</td></tr>`;
const frame = (title: string, content: string) => `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head><body style="margin:0;padding:0;background:#fafafa;color:#1e1e1e;font-family:Arial,Helvetica,sans-serif"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fafafa"><tr><td align="center" style="padding:24px 12px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-top:3px solid #c9a45d"><tr><td style="padding:28px 24px;font-size:15px;line-height:1.65"><table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 20px"><tr><td width="56" valign="middle" style="padding-right:12px"><a href="https://kamandagroup.com/" style="text-decoration:none"><img src="https://kamandagroup.com/brand/kamanda-logo.png" width="44" height="44" alt="Kamanda logo" style="display:block;border:0;width:44px;height:44px" /></a></td><td valign="middle" style="color:#1b3a66;font-weight:bold;font-size:15px;line-height:1.4">${company}</td></tr></table><h1 style="margin:0 0 24px;font-size:24px;color:#1b3a66">${title}</h1>${content}<p style="margin:28px 0 0;padding-top:18px;border-top:1px solid #e5e7eb;color:#80601f;font-size:13px">Building trust. Delivering value.</p></td></tr></table></td></tr></table></body></html>`;

export class EmailError extends ContactError {
  constructor(public ambiguous: boolean, reason: Diagnostic["reason"] = "malformed_response", status?: number) { super("CONTACT_EMAIL_SERVICE_UNAVAILABLE", ambiguous ? 900 : 60, { service: "brevo", reason, status }); }
}

export function emailConfig() {
  const key = process.env.BREVO_API_KEY;
  const sender = process.env.BREVO_SENDER_EMAIL || "no-reply@kamandagroup.com";
  const recipient = process.env.BREVO_RECIPIENT_EMAIL || "info@kamandagroup.com";
  if (!key || !isEmail(sender) || !isEmail(recipient)) throw new EmailError(false, "configuration");
  return { key, sender, recipient };
}

export async function sendEmail(data: Enquiry, referenceId: string, duplicateHash: string, confirmation = false) {
  const { key, sender, recipient } = emailConfig();
  const service = services[data.service];
  const internalRecipients = data.service === "technology-ai"
    ? [...new Set([recipient, "info@kamandagroup.com", "contact@motchi.ca"].map((email) => email.toLowerCase()))]
    : [recipient];
  const submittedAt = new Date();
  const submittedTimes = [
    { label: "Toronto", timeZone: "America/Toronto" },
    { label: "KSA", timeZone: "Asia/Riyadh" },
    { label: "UAE", timeZone: "Asia/Dubai" },
  ].map(({ label, timeZone }) => ({
    label,
    time: new Intl.DateTimeFormat("en-GB", {
      timeZone, day: "2-digit", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit", hourCycle: "h23", timeZoneName: "shortOffset",
    }).format(submittedAt),
  }));
  const submittedHtml = submittedTimes.map(({ label, time }) =>
    `<tr><td valign="top" style="padding:2px 12px 2px 0;color:#1b3a66;font-size:12px;font-weight:bold;white-space:nowrap">${label.toUpperCase()}</td><td style="padding:2px 0;font-size:13px">${escape(time)}</td></tr>`
  ).join("");
  const submittedText = submittedTimes.map(({ label, time }) => `${label.toUpperCase()}: ${time}`).join("\n");
  const name = escape(data.name);
  const businessRow = data.clientType === "business" ? row("Business Name", escape(data.businessName)) : "";
  const businessText = data.clientType === "business" ? `\nBusiness Name: ${data.businessName}` : "";
  const emailLabel = data.clientType === "business" ? "Business Email" : "Email";
  const summary = `<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:14px">${row("Reference", escape(referenceId))}${row("Service", escape(service))}${row("Subject", escape(data.subject))}${row("Name", name)}${businessRow}</table>`;
  const htmlContent = confirmation
    ? frame("Thank you for contacting us.", `<p>We’ve received your enquiry and a member of our team will review it.</p>${summary}<p>This is an automated email. For follow-up questions or additional details, contact <a href="mailto:info@kamandagroup.com?subject=${encodeURIComponent(`Enquiry ${referenceId}`)}" style="color:#1b3a66;text-decoration:underline">info@kamandagroup.com</a> and include your reference number <strong>${escape(referenceId)}</strong> so we can identify your enquiry.</p>`)
    : frame("New Website Enquiry", `<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:14px">${row("Reference", escape(referenceId))}${row("Name", name)}${businessRow}${row(emailLabel, `<a href="mailto:${escape(encodeURIComponent(data.email).replace("%40", "@"))}" style="color:#1b3a66">${escape(data.email)}</a>`)}${row("Phone", escape(data.phone || "Not provided"))}${row("Client Type", data.clientType === "business" ? "Business" : "Individual")}${row("Service", escape(service))}${row("Subject", escape(data.subject))}${row("Submitted", `<table role="presentation" cellpadding="0" cellspacing="0">${submittedHtml}</table>`)}</table><h2 style="margin-top:24px;font-size:18px;color:#1b3a66">Message</h2><div style="word-break:break-word">${messageHtml(data.message)}</div>`);
  const textContent = confirmation
    ? `${company}\n\nThank you for contacting us.\nWe’ve received your enquiry and a member of our team will review it.\n\nReference: ${referenceId}\nService: ${service}\nSubject: ${data.subject}\nName: ${data.name}${businessText}\n\nThis is an automated email. For follow-up questions or additional details, contact info@kamandagroup.com and include your reference number ${referenceId} so we can identify your enquiry.\n\nBuilding trust. Delivering value.`
    : `${company}\nNew Website Enquiry\n\nReference: ${referenceId}\nName: ${data.name}${businessText}\n${emailLabel}: ${data.email}\nPhone: ${data.phone || "Not provided"}\nClient Type: ${data.clientType}\nService: ${service}\nSubject: ${data.subject}\nSubmitted:\n${submittedText}\n\nMessage\n${data.message}`;
  let response: Response;
  try {
    response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST", headers: { "api-key": key, "Content-Type": "application/json", accept: "application/json" },
      cache: "no-store", signal: AbortSignal.timeout(8000),
      body: JSON.stringify({ sender: { name: company, email: sender },
        to: confirmation ? [{ email: data.email, name: data.name }] : internalRecipients.map((email) => ({ email })),
        replyTo: { email: confirmation ? recipient : data.email, name: confirmation ? company : data.name },
        subject: confirmation ? `We received your enquiry | ${company}` : `[Website Form] New Enquiry - ${data.name}`,
        htmlContent, textContent,
        headers: { idempotencyKey: emailIdempotencyKey(`${confirmation ? "confirmation" : "internal"}-${duplicateHash}`) },
      }),
    });
  } catch (error) { throw new EmailError(true, error instanceof SyntaxError ? "malformed_response" : networkReason(error)); }
  if (!response.ok) {
    const error = new EmailError(response.status >= 500, httpReason(response.status), response.status);
    try {
      const body: unknown = await response.json();
      if (body && typeof body === "object") {
        const { code, message } = body as { code?: unknown; message?: unknown };
        const allowed = ["invalid_parameter", "missing_parameter", "out_of_range", "duplicate_parameter", "unauthorized", "permission_denied", "not_enough_credits"];
        if (error.diagnostic) {
          error.diagnostic.providerCode = typeof code === "string" && allowed.includes(code)
            ? code as Diagnostic["providerCode"] : "unknown";
          // Classify provider text locally; never log its contents or submitted values.
          const text = typeof message === "string" ? message.toLowerCase() : "";
          error.diagnostic.detail = text.includes("idempot") ? "idempotency_rejected"
            : text.includes("sender") ? "sender_rejected"
            : text.includes("account") ? "account_restricted"
            : text.includes("recipient") ? "recipient_rejected" : "request_rejected";
          if (code === "not_enough_credits") error.diagnostic.reason = "quota";
          if (code === "unauthorized" || code === "permission_denied") error.diagnostic.reason = "authentication";
          // A duplicate idempotency key can mean the original send was accepted.
          if (code === "duplicate_parameter" && text.includes("idempot")) {
            error.ambiguous = true;
            error.retryAfter = 1800;
          }
        }
      }
    } catch { /* Preserve the safe HTTP diagnostic if the error body is unreadable. */ }
    throw error;
  }
  try {
    const result = await response.json();
    if (typeof result?.messageId !== "string") throw new Error();
  } catch { throw new EmailError(true); }
}
