import Image from "next/image";

// Root-layout CSS animation: runs once per document, without waiting for hydration or assets.
export function SiteIntro() {
  return (
    <div className="site-intro" aria-hidden="true">
      <div className="flex flex-col items-center gap-5 px-6 text-center">
        <Image
          src="/icon.svg"
          alt=""
          width={100}
          height={100}
          className="intro-logo"
        />
        <p className="font-display text-2xl font-semibold tracking-wide text-navy sm:text-3xl">
          Kamanda Management LLC
        </p>
      </div>
    </div>
  );
}
