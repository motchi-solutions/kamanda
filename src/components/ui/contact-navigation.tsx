"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type ReactNode,
} from "react";

type ContactRequest = {
  id: number;
  from: string;
  pathname: string;
  url: string;
  crossPage: boolean;
};

type NavigateToContact = (
  href: string,
  dialog: HTMLDialogElement | null,
) => void;
const ContactNavigationContext = createContext<NavigateToContact | null>(null);
const nextFrame = () =>
  new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

export function ContactNavigationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const requestId = useRef(0);
  const [request, setRequest] = useState<ContactRequest | null>(null);

  useEffect(() => {
    const cancel = () => {
      requestId.current += 1;
    };
    window.addEventListener("popstate", cancel);
    return () => {
      cancel();
      window.removeEventListener("popstate", cancel);
    };
  }, []);

  const navigate: NavigateToContact = async (href, dialog) => {
    const id = ++requestId.current;
    const from = window.location.pathname;
    // Let React close the menu and release its scroll lock before moving the page.
    await nextFrame();
    if (dialog) {
      await Promise.allSettled(
        dialog.getAnimations().map((animation) => animation.finished),
      );
    }
    if (id !== requestId.current || from !== window.location.pathname) return;

    // All home variants share Contact; keep the existing homepage when already there.
    const current = new URL(window.location.href);
    const target = document.getElementById("contact")
      ? current
      : new URL(href, current);
    const crossPage = target.pathname !== current.pathname;
    setRequest({
      id,
      from,
      pathname: target.pathname,
      url: `${target.pathname}${target.search}#contact`,
      crossPage,
    });
    if (crossPage) {
      // Omit the hash so the router does not jump straight to the section.
      router.push(`${target.pathname}${target.search}`, { scroll: true });
    }
  };

  useEffect(() => {
    if (!request || request.id !== requestId.current) return;
    if (pathname !== request.pathname) {
      // An unrelated navigation supersedes a pending contact request.
      if (pathname !== request.from) requestId.current += 1;
      return;
    }
    let cancelled = false;
    const arrive = async () => {
      // Wait until the destination and router scroll restoration have painted.
      await nextFrame();
      if (cancelled || request.id !== requestId.current) return;
      const section = document.getElementById("contact");
      if (!section) return;
      if (request.crossPage) window.scrollTo({ top: 0, behavior: "instant" });
      await nextFrame();
      if (cancelled || request.id !== requestId.current) return;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      section.focus({ preventScroll: true });
      section.scrollIntoView({
        behavior: reducedMotion ? "instant" : "smooth",
        block: "start",
      });
      // Keep shareable URLs without triggering a second hash jump or duplicate entry.
      if (request.crossPage) window.history.replaceState(null, "", request.url);
      else if (window.location.hash !== "#contact")
        window.history.pushState(null, "", request.url);
      setRequest(null);
    };
    void arrive();
    return () => {
      cancelled = true;
    };
  }, [pathname, request]);

  return (
    <ContactNavigationContext value={navigate}>
      {children}
    </ContactNavigationContext>
  );
}

export function ContactLink({
  href,
  onClick,
  ...props
}: Omit<ComponentProps<typeof Link>, "href"> & { href: string }) {
  const navigate = useContext(ContactNavigationContext);
  return (
    <Link
      {...props}
      href={href}
      onClick={(event) => {
        const dialog = event.currentTarget.closest("dialog");
        onClick?.(event);
        if (
          !navigate ||
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey ||
          (event.currentTarget.target &&
            event.currentTarget.target !== "_self") ||
          event.currentTarget.hasAttribute("download")
        )
          return;
        event.preventDefault();
        navigate(href, dialog);
      }}
    />
  );
}
