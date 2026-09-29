"use client";

import { ContactFailure } from "./contact-failure";
import { ContactSuccess } from "./contact-success";
import { remainingRequirements } from "@/lib/contact/form-requirements";
import type { ContactFormState } from "./use-contact-form";
import { Required } from "./required";
import { ContactDetails } from "./contact-details";
import { EnquiryFields } from "./enquiry-fields";
import { ContactActions } from "./contact-actions";

export function ContactForm({ form }: { form: ContactFormState }) {
  const { success, startAnother, fallback, notice, retry, formRef, setRequirements, submit, setValidationNotice, busy, hydrated } = form;

  if (success) return <ContactSuccess reference={success} onAnother={startAnother} />;

  return (
    <>
      {fallback && <ContactFailure draft={fallback} message={notice?.message ?? "Please try again later or contact us directly."}
        code={notice?.reference} onRetry={retry} />}
      {/* Keep fields mounted so retry preserves native inputs and the rich-text editor. */}
      <div hidden={!!fallback} inert={!!fallback}>
      <p id="contact-instructions" className="text-sm leading-6 text-carbon/75">
        Fields marked with <Required /> <span className="sr-only">an asterisk</span> are required. We use your details to respond to your enquiry.
      </p>
      <form
        ref={formRef}
        onChange={(event) => setRequirements(remainingRequirements(event.currentTarget))}
        onBlur={(event) => setRequirements(remainingRequirements(event.currentTarget))}
        method="post"
        action="/api/contact"
        className="contact-form mt-5"
        onSubmit={submit}
        onInvalid={() => setValidationNotice("Please complete the required fields and correct any highlighted details before sending.")}
        onInput={(event) => {
          const input = event.target;
          if (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement) {
            if (["name", "business-name", "subject"].includes(input.name)) {
              input.setCustomValidity(input.value.trim() ? "" : "Please complete this field.");
            }
            const form = event.currentTarget;
            const extension = form.elements.namedItem("phone-extension") as HTMLInputElement | null;
            const phone = form.elements.namedItem("phone") as HTMLInputElement | null;
            extension?.setCustomValidity(extension.value && !phone?.value.trim() ? "Enter a phone number before adding an extension." : "");
          }
          setValidationNotice("");
        }}
        aria-busy={busy}
        aria-label="Project and Business Enquiry"
        aria-describedby="contact-instructions"
        autoComplete="on"
      >
        <fieldset disabled={busy || !hydrated} className="min-w-0 space-y-6">
          <legend className="sr-only">Enquiry Form</legend>
          <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
            <label htmlFor="website">Website</label>
            <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" maxLength={200} />
          </div>
          <ContactDetails form={form} />
          <EnquiryFields form={form} />
          <ContactActions form={form} />
        </fieldset>
      </form>
      </div>
    </>
  );
}
