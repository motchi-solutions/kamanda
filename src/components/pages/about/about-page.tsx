import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

type AboutPageProps = {
  region: "ae" | "sa";
};

export function AboutPage({ region }: AboutPageProps) {
  return (
    <>
      <Navbar region={region} />
      <main>
        <section className="section" aria-labelledby="about-heading">
          <div className="site-container max-w-3xl">
            <p className="eyebrow">About Kamanda</p>
            <h1 id="about-heading" className="section-heading mt-4">
              Practical leadership for complex work.
            </h1>
            <p className="body-copy mt-6">
              Kamanda Management LLC brings project management, construction
              support, technology, and business solutions together for
              organizations in the region.
            </p>
          </div>
        </section>
      </main>
      <Footer region={region} />
    </>
  );
}
