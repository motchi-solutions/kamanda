import { DirectionalArrow } from "@/components/ui/directional-arrow";
import Link from "next/link";
import Image from "next/image";
import { Hero } from "@/components/ui/hero";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { ContactCta } from "@/components/ui/contact-cta";
import { Reveal } from "@/components/ui/reveal";
import { Approach } from "./approach";

type AboutPageProps = { region: "ae" | "sa" };

export function AboutPage({ region }: AboutPageProps) {
  return (
    <>
      <Navbar region={region} />
      <main id="main-content">
        <Hero
          id="about-heading"
          eyebrow="About Kamanda"
          title="Experience, Coordination, and Delivery"
          highlight="Coordination"
          description="Kamanda Management LLC brings together project leadership, business coordination, and specialist support to help organizations move complex initiatives forward."
          imageSrc="/about/about-hero.png"
          imageAlt=""
          imageSizes="(max-width: 959px) 960px, (max-width: 1247px) 1248px, 100vw"
          imagePosition="lower"
          primaryCta={{ label: "Our Services", href: "/services" }}
          nextSectionHref="#about-introduction"
        />
        <section
          id="about-introduction"
          className="section bg-white"
          aria-labelledby="about-introduction-heading"
        >
          <div className="site-container grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
            <Reveal direction="left">
              <p className="eyebrow">Who We Are</p>
              <h2
                id="about-introduction-heading"
                className="section-heading mt-4"
              >
                Project Leadership. Clear Coordination.
              </h2>
              <p className="body-copy mt-6">
                Kamanda Management LLC supports organizations across the UAE and
                Saudi Arabia with project management, construction coordination,
                technology adoption, and business advisory.
              </p>
              <p className="body-copy mt-5">
                We clarify what needs to be done, bring the right people
                together, and maintain oversight as work progresses.
              </p>
              <p className="mt-8 border-l-2 border-gold pl-5 font-display text-2xl text-navy sm:text-3xl">
                Building trust. Delivering value.
              </p>
            </Reveal>
            <Reveal direction="right" rootMargin="0px 0px -80px 0px">
              <div className="relative aspect-4/3 overflow-hidden rounded-xl bg-snow">
                <Image
                  src="/services/business-solutions.jpg"
                  alt="Business professional reviewing charts on a tablet alongside planning documents"
                  fill
                  sizes="(min-width: 1280px) 620px, (min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </section>
        <section className="section" aria-labelledby="delivery-heading">
          <div className="site-container grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
            <Reveal direction="right" className="lg:col-start-2 lg:row-start-1">
              <p className="eyebrow">Our Expertise</p>
              <h2 id="delivery-heading" className="section-heading mt-4">
                Support Across Your Business
              </h2>
              <p className="body-copy mt-6">
                From construction and project delivery to technology adoption
                and business introductions, we help organizations define their
                needs and coordinate the support to move forward.
              </p>
              <ul className="mt-7 divide-y divide-carbon/10 border-y border-carbon/10 text-sm leading-7 text-navy">
                <li className="py-3">
                  Project management and construction support.
                </li>
                <li className="py-3">Technology and AI adoption planning.</li>
                <li className="py-3">
                  Specialist partner sourcing and business solutions.
                </li>
              </ul>
              <Link href="/services" className="text-action arrow-link mt-7">
                Explore Our Services <DirectionalArrow direction="up-right" />
              </Link>
            </Reveal>
            <Reveal
              direction="left"
              rootMargin="0px 0px -80px 0px"
              className="lg:col-start-1 lg:row-start-1"
            >
              <div className="relative aspect-4/3 overflow-hidden rounded-xl bg-white">
                <Image
                  src="/services/construction-support.jpg"
                  alt="Construction professionals inspecting a large building site"
                  fill
                  sizes="(min-width: 1280px) 620px, (min-width: 1024px) 50vw, 100vw"
                  className="object-cover object-[center_70%]"
                />
              </div>
            </Reveal>
          </div>
        </section>
        <Approach />
        <section className="section" aria-labelledby="partners-heading">
          <div className="site-container grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
            <Reveal direction="left">
              <p className="eyebrow">Specialist Partners</p>
              <h2 id="partners-heading" className="section-heading mt-4">
                The Right Expertise for Each Requirement
              </h2>
              <p className="body-copy mt-6">
                Business needs often span several disciplines. We help define
                the requirement, identify specialist partners, and coordinate
                their involvement throughout delivery.
              </p>
              <p className="body-copy mt-5">
                For technology and AI, Kamanda leads planning, requirements, and
                implementation oversight. Specialist implementation can be
                coordinated through partners including Motchi Solutions.
              </p>
              <Link href="/services" className="text-action arrow-link mt-7">
                Explore Our Services <DirectionalArrow direction="up-right" />
              </Link>
            </Reveal>
            <Reveal direction="right" className="content-panel bg-white">
              <p className="eyebrow">Regional and Global Support</p>
              <h3 className="mt-4 text-3xl leading-snug sm:text-4xl">
                Supporting Your Business Across Borders
              </h3>
              <p className="body-copy mt-5">
                We support organizations across the UAE, KSA, the wider Gulf
                region, and globally. Each engagement reflects your operating
                requirements, stakeholder relationships, and business
                priorities, with a consistent approach to planning and
                coordination.
              </p>
            </Reveal>
          </div>
        </section>
        <ContactCta region={region} />
      </main>
      <Footer region={region} />
    </>
  );
}
