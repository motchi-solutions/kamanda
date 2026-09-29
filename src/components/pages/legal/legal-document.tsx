import Link from "next/link";
import Image from "next/image";
import { LuDownload } from "react-icons/lu";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { Reveal } from "@/components/ui/reveal";
import type { LegalDocument } from "@/lib/legal-content";

export function LegalDocumentPage({
  document,
  region,
}: {
  document: LegalDocument;
  region: "ae" | "sa";
}) {
  return (
    <>
      <Navbar region={region} />
      <main id="main-content" className="pt-(--site-header-height)">
        <section className="section bg-snow" aria-labelledby="legal-heading">
          <div className="site-container">
            <div className="legal-document mx-auto w-full max-w-[90ch]">
              <Reveal>
                <div className="flex items-center gap-3">
                  <Image
                    src="/brand/kamanda-logo.svg"
                    alt="Kamanda Management LLC"
                    width={48}
                    height={48}
                    className="h-12 w-12 object-contain"
                  />
                  <p className="eyebrow">Kamanda Management LLC</p>
                </div>
                <h1 id="legal-heading" className="section-heading mt-4">
                  {document.title}
                </h1>
                <p className="mt-4 text-sm text-carbon/65">
                  Effective Date: {document.effectiveDate}
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    className="btn btn-primary"
                    href={`/api/legal/${document.slug}/pdf`}
                    download={document.filename}
                    data-button
                  >
                    <LuDownload aria-hidden="true" size={16} />
                    Download PDF
                  </a>
                  <Link className="btn btn-secondary" href="/">
                    Back to Home
                  </Link>
                </div>
              </Reveal>

              <article className="legal-prose mt-12 sm:mt-16">
                <Reveal>
                  <p>{document.intro}</p>
                </Reveal>
                {document.sections.map((section, index) => (
                  <Reveal key={section.heading} delay={Math.min(index * 30, 280)}>
                    <section aria-labelledby={`legal-section-${index}`}>
                      <h2 id={`legal-section-${index}`}>{index + 1}. {section.heading}</h2>
                      {section.paragraphs?.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                      {section.bullets && (
                        <ul>
                          {section.bullets.map((bullet) => (
                            <li key={bullet}>{bullet}</li>
                          ))}
                        </ul>
                      )}
                      {section.afterBullets?.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </section>
                  </Reveal>
                ))}
              </article>
            </div>
          </div>
        </section>
      </main>
      <Footer region={region} />
    </>
  );
}
