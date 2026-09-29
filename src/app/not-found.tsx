import Link from "next/link";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { DirectionalArrow } from "@/components/ui/directional-arrow";
import { Reveal } from "@/components/ui/reveal";
import { ContactLink } from "@/components/ui/contact-navigation";
import { getCurrentRegion } from "@/lib/region-server";

export default async function NotFound() {
  const region = await getCurrentRegion();
  const homeHref = region === "sa" ? "/sa" : "/ae";

  return (
    <>
      <Navbar region={region} />
      <main id="main-content" className="pt-[var(--site-header-height)]">
        <section className="section flex min-h-[60vh] items-center bg-snow" aria-labelledby="not-found-heading">
          <div className="site-container w-full">
            <Reveal className="mx-auto max-w-2xl text-center">
              <p className="eyebrow">404</p>
              <h1 id="not-found-heading" className="section-heading mt-4">
                Page Not Found
              </h1>
              <p className="body-copy mx-auto mt-6">
                The page you&apos;re looking for may have moved or is no longer available.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link className="btn btn-primary arrow-link" href={homeHref} data-button>
                  Return Home
                  <DirectionalArrow />
                </Link>
                <Link className="btn btn-secondary" href="/services" data-button>
                  View Services
                </Link>
              </div>
              <ContactLink className="text-action mt-6" href={`${homeHref}#contact`}>
                Contact Us
                <DirectionalArrow />
              </ContactLink>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer region={region} />
    </>
  );
}
