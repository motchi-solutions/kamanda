import { CompletionChecklist } from "./completion-checklist";
import { CaptchaChallenge } from "./captcha-challenge";
import type { ContactFormState } from "./use-contact-form";

export function ContactActions({ form }: { form: ContactFormState }) {
  const { challenge, challengeHeading, captchaReset, setV2Token, showError, setCaptchaReset, validationNotice,
    requirements, v2Token, busy, hydrated, notice } = form;
  return (
          <div>
            {challenge && (
              <div className="mb-6 rounded-lg border border-gold/40 bg-white p-4">
                <p ref={challengeHeading} tabIndex={-1} className="text-sm leading-6 text-navy">
                  Please complete the verification below to continue.
                </p>
                <CaptchaChallenge resetKey={captchaReset} onToken={setV2Token}
                  onError={() => showError("CONTACT_CAPTCHA_SERVICE_UNAVAILABLE")} />
                <button type="button" className="text-action mt-2" onClick={() => {
                  setV2Token(""); setCaptchaReset((value) => value + 1);
                }}>Reload verification</button>
              </div>
            )}
            {validationNotice && <p role="alert" className="mb-3 text-sm text-red-700">{validationNotice}</p>}
            <div className="contact-actions border-t border-carbon/10 pt-5">
            <div className="contact-actions-layout contact-actions-with-sidebar">
            <div className="min-w-0 lg:hidden"><CompletionChecklist form={form} /></div>
            <p id="contact-requirements" className="sr-only">
              {requirements.length ? `Complete: ${requirements.join(", ")}.`
                : challenge && !v2Token ? "Complete verification to send your enquiry."
                : busy ? "Sending your enquiry." : "Your enquiry is ready to send."}
            </p>
            <button type="submit" disabled={!hydrated || requirements.length > 0 || busy || (challenge && !v2Token)}
              aria-describedby="contact-requirements"
              className="btn btn-primary contact-submit w-full whitespace-nowrap disabled:cursor-not-allowed disabled:opacity-50" data-button>
              {busy ? "Sending…" : "Send Enquiry"}
            </button>
            </div>
            </div>
            <div className="mt-3 min-h-7 text-sm leading-6 text-navy sm:text-right" role="status" aria-live={busy ? "polite" : "off"}>
              {busy ? <span className="inline-flex items-center gap-2"><span className="contact-spinner" aria-hidden="true" />Sending your enquiry…</span>
                : null}
            </div>
            {notice && <div className="mt-3 text-sm leading-6 text-navy" role="status">
              <p>{notice.message}</p>{notice.reference && <p className="mt-1 break-words text-xs text-carbon/65">{notice.reference.length <= 3 ? "Error code" : "Reference"}: {notice.reference}</p>}
            </div>}
            <p className="mt-4 text-xs leading-5 text-carbon/65">
              This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy">Privacy Policy</a> and <a href="https://policies.google.com/terms">Terms of Service</a> apply.
            </p>
            <noscript><p className="mt-3 text-sm">Please enable JavaScript to verify and send your enquiry, or email info@kamandagroup.com.</p></noscript>
          </div>
  );
}
