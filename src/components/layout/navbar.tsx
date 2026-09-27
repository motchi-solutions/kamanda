import Image from "next/image";
import Link from "next/link";

type NavbarProps = {
  region: "ae" | "sa";
};

export function Navbar({ region }: NavbarProps) {
  const homeHref = region === "sa" ? "/sa" : "/ae";

  return (
    <header className="border-b border-carbon/10 bg-snow/95">
      <div className="site-container flex min-h-20 items-center justify-between gap-8">
        <Link
          href={homeHref}
          aria-label="Kamanda Management LLC home"
          data-button
          className="flex shrink-0 items-center"
        >
          <Image
            src="/brand/kamanda-logo.svg"
            alt=""
            width={48}
            height={48}
            className="h-12 w-12 object-contain"
            loading="eager"
          />
        </Link>

        <nav aria-label="Primary navigation">
          <ul className="flex flex-wrap items-center justify-end gap-x-6 gap-y-2 text-sm font-semibold text-carbon">
            <li>
              <Link href={homeHref} data-button>
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" data-button>
                About Us
              </Link>
            </li>
            <li>
              <Link href={`${homeHref}#services`} data-button>
                Services
              </Link>
            </li>
            <li>
              <Link href={`${homeHref}#contact`} data-button>
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
