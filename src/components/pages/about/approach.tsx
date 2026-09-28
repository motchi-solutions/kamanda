import { Reveal } from "@/components/ui/reveal";

const steps = [
  {
    title: "Understand Your Priorities",
    description:
      "Clarify the business need, intended outcomes, constraints, and people involved.",
  },
  {
    title: "Define Scope and Responsibilities",
    description:
      "Agree the scope, responsibilities, milestones, and specialist support required.",
  },
  {
    title: "Coordinate Delivery",
    description:
      "Track progress, manage dependencies, and keep stakeholders informed of risks and decisions.",
  },
  {
    title: "Support the Handover",
    description:
      "Coordinate the transition, document key information, and help teams adopt new ways of working.",
  },
];
export function Approach() {
  return (
    <section
      className="section border-y border-carbon/10 bg-white"
      aria-labelledby="approach-heading"
    >
      <div className="site-container">
        <Reveal>
          <p className="eyebrow">Working With Kamanda</p>
          <h2 id="approach-heading" className="section-heading mt-4 max-w-2xl">
            How We Manage Our Projects
          </h2>
        </Reveal>
        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step.title} className="min-w-0">
              <Reveal
                delay={index * 160}
                rootMargin="0px 0px -80px 0px"
                className="h-full rounded-xl border border-carbon/10 bg-snow p-6"
              >
                <p
                  aria-hidden="true"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold/50 bg-white text-xs font-bold tracking-widest text-navy"
                >
                  0{index + 1}
                </p>
                <h3 className="mt-5 text-2xl leading-tight xl:text-3xl">
                  {step.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-carbon/75">
                  {step.description}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
