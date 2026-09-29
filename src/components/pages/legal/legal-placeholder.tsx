import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export function LegalPlaceholder({ title, region }: { title: string; region: "ae" | "sa" }) {
  return <>
    <Navbar region={region} />
    <main id="main-content" className="pt-(--site-header-height)">
      <section className="section min-h-[60vh] bg-snow" aria-labelledby="legal-heading">
        <div className="site-container">
          <div className="max-w-3xl">
            <p className="eyebrow">Kamanda Management LLC</p>
            <h1 id="legal-heading" className="section-heading mt-4">{title}</h1>
            <div className="mt-8 rounded-lg border border-carbon/10 bg-white p-6 sm:p-8">
              <h2 className="font-display text-2xl text-navy">Content coming soon</h2>
              <p className="body-copy mt-4">This page is being prepared. Please check back for the full {title.toLowerCase()}.</p>
              <p className="mt-4 text-sm leading-6 text-carbon/75">For questions, contact <a className="font-semibold text-navy underline" href="mailto:info@kamandagroup.com">info@kamandagroup.com</a>.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
    <Footer region={region} />
  </>;
}
