"use client";

import Link from "next/link";
import { ContactLink } from "@/components/ui/contact-navigation";
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
  const NavigationLink = item.href.endsWith("#contact")
    ? ContactLink
    : item.href.startsWith("#") ? "a" : Link;
  const active = item.activePaths?.includes(pathname) ?? false;
  const isButton = item.label === "Contact Us";
  const mobileClasses = mobile
    ? isButton
      ? " mx-auto mt-3 flex w-fit min-w-40"
      : " block rounded-md px-3 py-3 text-base"
    : "";

  return (
    <NavigationLink
      href={item.href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      data-button
      className={`${isButton ? "btn btn-secondary" : "nav-link"}${mobileClasses}`}
    >
      <span className="nav-link-label">{item.label}</span>
    </NavigationLink>
  );
}
