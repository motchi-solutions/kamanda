import { MessageEditor } from "./message-editor";
import { FormSelect } from "@/components/ui/form-select";
import { Required } from "./required";
import { remainingRequirements } from "@/lib/contact/form-requirements";
import type { ContactFormState } from "./use-contact-form";

export function EnquiryFields({ form }: { form: ContactFormState }) {
  const {
    formReset,
    message,
    busy,
    hydrated,
    messageInvalid,
    setMessage,
    formRef,
    setRequirements,
    setMessageTouched,
    messageLength,
  } = form;
  return (
    <fieldset className="min-w-0 border-t border-carbon/10 pt-5">
      <legend className="contact-section-heading">Your Enquiry</legend>
      <div className="mt-2 grid gap-4">
        <div>
          <label htmlFor="service" className="form-label">
            Service of Interest <Required />
          </label>
          <FormSelect
            id="service"
            name="service"
            required
            defaultValue=""
            className="form-control"
          >
            <option value="" disabled>
              Select a Service
            </option>
            <option value="technology-ai">Technology &amp; AI Adoption</option>
            <option value="construction-support">Construction Support</option>
            <option value="project-management">Project Management</option>
            <option value="business-solutions">Business Solutions</option>
            <option value="other">Other</option>
          </FormSelect>
        </div>
        <div>
          <label htmlFor="subject" className="form-label">
            Subject <Required />
          </label>
          <p id="subject-help" className="form-help">
            Maximum 150 characters.
          </p>
          <input
            id="subject"
            name="subject"
            type="text"
            placeholder="Project planning support"
            required
            maxLength={150}
            className="form-control"
            aria-describedby="subject-help"
          />
        </div>
        <div>
          <label id="message-label" htmlFor="message" className="form-label">
            Message <Required />
          </label>
          <p id="message-help" className="form-help">
            Minimum 20 characters. Maximum 4,000 characters.
          </p>
          <div className="relative">
            <MessageEditor
              key={formReset}
              value={message}
              disabled={busy || !hydrated}
              invalid={messageInvalid}
              onChange={(value) => {
                setMessage(value);
                if (formRef.current)
                  setRequirements(remainingRequirements(formRef.current));
              }}
              onBlur={() => setMessageTouched(true)}
            />
            <span
              id="message-count"
              className="pointer-events-none absolute bottom-3 right-4 text-xs text-carbon/65"
            >
              {message.length.toLocaleString("en-US")} / 4,000 maximum
            </span>
          </div>
          <p
            id="message-error"
            className="mt-1 text-xs text-red-700 empty:hidden"
            aria-live="polite"
          >
            {messageInvalid
              ? messageLength < 20
                ? `Add ${20 - messageLength} more characters (minimum 20).`
                : "Please use no more than 4,000 characters."
              : ""}
          </p>
        </div>
      </div>
    </fieldset>
  );
}
