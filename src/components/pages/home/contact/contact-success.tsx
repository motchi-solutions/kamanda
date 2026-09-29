import { useEffect, useRef, useState } from "react";
import { DirectionalArrow } from "@/components/ui/directional-arrow";
import { LuCircleCheck, LuCopy, LuCheck } from "react-icons/lu";

export function ContactSuccess({ reference, onAnother }: { reference: string; onAnother: () => void }) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(copyTimer.current), []);
  async function copyReference() {
    try {
      await navigator.clipboard.writeText(reference);
      setCopied(true);
      setCopyError(false);
      clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopyError(true);
    }
  }
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => { heading.current?.focus({ preventScroll: true }); }, []);
  return <section className="rounded-lg border border-navy/15 bg-white p-6 sm:p-8" aria-labelledby="enquiry-success">
    <LuCircleCheck className="mb-4 h-8 w-8 text-navy" aria-hidden="true" />
    <h3 ref={heading} id="enquiry-success" tabIndex={-1} className="font-display text-xl font-semibold text-navy">Thank you for your enquiry.</h3>
    <p className="mt-3 text-sm leading-6 text-carbon/75">Your enquiry has been sent to Kamanda. Our team will review it and get back to you.</p>
    <div className="mt-5 rounded-md border border-navy/10 bg-navy/5 px-4 py-3">
      <p className="text-xs font-medium text-carbon/75">Your enquiry reference</p>
      <div className="mt-1 flex items-center justify-between gap-3">
        <p className="min-w-0 select-all break-all text-sm font-semibold tracking-wide text-navy">{reference}</p>
        <button type="button" onClick={() => void copyReference()}
          aria-label={copied ? "Reference copied" : "Copy enquiry reference"}
          title={copied ? "Copied" : "Copy reference"}
          className="hidden h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-md text-navy transition-colors hover:bg-navy/10 focus-visible:bg-navy/10 motion-reduce:transition-none lg:inline-flex">
          {copied ? <LuCheck className="h-4 w-4" aria-hidden="true" /> : <LuCopy className="h-4 w-4" aria-hidden="true" />}
        </button>
      </div>
      <p role="status" className={copyError ? "mt-1 text-xs text-red-700" : "sr-only"}>
        {copyError ? "Unable to copy. Select the reference above and copy it manually." : copied ? "Reference copied." : ""}
      </p>
    </div>
    <p className="mt-3 text-sm leading-6 text-carbon/75">For follow-ups, email <a href={`mailto:info@kamandagroup.com?subject=${encodeURIComponent(`Enquiry ${reference}`)}`} className="font-semibold text-navy underline">info@kamandagroup.com</a> and include this reference.</p>
    <button type="button" onClick={onAnother} className="text-action arrow-link mt-5 cursor-pointer underline decoration-transparent underline-offset-4 hover:decoration-gold focus-visible:decoration-gold motion-reduce:transition-none">Send another enquiry <DirectionalArrow direction="right" /></button>
  </section>;
}
