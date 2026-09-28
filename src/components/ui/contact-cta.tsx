import { DirectionalArrow } from "@/components/ui/directional-arrow";
import { ContactLink } from "./contact-navigation";
import { Reveal } from "./reveal";

export function ContactCta({ region }: { region: "ae" | "sa" }) {
  return (
    <section
      className="section contact-cta bg-navy text-white"
      aria-labelledby="next-step-heading"
    >
      <div className="site-container flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <Reveal direction="left" sideBySideFrom="md">
          <p className="eyebrow text-gold">Next Steps</p>
          <h2
            id="next-step-heading"
            className="section-heading mt-4 max-w-2xl text-white"
          >
            Discuss Your Project or Business Needs
          </h2>
          <p className="mt-5 max-w-xl leading-7 text-white/75">
            Prepare a brief outline of your objectives, timeframe, and any
            specialist expertise required. This gives us a starting point for
            defining the scope.
          </p>
        </Reveal>
        <Reveal direction="right" sideBySideFrom="md" className="shrink-0 self-start md:self-center">
          <ContactLink
            href={`/${region}#contact`}
            className="btn arrow-link bg-white text-navy hover:bg-snow focus-visible:bg-snow"
            data-button
          >
            Contact Us <DirectionalArrow direction="up-right" />
          </ContactLink>
        </Reveal>
      </div>
    </section>
  );
}
