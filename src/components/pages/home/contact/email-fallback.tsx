import { useState } from "react";
import type { EmailDraft } from "@/lib/contact/email-draft";

export function EmailFallback({ draft }: { draft: EmailDraft }) {
  const [copyStatus, setCopyStatus] = useState("");
  async function copy(value: string, label: string) {
    try { await navigator.clipboard.writeText(value); setCopyStatus(`${label} copied.`); }
    catch { setCopyStatus("Select the text below and copy it manually."); }
  }
  return <section className="mt-4 rounded-lg border border-navy/15 bg-white p-4" aria-label="Send your enquiry by email">
    <p className="text-sm leading-6 text-carbon/75">Send your enquiry to <a className="font-semibold text-navy underline" href={`mailto:${draft.recipients.join(",")}?subject=${encodeURIComponent(draft.subject)}&body=${encodeURIComponent(draft.body)}`}>{draft.recipients.join(" and ")}</a> using the subject and message below.</p>
    <div className="mt-4">
      <div className="flex items-center justify-between gap-3">
        <label htmlFor="fallback-subject" className="form-label">Email subject</label>
        <button type="button" className="min-h-9 text-xs font-medium text-navy underline" onClick={() => void copy(draft.subject, "Subject")}>Copy subject</button>
      </div>
      <input id="fallback-subject" readOnly value={draft.subject} className="form-control" onFocus={(event) => event.currentTarget.select()} />
    </div>
    <div className="mt-3">
      <div className="flex items-center justify-between gap-3">
        <label htmlFor="fallback-body" className="form-label">Email message</label>
        <button type="button" className="min-h-9 text-xs font-medium text-navy underline" onClick={() => void copy(draft.body, "Message")}>Copy message</button>
      </div>
      <textarea id="fallback-body" readOnly value={draft.body} rows={7} className="form-control py-3 text-sm" onFocus={(event) => event.currentTarget.select()} />
    </div>
    <p role="status" className="mt-2 min-h-5 text-xs text-navy">{copyStatus}</p>
  </section>;
}
