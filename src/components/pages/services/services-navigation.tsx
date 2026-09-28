"use client";

import Link from "next/link";
import { LuMinus } from "react-icons/lu";
import { useEffect, useRef, useState } from "react";
import { DirectionalArrow } from "@/components/ui/directional-arrow";

type ServiceLink = { id: string; title: string };
type Position = { above: boolean[]; active: string | null };

export function ServicesNavigation({ items }: { items: ServiceLink[] }) {
  const ref = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [position, setPosition] = useState<Position>({
    above: [],
    active: null,
  });

  useEffect(() => {
    const nav = ref.current;
    if (!nav) return;
    const sections = items.map((item) => document.getElementById(item.id));
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!ref.current) return;
      // Match the anchor offset, including both sticky navigation bars.
      const offset = sections[0]
        ? parseFloat(getComputedStyle(sections[0]).scrollMarginTop)
        : 0;
      let active: string | null = null;
      const above = sections.map((section, index) => {
        if (!section) return false;
        const bounds = section.getBoundingClientRect();
        const passed = bounds.top <= offset + 1;
        if (passed && bounds.bottom > offset) active = items[index].id;
        return passed;
      });
      setPosition((previous) =>
        previous.active === active &&
        above.every((value, index) => value === previous.above[index])
          ? previous
          : { above, active },
      );
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const observer = new ResizeObserver(schedule);
    sections.forEach((section) => {
      if (section) observer.observe(section);
    });
    observer.observe(nav);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer.disconnect();
    };
  }, [items]);

  useEffect(() => {
    const list = listRef.current;
    const current = list?.querySelector<HTMLElement>(
      '[aria-current="location"]',
    );
    if (!list || !current) return;
    const linkBounds = current.getBoundingClientRect();
    const listBounds = list.getBoundingClientRect();
    // Reveal the current link horizontally without changing the page scroll.
    if (
      linkBounds.left < listBounds.left ||
      linkBounds.right > listBounds.right
    ) {
      list.scrollTo({
        left:
          list.scrollLeft +
          linkBounds.left -
          listBounds.left -
          (listBounds.width - linkBounds.width) / 2,
        behavior: "instant",
      });
    }
  }, [position.active]);

  return (
    <nav
      ref={ref}
      className="services-navigation"
      aria-label="Service Sections"
    >
      <div className="site-container">
        <ul ref={listRef} className="services-navigation-list">
          {items.map((item, index) => (
            <li key={item.id} className="shrink-0">
              <Link
                href={`#${item.id}`}
                className="service-nav-link arrow-link"
                aria-current={
                  position.active === item.id ? "location" : undefined
                }
                data-button
              >
                {item.title}
                {position.active === item.id ? (
                  <LuMinus className="h-4 w-4 shrink-0" aria-hidden="true" />
                ) : (
                  <DirectionalArrow
                    direction={position.above[index] ? "up" : "down"}
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
