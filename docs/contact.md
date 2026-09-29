# Contact enquiries

The existing homepage form posts JSON to `/api/contact`. No enquiry database or marketing subscription is created. The Node runtime uses native fetch, crypto, and the providers' HTTPS APIs. `libphonenumber-js` supplies international phone metadata, as-you-type formatting, and shared number parsing; no phone data is sent to an external lookup service.

## Environment and manual setup

The complete variable list is in the README. Keep secret values in `.env.local` locally and Vercel environment settings, never in Git. `NEXT_PUBLIC_*` keys are public and embedded at build time; redeploy after changing them. Configure Production and Preview separately, with separate test-provider resources where appropriate.

1. **Google reCAPTCHA Enterprise:** keep the reCAPTCHA Enterprise API enabled. Create a Google Cloud API key in `GCP_PROJECT_ID`, restrict it to **reCAPTCHA Enterprise API**, and store it server-side as `GOOGLE_RECAPTCHA_API_KEY`. Use Enterprise score-based and checkbox website keys from that project for the two public site-key variables; enable domain validation. Local `.env.local` uses Dev site keys and `RECAPTCHA_ALLOWED_HOSTNAMES=localhost`. Vercel Production uses Prod site keys and `RECAPTCHA_ALLOWED_HOSTNAMES=kamandagroup.com,www.kamandagroup.com`. Register the corresponding domains on each site key. Keep Preview keys/hosts separate; never allow arbitrary preview domains or production test keys. Set `RECAPTCHA_V3_MIN_SCORE=0.5` unless deliberately tuning it. Allowed hostnames are exact comma-separated values without schemes or wildcards; an explicit list replaces the fallback `SITE_URL` hostname. The API key authenticates server requests, so do not apply browser HTTP-referrer restrictions to it.
2. **Upstash:** use the existing Redis database and its REST URL/token. It must support Redis EVAL, GET, INCR, EXPIRE, TTL, EXISTS, SET, and DEL. Generate an independent random `CONTACT_HASH_SALT` of at least 32 characters (for example, `openssl rand -hex 32`). Keep it stable across instances; changing it resets effective rate-limit/duplicate identities. Redis stores only HMAC keys, counters, lock ownership IDs, and completion markers with TTLs—never enquiry contents or raw email/IP values. Provider storage encryption/access controls should remain enabled.
3. **Brevo:** enable transactional email, verify `no-reply@kamandagroup.com` or its sending domain, and configure the required SPF/DKIM/DMARC records from the account. Set the transactional API key (not an SMTP password), sender, and recipient. Verify delivery to `info@kamandagroup.com`, visitor inboxes, and spam folders. The code only calls `/v3/smtp/email`; it never adds Contacts or marketing lists. An API acceptance is not a delivery guarantee; use Brevo's transactional logs/bounce reporting for operational follow-up.
4. **Vercel:** configure all variables and deploy. The Node route allows up to 60 seconds; individual requests have bounded timeouts. Only on Vercel (`VERCEL=1`) does the server trust `x-vercel-forwarded-for`, which must contain a single valid IP. In local development it uses the loopback address; production outside Vercel fails closed until a trusted hosting-adapter IP source is implemented. Never fall back to arbitrary `x-forwarded-for`. Ensure any upstream proxy arrangement follows Vercel's trusted-proxy documentation. Allow Google's script/frame/connect resources if adding a CSP; no CSP relaxation is added here.

Missing provider configuration returns generic application errors. No real emails or provider calls were used for automated validation in this implementation.

## Security and request order

1. Require an allowed Origin and JSON Content-Type; read at most 32 KiB with a five-second body timeout.
2. Validate required name/email/client type/service/message, business name for business enquiries, optional phone, and CAPTCHA version/token. Reject unknown fields, invalid choices, control/header injection, oversized values, malformed JSON, and the hidden website honeypot.
3. Apply one atomic Redis Lua check across IP, normalized-email, and burst limits.
4. Verify CAPTCHA server-side through `POST https://recaptchaenterprise.googleapis.com/v1/projects/{GCP_PROJECT_ID}/assessments?key={GOOGLE_RECAPTCHA_API_KEY}`. Send `event.token` and the version-specific public `event.siteKey`; score-based requests also send `event.expectedAction=contact_form`. Require `tokenProperties.valid` and an allowed hostname. For v3 also check the returned action and `riskAnalysis.score` against the threshold. Google enforces token single-use and expiry. Checkbox assessments do not require a score.
5. Atomically check the completed duplicate fingerprint and reserve a pending fingerprint lock. This reservation prevents concurrent requests from sending the same internal email. It is not a completed-submission marker.
6. Generate a random public reference, then send the internal notification followed by the visitor confirmation.
7. Only after internal acceptance, mark the completed duplicate key for 15 minutes and remove the reservation. If confirmation or final Redis marking fails, still return success: the enquiry has been accepted and the pending reservation remains until TTL expiry if needed.

Limits count attempts (including the v3 and v2 stages), not just successful emails:

| Limit | Policy |
| --- | --- |
| IP | 5 attempts / 10 minutes |
| Normalized email | 3 attempts / 30 minutes |
| IP burst | 2 attempts / 60 seconds |
| Normalized duplicate content | 15 minutes |

The fixed-window counters increment atomically only when all checks allow the attempt. A v3-to-v2 flow fits into the two-attempt burst allowance; further retries may need to wait. Only generic timing is returned, never the limiting identity. HMAC-SHA256 protects Redis key material. Service failure fails closed with HTTP 503 rather than bypassing protections.

For an internal email's explicit rejection, release the pending reservation to permit a later retry. For a timeout/5xx or malformed success response, acceptance is ambiguous: retain the 15-minute reservation and return a generic error with a 15-minute retry interval. This favors preventing duplicate internal mail over immediate retries. Brevo receives an additional deterministic, fingerprint-based `idempotencyKey` per email type. Exactly-once delivery across arbitrary provider/process failures is not promised without durable enquiry storage, which is deliberately out of scope. Monitor minimal error codes and provider dashboards for ambiguous sends. Logs exclude submitted values, CAPTCHA tokens, and credentials.

## CAPTCHA and UI

Load `enterprise.js` on the first submission and call `grecaptcha.enterprise.execute` with the score-based site key and action `contact_form`. Generate a fresh token on each v3 attempt. Only `CONTACT_CAPTCHA_REQUIRED` (low score) reveals the compact checkbox through `grecaptcha.enterprise.render`. While it is displayed, v3 is not executed. Verify its token through the same Enterprise assessment endpoint with the checkbox site key; reset the checkbox after each request or expiry. Invalid tokens, action mismatches, and disallowed hostnames return `CONTACT_CAPTCHA_FAILED`. Script/network/configuration failures, Google authentication/quota errors, and malformed assessment responses return `CONTACT_CAPTCHA_SERVICE_UNAVAILABLE`. Provider details are never returned publicly.

The Individual/Business choice appears first under Your Details. Contact fields expand after selection; Business adds a required Business Name and labels email as Business Email. Hidden fields are disabled and inert, transitions respect reduced motion, and entered values survive switching types. Business name is validated server-side, included in both email formats, and part of the duplicate fingerprint.

All field values remain on recoverable errors. Busy state prevents duplicate clicks. Failed service submissions offer a copyable email fallback, without a countdown or toast. Success replaces the form with a confirmation panel and reference. Server rate limits remain authoritative. Without JavaScript submission stays disabled.

The internal email uses the visitor as Reply-To and the configured Kamanda sender as From. Visitor confirmation uses the same From and the Kamanda recipient as Reply-To. Both have escaped, table-based HTML and plaintext versions, a shared reference, and no external fonts/styles. Confirmation omits the message body.

## Public error codes

| Code | HTTP |
| --- | --- |
| CONTACT_INVALID_REQUEST | 400 |
| CONTACT_VALIDATION_FAILED | 422 |
| CONTACT_CAPTCHA_REQUIRED | 403 |
| CONTACT_CAPTCHA_FAILED | 403 |
| CONTACT_CAPTCHA_SERVICE_UNAVAILABLE | 503 |
| CONTACT_RATE_LIMITED | 429 |
| CONTACT_RATE_LIMIT_SERVICE_UNAVAILABLE | 503 |
| CONTACT_DUPLICATE | 409 |
| CONTACT_EMAIL_SERVICE_UNAVAILABLE | 503 |
| CONTACT_INTERNAL_ERROR | 500 |

Errors are `{ ok: false, code, message, requestId, retryAfter? }`. Success is `{ ok: true, referenceId }`. Temporary errors include Retry-After; rate-limit and duplicate responses include their wait. Responses are not cached. Internal-only diagnostic codes cover confirmation failure and duplicate lock finalization/release; they are never provider response bodies.

## Public quotas checked 2026-09-28

These are documentation, not application logic. Confirm the actual account plan and current dashboard before launch:

- [Google reCAPTCHA pricing](https://cloud.google.com/security/products/recaptcha): the Cloud offering lists 10,000 free monthly assessments. [Billing documentation](https://docs.cloud.google.com/recaptcha/docs/billing-information) describes errors after the free allowance without billing. Enterprise API quota/authentication errors fail closed with the generic unavailable code.
- [Upstash Redis pricing](https://upstash.com/pricing/redis): the free tier lists 500,000 commands/month and 256 MB data. A submission consumes multiple commands; do not interpret this as a submission quota.
- [Brevo pricing plans](https://help.brevo.com/hc/en-us/articles/208589409-About-Brevo-s-pricing-plans): the Free plan lists 300 daily email sends. A standard successful enquiry uses two recipient deliveries; Technology & AI Adoption normally uses three, plus any additional configured recipient. Admin alerts also share the account quota. Internal acceptance remains success if the confirmation hits a limit.

Implementation references: [Enterprise score integration](https://docs.cloud.google.com/recaptcha/docs/instrument-web-pages), [Enterprise checkbox integration](https://docs.cloud.google.com/recaptcha/docs/instrument-web-pages-with-checkbox), [Enterprise assessments and API-key authentication](https://docs.cloud.google.com/recaptcha/docs/create-assessment-website), [Upstash REST](https://upstash.com/docs/redis/features/restapi), [Vercel request headers](https://vercel.com/docs/headers/request-headers), [Brevo transactional mail](https://developers.brevo.com/docs/send-a-transactional-email), and [Brevo idempotency](https://developers.brevo.com/docs/heterogenous-versions-batch-emails).

## Focused manual verification after setup

Use a staging inbox and separate keys: check v3 acceptance, low-score v2 fallback, expired/invalid tokens, wrong action/hostname, two simultaneous identical submissions, all rate limits, malformed/oversized requests, provider outages/quotas, internal-email failure, and confirmation-only failure. Check keyboard/mobile verification, retry timing, error-panel recovery, and reduced motion. Inspect both email formats and Reply-To in real email clients. No full build/browser QA or live-provider tests are part of the lint-only implementation pass.

## Form fields and validation

Required fields have a red asterisk and a text explanation. Send Enquiry stays disabled until required details are valid and any supplied phone/extension is valid. A live list immediately above the button explains remaining requirements, including conditional business fields; checkbox guidance explains when verification is needed. Native browser and server validation remain in place before sending. Busy and pending checkbox states prevent client submission; server rate limits reject excess attempts. Subject is required (up to 150 characters); message is required (20–4,000 characters after server normalization/trimming) with a visible counter. Phone is optional, with a country selector, as-you-type formatting, and an optional digits-only extension (up to 10 digits, requiring a phone number). The server validates phone length against country metadata and stores the number in international format in the email, including its extension. Subject and phone are included in duplicate detection. No enquiry storage is added.

Phone formatting reference: [libphonenumber-js](https://github.com/catamphetamine/libphonenumber-js). Required-field and submission guidance follows [W3C form validation guidance](https://www.w3.org/WAI/tutorials/forms/validation/).

## Client error codes and admin alerts

Clients see actionable messages and a short code in the failure panel; technical diagnostics remain private. Service failures use: **201** verification unavailable, **202** processing/rate-limit service unavailable, **203** email unavailable, **204** unexpected failure. Internal mappings also reserve 101 invalid request, 102 validation, 103 checkbox required, 104 invalid verification, 105 rate limited, and 106 duplicate. The structured API keeps descriptive codes for application logic; provider details remain private. Success references remain unchanged.

Each server request gets a UUID returned as `requestId` in error responses and included in service-error logs. Client-side script/network errors cannot automatically generate server alerts when the request never reaches the server. Logs contain the descriptive and short codes, request ID, timestamp, environment, operation, and safe diagnostic category (configuration, authentication, quota, timeout, network, provider, malformed response, or unexpected), with upstream HTTP status when available. No credentials, provider bodies, URLs containing secrets, or visitor form data are logged or emailed.

On Vercel Production, non-Brevo service failures schedule a Brevo email to **admin@motchi.ca** using Next.js `after`, without delaying the response. Existing Brevo sender/key configuration is reused. Normal validation/CAPTCHA rejection, rate limits, and duplicates do not email. All service failures remain in logs; email is limited across categories by a Redis 30-minute lock and a local cooldown. If Redis fails, local cooldown plus a shared Brevo idempotency key per 30-minute bucket provides best-effort deduplication across instances (window boundaries may allow adjacent alerts). Suppressed events are not queued or emailed as a digest. Alert failures only log `CONTACT_ADMIN_ALERT_FAILED` and never recurse or change submission success.

**Manual production monitoring step:** configure an independent hosting/log-monitor alert to email admin@motchi.ca for Brevo service errors and `CONTACT_ADMIN_ALERT_FAILED`, plus elevated contact-route 5xx responses. This is required to cover Brevo outages, runtime failures before the handler runs, and exhausted email quota. No independent monitoring account is configured by this code. Production admin emails have not been sent as part of validation. Preview/local errors log only.

References: [Next.js after](https://nextjs.org/docs/app/api-reference/functions/after), [Brevo idempotency](https://developers.brevo.com/docs/heterogenous-versions-batch-emails).

Enquiry HTML emails support a limited message-formatting subset: `[link text](https://example.com)` for HTTP(S) links, and lines beginning with `- `, `* `, or `• ` for bullets. Raw HTML and unsupported syntax remain escaped text; credential-bearing URLs are not linked. No images, embedded content, or arbitrary HTML are accepted. Plaintext emails retain the original message syntax. Confirmation emails continue to omit the message body.

The message box uses Tiptap with only paragraphs, bullet lists, and links enabled. Bullet shortcuts and Markdown-style links render inline while typing; pasted text uses the same safe formatting subset as email. No separate preview is shown. The editor serializes to the existing message payload; the 4,000-character cap includes formatting syntax. Raw pasted HTML is ignored in favor of plain text. Editor dependencies are `@tiptap/react`, `@tiptap/core`, `@tiptap/pm`, `@tiptap/starter-kit`, `@tiptap/extension-link`, and `@tiptap/extension-placeholder`.

## Source organization

The contact section lives in `src/components/pages/home/contact/`: `contact.tsx` composes the section, `contact-form.tsx` wires form events, `use-contact-form.ts` owns submission/state, `contact-details.tsx` groups identity/phone fields, `enquiry-fields.tsx` groups service/subject/message, and `contact-actions.tsx` owns verification and submission feedback. Phone, editor, CAPTCHA, and required-marker components are colocated. Shared client completion checks live in `src/lib/contact/form-requirements.ts`; server validation and provider integrations remain in `src/lib/contact/`.

Technology & AI Adoption (`technology-ai`) internal notifications include `info@kamandagroup.com` and `contact@motchi.ca`, plus the configured internal recipient if different; duplicate addresses are removed. Other services retain the configured Kamanda recipient. The visitor confirmation remains a separate email to the visitor only. This adds an internal recipient for Technology & AI Adoption enquiries and increases email quota usage accordingly.

Brevo idempotency keys use deterministic UUID v5 values, as required by its API. Internal notifications, confirmations, and admin alerts use separate namespaces within the input string; retries preserve the same UUID.

Both enquiry email templates use the public PNG logo at `https://kamandagroup.com/brand/kamanda-logo.png` beside the company name. Confirmation emails direct follow-ups to `info@kamandagroup.com` with the enquiry reference; the HTML email pre-fills that reference in the mailto subject. Plaintext includes the same follow-up instructions.

## Submission recovery and confirmation

The current form preserves all entered values after failure. Failures replace the visible form with a clearly marked error panel and an email fallback addressed to info@kamandagroup.com (also admin@motchi.ca for Technology & AI Adoption), with separately copyable subject and complete enquiry details/message. Copy failure leaves selectable read-only text for manual copying. There are no form toasts or client countdowns. A network timeout is described as an unconfirmed submission, since the internal email might already have been accepted.

Success replaces the form with a confirmation panel, reference, follow-up address, and Send another enquiry button. The server remains authoritative: existing IP/email/burst attempt limits and duplicate detection remain, plus an atomic IP cooldown reserved only after CAPTCHA verification. Successful sends refresh a 60-second cooldown; known rejected sends release their owned cooldown, while ambiguous sends retain duplicate protection. This allows the score-to-checkbox CAPTCHA flow without consuming a successful-submission cooldown. Rate-limit errors say “You submitted recently. Wait a few minutes and try again.” No browser fingerprinting is added.

Submission errors now replace the visible form with a clearly marked error panel. Fields remain mounted but hidden/inert so Try again restores all entered values and rich-text state. CAPTCHA-required responses still reveal verification inline. Direct-email drafts append “I am sending this directly since the contact form had error XYZ.” using the three-digit code; both copy actions and the prefilled mailto include it. The panel asks users to report persistent issues to info@kamandagroup.com.

After a client-visible failure, the form caches its error code for a fixed 60-second window using a monotonic clock. Resubmitting during that window reuses the error without executing CAPTCHA or calling the API; retries do not extend the window. Try again still restores the populated form, and direct-email content reflects the current field values. After expiry, the next valid submission performs a fresh request. This cache is in-memory only and is a UX optimization, not a security control; server rate limits remain authoritative across reloads and clients.

Production hostname configuration must include `www.kamandagroup.com` because the live apex domain redirects to www. Ensure Google site-key domain settings allow the live hostname as well. Keep localhost limited to development configuration.

At viewport widths of 1024px and above (matching the two-column contact grid), the live completion checklist sits below the introduction in the left column and sticks beneath the navbar within the contact section. It is hidden for success and error panels. Narrower layouts keep the same checklist above the full-width submit button. Shared form state is owned by the contact section so both placements stay synchronized.
