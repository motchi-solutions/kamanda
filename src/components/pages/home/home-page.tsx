import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { Contact } from "@/components/pages/home/contact/contact";
import { Hero } from "@/components/ui/hero";
import { Metrics } from "@/components/pages/home/metrics";
import { ServicesPreview } from "@/components/pages/home/services-preview";

type HomePageProps = {
  region: "ae" | "sa";
  heroImage: string;
  heroAlt: string;
};

export function HomePage({ region, heroImage, heroAlt }: HomePageProps) {
  return (
    <>
      <Navbar region={region} onHome />
      <main id="main-content">
        <Hero
          id="home-heading"
          eyebrow="Kamanda Management LLC"
          title="Management, Technology and Business Solutions"
          highlight="Technology"
          panelWidth="wide"
          description="We help organizations regionally and globally plan projects, coordinate construction, adopt technology, and find specialist business partners."
          imageSrc={heroImage}
          imageAspectRatio={region === "ae" ? 3 : 1672 / 941}
          imageAlt={heroAlt}
          primaryCta={{ label: "Services", href: "#services" }}
          secondaryCta={{
            label: "Contact Us",
            href: "#contact",
            firstOnMobile: true,
          }}
          nextSectionHref="#services"
        />
        <ServicesPreview />
        <Metrics />
        <Contact />
      </main>
      <Footer region={region} />
    </>
  );
}
