"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEventHandler } from "react";

export type NavItem = {
  label: string;
  href: string;
  activePaths?: string[];
};

export function NavLink({
  item,
  mobile = false,
  onClick,
}: {
  item: NavItem;
  mobile?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}) {
  const pathname = usePathname();
  const active = item.activePaths?.includes(pathname) ?? false;
  const isButton = !mobile && item.label === "Contact Us";

  return (
    <Link
      href={item.href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      data-button
      className={`${isButton ? "btn btn-secondary" : "nav-link"}${mobile ? " block rounded-md px-3 py-3 text-base" : ""}`}
    >
      <span className="nav-link-label">{item.label}</span>
    </Link>
  );
}
