import Link from "next/link";
import { ContactLink } from "@/components/ui/contact-navigation";
import { Reveal } from "@/components/ui/reveal";

type FooterProps = { region: "ae" | "sa" };

export function Footer({ region }: FooterProps) {
  const homeHref = region === "sa" ? "/sa" : "/ae";
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer bg-carbon text-snow">
      <div className="site-container py-10">
        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          <Reveal direction="left" sideBySideFrom="md">
            <p className="font-display text-2xl">Kamanda Management LLC</p>
            <p className="mt-2 text-sm text-gold">
              Building trust. Delivering value.
            </p>
            <nav className="mt-6" aria-label="Footer navigation">
              <ul className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-snow/80">
                <li>
                  <Link href={homeHref}>Home</Link>
                </li>
                <li>
                  <Link href="/about">About Us</Link>
                </li>
                <li>
                  <Link href="/services">Services</Link>
                </li>
                <li>
                  <ContactLink href={`${homeHref}#contact`}>
                    Contact Us
                  </ContactLink>
                </li>
              </ul>
            </nav>
          </Reveal>
          <Reveal
            direction="right"
            sideBySideFrom="md"
            className="md:justify-self-end md:text-right"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-snow/80">
              Our Address
            </p>
            <address className="mt-3 text-xs not-italic leading-6 text-snow/60">
              VUET3222
              <br />
              Compass building - Al Hulaila,
              <br />
              AL Hulaila Industrial Zone-FZ, Rakez,
              <br />
              Ras Al Khaimah, United Arab Emirates
            </address>
          </Reveal>
        </div>
        <div className="mt-8 flex flex-col gap-4 border-t border-snow/15 pt-5 text-xs text-snow/60 lg:flex-row lg:items-center lg:justify-between">
          <p>{`© ${year} Kamanda Management LLC`}</p>
          <nav aria-label="Legal information">
            <ul className="flex flex-wrap gap-x-5 gap-y-3">
              <li>
                <Link href="/terms-of-service">Terms of Service</Link>
              </li>
              <li>
                <Link href="/privacy-policy">Privacy Policy</Link>
              </li>
            </ul>
          </nav>
          <p>
            Website by{" "}
            <a 
              href="https://github.com/motchi-solutions"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-gold underline transition-colors ease-in-out duration-300 hover:text-snow/80"
            >
              Motchi Solutions
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
