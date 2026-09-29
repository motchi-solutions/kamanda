import { useEffect, useRef } from "react";
import { LuCircleAlert, LuMail, LuRotateCcw } from "react-icons/lu";
import type { EmailDraft } from "@/lib/contact/email-draft";
import { EmailFallback } from "./email-fallback";

export function ContactFailure({ draft, message, code, onRetry }: {
  draft: EmailDraft; message: string; code?: string; onRetry: () => void;
}) {
  const mailto = `mailto:${draft.recipients.join(",")}?subject=${encodeURIComponent(draft.subject)}&body=${encodeURIComponent(draft.body)}`;
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => { heading.current?.focus(); }, []);
  return <section className="contact-form rounded-lg border border-red-200 bg-white p-5 sm:p-6" aria-labelledby="contact-failure-heading">
    <div className="flex items-start gap-3">
      <LuCircleAlert className="mt-0.5 h-6 w-6 shrink-0 text-red-700" aria-hidden="true" />
      <div>
        <h3 ref={heading} tabIndex={-1} id="contact-failure-heading" className="font-display text-xl font-semibold text-red-800">There was a problem submitting your enquiry.</h3>
        <p className="mt-2 text-sm leading-6 text-carbon/75">{message}</p>
      </div>
    </div>
    <p className="mt-4 text-sm leading-6 text-carbon/75">Your details are saved on this page. Return to your completed form to try again, or send them directly to {draft.recipients.map((email, index) => <span key={email}>
      {index > 0 ? " and " : ""}<a href={mailto} className="break-words font-semibold text-navy underline underline-offset-4" aria-describedby="email-action-help">{email}</a>
    </span>)}.</p>
    <div className="mt-5 grid gap-3 sm:grid-cols-2">
      <button type="button" className="btn btn-primary gap-2" onClick={onRetry}>
        <LuRotateCcw className="h-4 w-4" aria-hidden="true" />Try again
      </button>
      <a className="btn btn-secondary gap-2" data-button
        href={mailto}
        aria-describedby="email-action-help">
        <LuMail className="h-4 w-4" aria-hidden="true" />Send by email
      </a>
    </div>
    <p id="email-action-help" className="mt-3 text-xs leading-5 text-carbon/65">Opens your email app with your subject, details, message, and error code filled in. Review it and select Send. If the issue persists, please let us know.</p>
    <p className="mt-2 text-xs leading-5 text-carbon/65">Please allow 60 seconds before resubmitting. Earlier retries show the same result; you can email us at any time.</p>
    {code && <p className="mt-2 text-xs text-carbon/65">Error code: {code}</p>}
    <details className="mt-4 border-t border-carbon/10 pt-3">
      <summary className="cursor-pointer py-2 text-sm font-medium text-navy">Email app didn’t open? Copy your enquiry</summary>
      <EmailFallback draft={draft} />
    </details>
  </section>;
}
