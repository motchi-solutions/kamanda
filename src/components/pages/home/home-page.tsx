import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { Contact } from "@/components/pages/home/contact";
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
          description="We help organizations in the UAE and Saudi Arabia plan projects, coordinate construction, adopt technology, and find specialist business partners."
          imageSrc={heroImage}
          imageAlt={heroAlt}
          primaryCta={{ label: "Services", href: "#services" }}
          secondaryCta={{ label: "Contact Us", href: "#contact" }}
        />
        <ServicesPreview region={region} />
        <Metrics />
        <Contact />
      </main>
      <Footer region={region} />
    </>
  );
}
