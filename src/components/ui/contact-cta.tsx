import { DirectionalArrow } from "@/components/ui/directional-arrow";
import Link from "next/link";
import { Reveal } from "./reveal";

export function ContactCta({ region }: { region: "ae" | "sa" }) {
  return (
    <section
      className="section contact-cta bg-navy text-white"
      aria-labelledby="next-step-heading"
    >
      <Reveal className="site-container flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
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
        </div>
        <Link
          href={`/${region}#contact`}
          className="btn arrow-link shrink-0 self-start bg-white text-navy hover:bg-snow md:self-center"
          data-button
        >
          Contact Us <DirectionalArrow direction="up-right" />
        </Link>
      </Reveal>
    </section>
  );
}
