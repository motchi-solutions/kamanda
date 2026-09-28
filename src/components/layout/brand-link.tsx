import Image from "next/image";
import Link from "next/link";
import type { MouseEventHandler } from "react";

export function BrandLink({
  href,
  onClick,
}: {
  href: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-label="Kamanda Management LLC home"
      data-button
      className="flex shrink-0 items-center gap-3"
    >
      <Image
        src="/icon.svg"
        alt=""
        width={48}
        height={48}
        className="h-12 w-12 object-contain"
      />
      <span aria-hidden="true">
        <span className="block font-display text-2xl tracking-[0.06em]">
          KAMANDA
        </span>
        <span className="block text-[9px] font-semibold tracking-[0.14em] text-carbon/60">
          MANAGEMENT LLC
        </span>
      </span>
    </Link>
  );
}
