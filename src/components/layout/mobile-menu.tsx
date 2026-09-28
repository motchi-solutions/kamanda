"use client";

import { useEffect, useId, useRef, useState } from "react";
import { LuMenu, LuX } from "react-icons/lu";
import { NavLink, type NavItem } from "./nav-link";

export function MobileMenu({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const desktop = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    const closeOutside = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !ref.current?.contains(event.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", closeOutside);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [open]);

  return (
    <div
      ref={ref}
      className="mobile-menu md:hidden"
      data-open={open}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          event.preventDefault();
          setOpen(false);
          buttonRef.current?.focus();
        }
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        className="mobile-menu-toggle rounded-md border border-carbon/20 px-4 py-3 text-sm font-semibold"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((previous) => !previous)}
      >
        <span className="relative h-4 w-4" aria-hidden="true">
          <LuMenu className="menu-open-icon h-4 w-4" />
          <LuX className="menu-close-icon h-4 w-4" />
        </span>
        Menu
      </button>
      <nav
        id={panelId}
        aria-label="Mobile navigation"
        aria-hidden={!open}
        inert={!open}
        className="mobile-menu-panel absolute inset-x-0 top-full border-b border-carbon/10 bg-snow p-6 shadow-lg"
      >
        <ul className="grid gap-2">
          {items.map((item) => (
            <li key={item.label}>
              <NavLink item={item} mobile onClick={() => setOpen(false)} />
            </li>
          ))}
        </ul>
      </nav>
      <noscript>
        <nav
          aria-label="Mobile navigation without JavaScript"
          className="absolute inset-x-0 top-full border-b border-carbon/10 bg-snow p-4"
        >
          <ul className="flex flex-wrap gap-x-5 gap-y-3 text-sm">
            {items.map((item) => (
              <li key={item.label}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </noscript>
    </div>
  );
}
