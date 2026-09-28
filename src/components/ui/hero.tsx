import Image from "next/image";
import Link from "next/link";
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
  imagePosition?: "center" | "lower" | "right";
  panelWidth?: "standard" | "wide";
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

const imagePositions = {
  center: "object-center",
  lower: "object-[center_65%]",
  right: "object-[65%_center]",
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
  imagePosition = "center",
  panelWidth = "standard",
  primaryCta,
  secondaryCta,
}: HeroProps) {
  const highlightIndex = highlight ? title.indexOf(highlight) : -1;

  return (
    <section className="hero-section" aria-labelledby={id}>
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        loading="eager"
        fetchPriority="high"
        sizes={imageSizes}
        className={`-z-20 object-cover ${imagePositions[imagePosition]}`}
      />
      <div className="hero-overlay" aria-hidden="true" />
      <div className="site-container hero-frame">
        <div
          className={`hero-panel hero-copy ${panelWidth === "wide" ? "hero-panel-wide" : ""}`}
        >
          <p className="eyebrow hero-eyebrow">{eyebrow}</p>
          <h1 id={id} className="display-heading hero-heading mt-5 text-snow">
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
          <div className="hero-actions">
            <Link
              href={primaryCta.href}
              className="btn btn-gold arrow-link"
              data-button
            >
              {primaryCta.label}
              <DirectionalArrow />
            </Link>
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="btn btn-hero-secondary"
                data-button
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
