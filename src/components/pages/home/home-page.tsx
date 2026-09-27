import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { Contact } from "@/components/pages/home/contact";
import { Hero } from "@/components/pages/home/hero";
import { Metrics } from "@/components/pages/home/metrics";
import { ServicesPreview } from "@/components/pages/home/services-preview";

type HomePageProps = {
  region: "ae" | "sa";
  heroImage: string;
  heroAlt: string;
  heroTitle: string;
  heroDescription: string;
};

export function HomePage({
  region,
  heroImage,
  heroAlt,
  heroTitle,
  heroDescription,
}: HomePageProps) {
  return (
    <>
      <Navbar region={region} />
      <Hero
        title={heroTitle}
        description={heroDescription}
        imageSrc={heroImage}
        imageAlt={heroAlt}
        primaryCtaHref="#services"
        secondaryCtaHref="#contact"
      />
      <ServicesPreview region={region} />
      <Metrics />
      <Contact />
      <Footer region={region} />
    </>
  );
}
