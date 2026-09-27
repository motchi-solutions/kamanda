import Image from "next/image";
import Link from "next/link";

type HeroProps = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  primaryCtaHref: string;
  secondaryCtaHref: string;
};

export function Hero({
  title,
  description,
  imageSrc,
  imageAlt,
  primaryCtaHref,
  secondaryCtaHref,
}: HeroProps) {
  return (
    <section className="relative isolate min-h-[clamp(34rem,78vh,52rem)] overflow-hidden bg-carbon text-snow">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        loading="eager"
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-carbon/65" aria-hidden="true" />

      <div className="site-container flex min-h-[clamp(34rem,78vh,52rem)] items-end py-16 sm:py-24">
        <div className="max-w-3xl">
          <p className="mb-6 text-sm font-bold uppercase tracking-[0.18em] text-gold">
            Kamanda Management LLC
          </p>
          <h1 className="display-heading max-w-3xl text-snow">{title}</h1>
          <p className="mt-8 max-w-2xl text-base leading-8 text-snow/85 sm:text-lg">
            {description}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href={primaryCtaHref}
              className="btn btn-primary bg-gold text-carbon hover:bg-snow"
              data-button
            >
              Services
            </Link>
            <Link
              href={secondaryCtaHref}
              className="btn btn-secondary border-snow text-snow hover:bg-snow hover:text-carbon"
              data-button
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
