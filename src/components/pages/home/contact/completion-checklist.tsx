import type { ContactFormState } from "./use-contact-form";

export function CompletionChecklist({ form }: { form: ContactFormState }) {
  const { requirements, challenge, v2Token, busy } = form;
  return (
    <div
      className="text-sm leading-6 text-carbon/75"
      aria-live="polite"
      aria-atomic="true"
    >
      <p className="font-semibold text-navy">
        {requirements.length ? "Required fields to complete" : "Ready to send"}
      </p>
      {requirements.length > 0 ? (
        <>
          <p className="mt-1 text-xs leading-5">
            Complete these fields to send your enquiry.
          </p>
          <ul className="mt-3 grid gap-2 text-sm leading-5">
            {requirements.map((requirement) => (
              <li
                key={requirement}
                className="grid grid-cols-[0.375rem_minmax(0,1fr)] items-start gap-2"
              >
                <span
                  aria-hidden="true"
                  className="mt-2 h-1 w-1 rounded-full bg-gold"
                />
                <span>{requirement}</span>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="mt-1 text-xs leading-5">
          {busy
            ? "Your enquiry is being sent."
            : challenge && !v2Token
              ? "Complete the verification in the form to continue."
              : "Your details are complete. Select Send Enquiry to continue."}
        </p>
      )}
    </div>
  );
}
