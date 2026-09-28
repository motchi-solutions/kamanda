import Image from "next/image";
import Link from "next/link";
import { NavLink } from "./nav-link";
import { MobileMenu } from "./mobile-menu";

type NavbarProps = { region: "ae" | "sa"; onHome?: boolean };

export function Navbar({ region, onHome = false }: NavbarProps) {
  const homeHref = region === "sa" ? "/sa" : "/ae";
  const items = [
    { label: "Home", href: homeHref, activePaths: ["/", "/ae", "/sa"] },
    { label: "About Us", href: "/about", activePaths: ["/about"] },
    {
      label: "Services",
      href: "/services",
      activePaths: ["/services"],
    },
    { label: "Contact Us", href: `${onHome ? "" : homeHref}#contact` },
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-carbon/10 bg-snow/95 backdrop-blur-md">
      <div className="site-container flex min-h-20 items-center justify-between gap-5 lg:min-h-24">
        <Link
          href={homeHref}
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
        <nav aria-label="Primary navigation" className="hidden md:block">
          <ul className="flex items-center gap-8 text-sm font-semibold lg:gap-10">
            {items.map((item) => (
              <li key={item.label}>
                <NavLink item={item} />
              </li>
            ))}
          </ul>
        </nav>
        <MobileMenu items={items} />
      </div>
    </header>
  );
}
