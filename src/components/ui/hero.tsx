import Image from "next/image";
import Link from "next/link";
import { ContactLink } from "./contact-navigation";
import { DirectionalArrow } from "@/components/ui/directional-arrow";

type HeroProps = {
  id: string;
  eyebrow: string;
  title: string;
  highlight?: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  imageSizes?: string;
  imageAspectRatio?: number;
  imagePosition?: "center" | "lower" | "right";
  panelWidth?: "standard" | "wide";
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string; hideOnMobile?: boolean; firstOnMobile?: boolean };
  nextSectionHref?: string;
  nextSectionLabel?: string;
};

const imagePositions = {
  center: "sm:object-center",
  lower: "sm:object-[center_65%]",
  right: "sm:object-[65%_center]",
};

export function Hero({
  id,
  eyebrow,
  title,
  highlight,
  description,
  imageSrc,
  imageAlt,
  imageSizes = "100vw",
  imageAspectRatio = 1672 / 941,
  imagePosition = "center",
  panelWidth = "standard",
  primaryCta,
  secondaryCta,
  nextSectionHref,
  nextSectionLabel = "Explore",
}: HeroProps) {
  // Account for the full covered photograph, not just the narrow visible crop.
  const mobileImageSizes = `max(100vw, min(${70 * imageAspectRatio}svh, ${32 * imageAspectRatio}rem))`;
  const PrimaryLink = primaryCta.href.endsWith("#contact")
    ? ContactLink
    : primaryCta.href.startsWith("#")
      ? "a"
      : Link;
  const SecondaryLink = secondaryCta?.href.endsWith("#contact")
    ? ContactLink
    : secondaryCta?.href.startsWith("#")
      ? "a"
      : Link;
  const highlightIndex = highlight ? title.indexOf(highlight) : -1;

  return (
    <section className="hero-section" aria-labelledby={id}>
      <div className="hero-photo">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          loading="eager"
          fetchPriority="high"
          sizes={`(max-width: 639px) ${mobileImageSizes}, ${imageSizes}`}
          className={`object-cover object-right ${imagePositions[imagePosition]}`}
        />
      </div>
      <div className="hero-overlay" aria-hidden="true" />
      <div className="site-container hero-frame">
        <div
          className={`hero-panel hero-copy ${panelWidth === "wide" ? "hero-panel-wide" : ""}`}
        >
          <p className="eyebrow hero-eyebrow">{eyebrow}</p>
          <h1 id={id} className="display-heading hero-heading text-snow">
            {highlight && highlightIndex >= 0 ? (
              <>
                {title.slice(0, highlightIndex)}
                <span className="hero-highlight">{highlight}</span>
                {title.slice(highlightIndex + highlight.length)}
              </>
            ) : (
              title
            )}
          </h1>
          <p className="hero-description">{description}</p>
          <div className={`hero-actions ${secondaryCta?.firstOnMobile ? "hero-actions-secondary-first" : ""}`}>
            <PrimaryLink
              href={primaryCta.href}
              className="btn btn-gold arrow-link"
              data-button
            >
              {primaryCta.label}
              <DirectionalArrow />
            </PrimaryLink>
            {secondaryCta && (
              <SecondaryLink
                href={secondaryCta.href}
                className={`btn btn-hero-secondary ${secondaryCta.hideOnMobile ? "hero-secondary-desktop" : ""} ${secondaryCta.firstOnMobile ? "max-sm:order-first" : ""}`}
                data-button
              >
                {secondaryCta.label}
              </SecondaryLink>
            )}
          </div>
        </div>
      </div>
      {nextSectionHref && (
        <a
          href={nextSectionHref}
          className="hero-next arrow-link"
          aria-label={`${nextSectionLabel}: continue to next section`}
          data-button
        >
          <span>{nextSectionLabel}</span>
          <DirectionalArrow direction="down" />
        </a>
      )}
    </section>
  );
}
