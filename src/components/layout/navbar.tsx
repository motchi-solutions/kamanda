import { BrandLink } from "./brand-link";
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
        <BrandLink href={homeHref} />
        <nav aria-label="Primary navigation" className="hidden md:block">
          <ul className="flex items-center gap-8 text-sm font-semibold lg:gap-10">
            {items.map((item) => (
              <li key={item.label}>
                <NavLink item={item} />
              </li>
            ))}
          </ul>
        </nav>
        <MobileMenu items={items} homeHref={homeHref} />
      </div>
    </header>
  );
}
