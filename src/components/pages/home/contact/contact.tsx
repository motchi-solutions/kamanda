"use client";

import { useContactForm } from "./use-contact-form";
import { CompletionChecklist } from "./completion-checklist";
import { ContactForm } from "./contact-form";
import { Reveal } from "@/components/ui/reveal";

export function Contact() {
  const form = useContactForm();
  return (
    <section
      id="contact"
      tabIndex={-1}
      className="section bg-white"
      aria-labelledby="contact-heading"
    >
      <div className="site-container grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="min-w-0">
        <Reveal direction="left">
          <p className="eyebrow">Contact Kamanda</p>
          <h2 id="contact-heading" className="section-heading mt-4">
            Project and Business Enquiries
          </h2>
          <p className="body-copy mt-6">
            Tell us what you want to achieve, your expected timeline, and where
            you need support.
          </p>
        </Reveal>
        {!form.success && !form.fallback && (
          <aside aria-label="Enquiry completion checklist"
            className="sticky top-[calc(var(--site-header-height)+1.5rem)] mt-8 hidden max-h-[calc(100dvh-var(--site-header-height)-3rem)] overflow-y-auto rounded-lg border border-navy/10 bg-snow p-5 lg:block">
            <CompletionChecklist form={form} />
          </aside>
        )}
        </div>
        <Reveal direction="right" className="surface-card min-w-0 rounded-xl border border-carbon/15 bg-snow p-6 sm:p-8">
          <ContactForm form={form} />
        </Reveal>
      </div>
    </section>
  );
}
