import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

type ServicesPageProps = {
  region: "ae" | "sa";
};

const services = [
  {
    id: "technology-ai",
    title: "Technology and AI Adoption",
    description:
      "Practical technology and AI support for teams building more capable, efficient ways of working.",
  },
  {
    id: "construction-support",
    title: "Construction Support",
    description:
      "Coordination and operational support for construction teams managing complex delivery environments.",
  },
  {
    id: "project-management",
    title: "Project Management",
    description:
      "Clear project leadership that aligns priorities, stakeholders, and delivery outcomes.",
  },
  {
    id: "business-solutions",
    title: "Business Solutions",
    description:
      "Specialized support shaped around the practical needs of growing organizations.",
  },
];

export function ServicesPage({ region }: ServicesPageProps) {
  return (
    <>
      <Navbar region={region} />
      <main>
        <section className="section" aria-labelledby="services-heading">
          <div className="site-container">
            <p className="eyebrow">Our services</p>
            <h1 id="services-heading" className="section-heading mt-4 max-w-3xl">
              Support that keeps important work moving.
            </h1>
            <div className="mt-14 grid gap-6 md:grid-cols-2">
              {services.map((service) => (
                <section
                  key={service.id}
                  id={service.id}
                  className="scroll-mt-8 border border-carbon/10 bg-white p-6 sm:p-8"
                  aria-labelledby={`${service.id}-heading`}
                >
                  <h2 id={`${service.id}-heading`} className="font-display text-3xl">
                    {service.title}
                  </h2>
                  <p className="mt-4 leading-7 text-carbon/70">{service.description}</p>
                </section>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer region={region} />
    </>
  );
}
