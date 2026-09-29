export const contactErrors = {
  CONTACT_INVALID_REQUEST: { shortCode: "101", status: 400, message: "We couldn’t process that submission. Please refresh the page and try again." },
  CONTACT_VALIDATION_FAILED: { shortCode: "102", status: 422, message: "Please check the required fields and their length, then try again." },
  CONTACT_CAPTCHA_REQUIRED: { shortCode: "103", status: 403, message: "Please complete the verification below to continue." },
  CONTACT_CAPTCHA_FAILED: { shortCode: "104", status: 403, message: "Verification expired or was unsuccessful. Please verify again." },
  CONTACT_CAPTCHA_SERVICE_UNAVAILABLE: { shortCode: "201", status: 503, message: "We’re unable to verify your submission right now. Please try again shortly." },
  CONTACT_RATE_LIMITED: { shortCode: "105", status: 429, message: "You submitted recently. Wait a few minutes and try again." },
  CONTACT_RATE_LIMIT_SERVICE_UNAVAILABLE: { shortCode: "202", status: 503, message: "We’re unable to process enquiries right now. Please try again shortly." },
  CONTACT_DUPLICATE: { shortCode: "106", status: 409, message: "This enquiry has already been submitted or is being processed. Please wait before sending it again." },
  CONTACT_EMAIL_SERVICE_UNAVAILABLE: { shortCode: "203", status: 503, message: "We’re unable to send your enquiry right now. Please try again shortly." },
  CONTACT_INTERNAL_ERROR: { shortCode: "204", status: 500, message: "We’re unable to process your enquiry right now. Please try again shortly." },
} as const;

export type ContactErrorCode = keyof typeof contactErrors;
export type ContactResponse = { ok: true; referenceId: string } | {
  ok: false; code: ContactErrorCode; message: string; retryAfter?: number; requestId?: string;
};

export type Diagnostic = { service: "google" | "upstash" | "brevo" | "application"; reason: "configuration" | "authentication" | "quota" | "provider" | "network" | "timeout" | "malformed_response" | "unexpected"; status?: number; providerCode?: "invalid_parameter" | "missing_parameter" | "out_of_range" | "duplicate_parameter" | "unauthorized" | "permission_denied" | "not_enough_credits" | "unknown"; detail?: "sender_rejected" | "account_restricted" | "idempotency_rejected" | "recipient_rejected" | "request_rejected" };
export function httpReason(status: number): Diagnostic["reason"] {
  return status === 401 || status === 403 ? "authentication" : status === 429 ? "quota" : "provider";
}
export function networkReason(error: unknown): Diagnostic["reason"] {
  return error instanceof Error && ["TimeoutError", "AbortError"].includes(error.name) ? "timeout" : "network";
}

export class ContactError extends Error {
  constructor(public code: ContactErrorCode, public retryAfter?: number, public diagnostic?: Diagnostic) {
    super(code);
  }
}

export function errorResponse(error: unknown, requestId?: string): Response {
  const known = error instanceof ContactError ? error : new ContactError("CONTACT_INTERNAL_ERROR");
  const { status, message } = contactErrors[known.code];
  const retryAfter = known.retryAfter ?? (status >= 500 ? 60 : undefined);
  return Response.json({ ok: false, code: known.code, message, requestId, ...(retryAfter ? { retryAfter } : {}) }, {
    status,
    headers: { "Cache-Control": "no-store", ...(retryAfter ? { "Retry-After": String(retryAfter) } : {}) },
  });
}
