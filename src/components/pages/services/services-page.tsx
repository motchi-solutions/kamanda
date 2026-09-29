import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/ui/hero";
import { ContactCta } from "@/components/ui/contact-cta";
import { ServicesNavigation } from "./services-navigation";
import { ServiceDetail } from "./service-detail";
import { services } from "./service-content";

type ServicesPageProps = { region: "ae" | "sa" };

export function ServicesPage({ region }: ServicesPageProps) {
  return (
    <>
      <Navbar region={region} />
      <main id="main-content">
        <Hero
          id="services-heading"
          eyebrow="Kamanda Management LLC"
          title="Our Services"
          highlight="Services"
          description="Management, project coordination, business solutions, and technology adoption support."
          imageSrc="/services/services-hero.png"
          imageAlt="Dubai skyline and illuminated city roads at night"
          imageSizes="(max-width: 1919px) 1920px, 100vw"
          imagePosition="right"
          primaryCta={{ label: "Contact Us", href: `/${region}#contact` }}
          nextSectionHref="#technology-ai"
        />
        <ServicesNavigation
          items={services.map(({ id, title }) => ({ id, title }))}
        />
        {services.map((service, index) => (
          <ServiceDetail key={service.id} service={service} index={index} />
        ))}
        <ContactCta region={region} />
      </main>
      <Footer region={region} />
    </>
  );
}
