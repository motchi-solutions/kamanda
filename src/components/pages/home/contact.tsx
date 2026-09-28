import { Reveal } from "@/components/ui/reveal";

export function Contact() {
  return (
    <section
      id="contact"
      className="section bg-white"
      aria-labelledby="contact-heading"
    >
      <Reveal className="site-container grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <p className="eyebrow">Contact Kamanda</p>
          <h2 id="contact-heading" className="section-heading mt-4">
            Project and Business Enquiries
          </h2>
          <p className="body-copy mt-6">
            Tell us what you want to achieve, your expected timeline, and where
            you need support.
          </p>
        </div>
        <div className="min-w-0 rounded-xl border border-carbon/15 bg-snow p-6 sm:p-8">
          <div
            id="contact-status"
            className="rounded-lg border border-navy/15 bg-white p-5"
          >
            <h3 className="text-2xl text-navy">Online Enquiries Coming Soon</h3>
            <p className="mt-2 text-sm leading-6 text-carbon/75">
              Online enquiries are not available yet. The form below is
              currently disabled and does not collect or send information.
            </p>
          </div>
          <p
            id="contact-instructions"
            className="mt-6 text-sm leading-6 text-carbon/75"
          >
            When enquiries open, all fields will be required except phone
            number.
          </p>
          <form
            className="mt-6"
            aria-label="Project and Business Enquiry"
            aria-describedby="contact-status contact-instructions"
            autoComplete="on"
          >
            {/* Enable fields and submission only when a real handler is connected. */}
            <fieldset disabled className="min-w-0 space-y-8">
              <legend className="sr-only">Enquiry Form</legend>
              <fieldset className="min-w-0">
                <legend className="font-display text-2xl font-semibold text-carbon">
                  Your Details
                </legend>
                <div className="mt-5 grid gap-5">
                  <div>
                    <label htmlFor="name" className="form-label">
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      className="form-control"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="form-label">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      autoCapitalize="none"
                      spellCheck={false}
                      className="form-control"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="form-label">
                      Phone Number{" "}
                      <span className="font-normal text-carbon/65">
                        (Optional)
                      </span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      aria-describedby="phone-help"
                      className="form-control"
                    />
                    <p id="phone-help" className="form-help">
                      Include your country code, for example +971 or +966.
                    </p>
                  </div>
                </div>
              </fieldset>
              <fieldset className="min-w-0 border-t border-carbon/10 pt-7">
                <legend className="font-display text-2xl font-semibold text-carbon">
                  Your Enquiry
                </legend>
                <div className="mt-2 grid gap-6">
                  <fieldset className="min-w-0">
                    <legend className="form-label">Client Type</legend>
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
                            className="h-4 w-4 shrink-0 accent-navy"
                          />
                          <span>{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  <div>
                    <label htmlFor="service" className="form-label">
                      Service of Interest
                    </label>
                    <select
                      id="service"
                      name="service"
                      required
                      defaultValue=""
                      className="form-control"
                    >
                      <option value="" disabled>
                        Select a Service
                      </option>
                      <option value="technology-ai">
                        Technology &amp; AI Adoption
                      </option>
                      <option value="construction-support">
                        Construction Support
                      </option>
                      <option value="project-management">
                        Project Management
                      </option>
                      <option value="business-solutions">
                        Business Solutions
                      </option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="form-label">
                      Message
                    </label>
                    <p id="message-help" className="form-help">
                      Outline your objectives, expected timeline, and the
                      support you need.
                    </p>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      aria-describedby="message-help"
                      className="form-control py-3"
                    />
                  </div>
                </div>
              </fieldset>
              <button
                type="button"
                disabled
                className="btn w-full border border-carbon/15 bg-carbon/10 text-carbon/65 sm:w-auto"
                aria-describedby="contact-status"
                data-button
              >
                Enquiries Coming Soon
              </button>
            </fieldset>
          </form>
        </div>
      </Reveal>
    </section>
  );
}
