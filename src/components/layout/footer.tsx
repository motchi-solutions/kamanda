import Link from "next/link";

type FooterProps = {
  region: "ae" | "sa";
};

export function Footer({ region }: FooterProps) {
  const homeHref = region === "sa" ? "/sa" : "/ae";
  const year = new Date().getFullYear();

  return (
    <footer className="bg-carbon text-snow">
      <div className="site-container flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-2xl">Kamanda Management LLC</p>
          <p className="mt-2 text-sm text-snow/65">{`© ${year} Kamanda Management LLC`}</p>
        </div>

        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-snow/80">
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
    </footer>
  );
}
