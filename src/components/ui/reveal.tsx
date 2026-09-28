"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";

export function Reveal({
  children,
  className = "",
  direction = "up",
  delay = 0,
  sideBySideFrom = "lg",
  rootMargin = "0px 0px -80px 0px",
}: {
  children: ReactNode;
  className?: string;
  direction?: "up" | "left" | "right";
  delay?: number;
  sideBySideFrom?: "sm" | "md" | "lg";
  rootMargin?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const element = ref.current;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (
      !element ||
      motion.matches ||
      !("IntersectionObserver" in window) ||
      typeof element.animate !== "function"
    ) return;

    // Never hide content the visitor can already see, including restored scroll
    // positions and direct anchor navigation during hydration.
    if (
      element.getBoundingClientRect().top < window.innerHeight ||
      element.contains(document.activeElement)
    ) return;

    const breakpoint = { sm: 640, md: 768, lg: 1024 }[sideBySideFrom];
    const desktop = window.matchMedia(`(min-width: ${breakpoint}px)`).matches;
    const transform = desktop && direction !== "up"
      ? `translateX(${direction === "left" ? -24 : 24}px)`
      : `translateY(${desktop ? 18 : 10}px)`;
    const animation = element.animate(
      [
        { opacity: 0, transform },
        { opacity: 1, transform: "translate(0, 0)" },
      ],
      {
        duration: 650,
        delay: Math.min(Math.max(delay, 0), 420),
        fill: "both",
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    );
    // Prepare off-screen elements before paint, then play that same animation.
    // The underlying HTML stays visible without JavaScript.
    animation.pause();
    animation.currentTime = 0;
    animation.onfinish = () => animation.cancel();

    const finish = () => {
      observer.disconnect();
      animation.cancel();
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        if (motion.matches || element.contains(document.activeElement)) {
          animation.cancel();
          return;
        }
        animation.play();
      },
      { threshold: 0, rootMargin },
    );
    const stop = () => {
      if (motion.matches) {
        finish();
      }
    };
    observer.observe(element);
    motion.addEventListener("change", stop);
    element.addEventListener("focusin", finish);
    window.addEventListener("beforeprint", finish);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", stop);
      element.removeEventListener("focusin", finish);
      window.removeEventListener("beforeprint", finish);
      animation.cancel();
    };
  }, [direction, delay, rootMargin, sideBySideFrom]);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
