import Link from "next/link";
import { ContactLink } from "@/components/ui/contact-navigation";
import { Reveal } from "@/components/ui/reveal";

type FooterProps = {
  region: "ae" | "sa";
};

export function Footer({ region }: FooterProps) {
  const homeHref = region === "sa" ? "/sa" : "/ae";
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer bg-carbon text-snow">
      <div className="site-container flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <Reveal direction="left" sideBySideFrom="sm">
          <p className="font-display text-2xl">Kamanda Management LLC</p>
          <p className="mt-2 text-sm text-gold">
            Building trust. Delivering value.
          </p>
          <p className="mt-5 text-sm text-snow/65">{`© ${year} Kamanda Management LLC`}</p>
          <p className="mt-2 text-xs text-snow/60">
            Website by{" "}
            <a href="https://github.com/motchi-solutions">Motchi Solutions</a>
          </p>
        </Reveal>

        <Reveal direction="right" sideBySideFrom="sm">
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-snow/80">
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
                <ContactLink href={`${homeHref}#contact`}>Contact Us</ContactLink>
              </li>
            </ul>
          </nav>
        </Reveal>
      </div>
    </footer>
  );
}
