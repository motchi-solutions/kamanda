"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useDismiss } from "@/hooks/use-dismiss";
import { useScrollLock } from "@/hooks/use-scroll-lock";
import { NavLink, type NavItem } from "./nav-link";
import { BrandLink } from "./brand-link";

export function MobileMenu({ items, homeHref }: { items: NavItem[]; homeHref: string }) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const titleId = useId();

  const closeMenu = () => {
    // Release native inertness before a link navigates, including local hashes.
    dialogRef.current?.close();
    setOpen(false);
  };

  useScrollLock(open);
  useDismiss({ open, boundaryRef: panelRef, onDismiss: closeMenu });

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const desktop = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => {
      if (desktop.matches) {
        dialog.close();
        setOpen(false);
      }
    };
    dialog.showModal();
    closeRef.current?.focus({ preventScroll: true });
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      desktop.removeEventListener("change", closeOnDesktop);
      dialog.close();
    };
  }, [open]);

  return (
    <div className="mobile-menu md:hidden" data-open={open}>
      <button
        type="button"
        className="mobile-menu-toggle rounded-md border border-carbon/20 px-4 py-3 text-sm font-semibold"
        aria-label="Open navigation menu"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(true)}
      >
        <span className="menu-icon" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        Menu
      </button>
      <dialog
        ref={dialogRef}
        id={panelId}
        className="mobile-menu-dialog"
        aria-labelledby={titleId}
        onCancel={(event) => {
          event.preventDefault();
          closeMenu();
        }}
        onClose={() => {
          // Ignore a queued close event if the menu was already reopened.
          if (dialogRef.current?.open) return;
          setOpen(false);
        }}
      >
        <div ref={panelRef} className="mobile-menu-sheet">
          <div className="site-container flex min-h-20 items-center justify-between gap-4 border-b border-carbon/10">
            <h2 id={titleId} className="sr-only">Mobile navigation</h2>
            <BrandLink href={homeHref} onClick={closeMenu} />
            <button
              ref={closeRef}
              type="button"
              className="mobile-menu-toggle rounded-md border border-carbon/20 px-4 py-3 text-sm font-semibold"
              aria-label="Close navigation menu"
              onClick={closeMenu}
            >
              <span className="menu-icon" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
              Close
            </button>
          </div>
          <nav aria-label="Mobile navigation" className="site-container py-6">
            <ul className="grid gap-2">
              {items.map((item) => (
                <li key={item.label}>
                  <NavLink item={item} mobile onClick={closeMenu} />
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </dialog>
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
