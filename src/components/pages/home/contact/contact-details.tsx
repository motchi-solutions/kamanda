import { PhoneFields } from "./phone-fields";
import { Required } from "./required";
import { remainingRequirements } from "@/lib/contact/form-requirements";
import type { ContactFormState } from "./use-contact-form";

export function ContactDetails({ form }: { form: ContactFormState }) {
  const { clientType, setClientType, formReset, formRef, setRequirements } =
    form;
  return (
    <fieldset className="min-w-0">
      <legend className="contact-section-heading">Your Details</legend>
      <div className="mt-3">
        <fieldset className="min-w-0">
          <legend className="form-label">
            I am enquiring as <Required />
          </legend>
          <div className="mt-2 grid gap-3 sm:grid-cols-2">
            {[
              { value: "individual", label: "Individual" },
              { value: "business", label: "Business" },
            ].map((option) => (
              <label key={option.value} className="form-choice">
                <input
                  type="radio"
                  name="client-type"
                  value={option.value}
                  required
                  checked={clientType === option.value}
                  onChange={() =>
                    setClientType(option.value as "individual" | "business")
                  }
                  aria-controls="contact-details"
                  className="h-4 w-4 shrink-0 accent-navy"
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <div
          id="contact-details"
          className="contact-details-reveal"
          data-open={!!clientType}
          inert={!clientType}
        >
          <div className="min-h-0 overflow-hidden">
            <fieldset
              disabled={!clientType}
              className="min-w-0 grid gap-4 pt-4"
            >
              <legend className="sr-only">Contact details</legend>
              <div>
                <label htmlFor="name" className="form-label">
                  Full Name <Required />
                </label>
                <input
                  id="name"
                  name="name"
                  placeholder="e.g., John Doe"
                  maxLength={100}
                  type="text"
                  required
                  autoComplete="name"
                  className="form-control"
                />
              </div>
              <div
                className="contact-details-reveal -my-2.5"
                data-open={clientType === "business"}
                inert={clientType !== "business"}
              >
                <div className="min-h-0 overflow-hidden">
                  <fieldset
                    disabled={clientType !== "business"}
                    className="min-w-0 py-2.5"
                  >
                    <label htmlFor="business-name" className="form-label">
                      Business Name <Required />
                    </label>
                    <input
                      id="business-name"
                      name="business-name"
                      type="text"
                      maxLength={150}
                      placeholder="Your organization"
                      required={clientType === "business"}
                      autoComplete="organization"
                      className="form-control"
                    />
                  </fieldset>
                </div>
              </div>
              <div>
                <label htmlFor="email" className="form-label">
                  {clientType === "business"
                    ? "Business Email"
                    : "Email Address"}{" "}
                  <Required />
                </label>
                <input
                  id="email"
                  name="email"
                  placeholder={
                    clientType === "business"
                      ? "e.g., username@organization.com"
                      : "e.g., username@gmail.com"
                  }
                  maxLength={254}
                  type="email"
                  required
                  autoComplete="email"
                  autoCapitalize="none"
                  spellCheck={false}
                  className="form-control"
                />
              </div>
              <PhoneFields
                key={formReset}
                onFieldsChange={() => {
                  if (formRef.current)
                    setRequirements(remainingRequirements(formRef.current));
                }}
              />
            </fieldset>
          </div>
        </div>
      </div>
    </fieldset>
  );
}
