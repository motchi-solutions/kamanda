import { DirectionalArrow } from "@/components/ui/directional-arrow";
import Image from "next/image";
import Link from "next/link";
import { REVEAL_STAGGER_MS } from "@/lib/motion";
import { Reveal } from "@/components/ui/reveal";

import { projectManagementImage } from "@/components/pages/services/service-content";

type ServicePreview = {
  id: string;
  title: string;
  category: string;
  image?: { src: string; alt: string; position: string };
};

const services: ServicePreview[] = [
  {
    id: "technology-ai",
    title: "Technology & AI Adoption",
    category: "Adoption Planning and Implementation Oversight",
    image: {
      src: "/services/technology-ai.jpg",
      alt: "Professional reviewing analytics charts on a laptop",
      position: "object-center",
    },
  },
  {
    id: "construction-support",
    title: "Construction Support",
    category: "Site Coordination, Documentation, and Reporting",
    image: {
      src: "/services/construction-support.jpg",
      alt: "Construction professionals inspecting a building site",
      position: "object-[center_70%]",
    },
  },
  {
    id: "project-management",
    title: "Project Management",
    category: "Scope, Schedules, and Delivery Oversight",
    image: projectManagementImage,
  },
  {
    id: "business-solutions",
    title: "Business Solutions",
    category: "Partner Sourcing and Business Introductions",
    image: {
      src: "/services/business-solutions.jpg",
      alt: "Business professional reviewing charts on a tablet alongside planning documents",
      position: "object-center",
    },
  },
];

export function ServicesPreview() {
  return (
    <section
      id="services"
      className="section bg-snow"
      aria-labelledby="services-preview-heading"
    >
      <div className="site-container">
        <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-16">
          <Reveal direction="left" sideBySideFrom="md">
            <p className="eyebrow">What We Do</p>
            <h2
              id="services-preview-heading"
              className="section-heading mt-4 max-w-xl"
            >
              Our Consultancy Services
            </h2>
          </Reveal>
          <Reveal direction="right" sideBySideFrom="md">
            <p className="body-copy">
              Choose the support you need, from defining requirements and
              coordinating teams to overseeing implementation.
            </p>
          </Reveal>
        </div>
        <div className="services-preview-grid mt-12 grid gap-6 md:grid-cols-2">
          {services.map((service, index) => (
            <Reveal
              key={service.id}
              direction={index % 2 === 0 ? "left" : "right"}
              sideBySideFrom="md"
              delay={index * REVEAL_STAGGER_MS}
              rootMargin="0px 0px -80px 0px"
            >
              <article className="service-card group h-full overflow-hidden rounded-xl border border-carbon/10 bg-white">
                <Link
                  href={`/services#${service.id}`}
                  className="arrow-link flex h-full flex-col focus-visible:outline-offset-[-3px]"
                  aria-labelledby={`preview-${service.id}-title`}
                  data-button
                >
                  <div className="service-image relative aspect-video shrink-0 overflow-hidden bg-[#eeefed]">
                    <Image
                      src={service.image?.src ?? "/icon.svg"}
                      alt={service.image?.alt ?? ""}
                      fill
                      sizes="(min-width: 1280px) 620px, (min-width: 768px) 50vw, 100vw"
                      className={`service-photo ${service.image ? `object-cover ${service.image.position}` : "object-contain p-12"}`}
                    />
                    <span
                      className={`absolute left-6 top-5 text-xs font-semibold tracking-widest ${service.image ? "rounded bg-snow/95 px-2 py-1 text-navy" : "text-navy/65"}`}
                      aria-hidden="true"
                    >
                      0{index + 1}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    <h3
                      id={`preview-${service.id}-title`}
                      className="text-3xl sm:text-4xl"
                    >
                      {service.title}
                    </h3>
                    <p className="mt-3 mb-7 text-sm leading-6 text-carbon/75">
                      {service.category}
                    </p>
                    <span className="service-card-action mt-auto flex items-center justify-between gap-4 border-t border-carbon/10 pt-5 text-sm font-semibold">
                      <span className="service-card-action-label">
                        Explore Service
                      </span>
                      <DirectionalArrow direction="up-right" />
                    </span>
                  </div>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
