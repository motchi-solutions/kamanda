import Image from "next/image";
import Link from "next/link";

type ServicesPreviewProps = {
  region: "ae" | "sa";
};

type Service = {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

// Replace these skyline placeholders with final licensed or owned service imagery later.
const services: Service[] = [
  {
    id: "technology-ai",
    title: "Technology and AI Adoption",
    description:
      "Practical technology and AI support that helps teams work with more clarity and confidence.",
    imageSrc: "/brand/kamanda-logo.png",
    imageAlt: "",
  },
  {
    id: "construction-support",
    title: "Construction Support",
    description:
      "Reliable coordination and support for complex construction environments and delivery teams.",
    imageSrc: "/brand/kamanda-logo.png",
    imageAlt: "",
  },
  {
    id: "project-management",
    title: "Project Management",
    description:
      "Structured project leadership that keeps priorities, stakeholders, and outcomes aligned.",
    imageSrc: "/brand/kamanda-logo.png",
    imageAlt: "",
  },
  {
    id: "business-solutions",
    title: "Business Solutions",
    description:
      "Specialized business support shaped around the operational needs of growing organizations.",
    imageSrc: "/brand/kamanda-logo.png",
    imageAlt: "",
  },
];

export function ServicesPreview({ region }: ServicesPreviewProps) {
  const serviceImageClass = region === "sa" ? "object-[center_35%]" : "object-center";

  return (
    <section id="services" className="section bg-snow">
      <div className="site-container">
        <div className="max-w-2xl">
          <p className="eyebrow">What we do</p>
          <h2 className="section-heading mt-4">Capability with a practical point of view.</h2>
          <p className="body-copy mt-6">
            We bring management discipline, technical fluency, and grounded
            operational support to the work that moves organizations forward.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <article
              key={service.id}
              className="overflow-hidden border border-carbon/10 bg-white"
            >
              <div className="relative aspect-[16/9]">
                <Image
                  src={service.imageSrc}
                  alt={service.imageAlt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className={`object-cover ${serviceImageClass}`}
                />
              </div>
              <div className="p-6 sm:p-8">
                <h3 className="font-display text-3xl text-carbon">{service.title}</h3>
                <p className="mt-4 leading-7 text-carbon/70">{service.description}</p>
                <Link
                  href={`/services#${service.id}`}
                  className="mt-6 inline-flex font-bold text-navy underline decoration-gold underline-offset-4"
                  data-button
                >
                  Learn more
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
