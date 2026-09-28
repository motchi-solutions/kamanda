"use client";

import { useEffect, useRef } from "react";
import { Reveal } from "@/components/ui/reveal";
import { REVEAL_STAGGER_MS } from "@/lib/motion";

const metrics = [
  {
    value: 30,
    from: 0,
    label: "Project Management Years of Experience",
  },
  {
    value: 250000,
    from: 200000,
    label: "Hours on Construction Projects",
  },
  {
    value: 20,
    from: 0,
    label: "Projects Delivered Successfully",
  },
  {
    value: 5,
    from: 0,
    label:
      "Businesses Facilitated in Technology & AI Adoption Through Partners",
  },
];
const duration = 1800;
const format = (value: number) => `${value.toLocaleString("en-US")}+`;

export function MetricCounters() {
  const ref = useRef<HTMLDListElement>(null);
  useEffect(() => {
    const element = ref.current;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!element || motion.matches || !("IntersectionObserver" in window))
      return;
    const numbers = element.querySelectorAll<HTMLElement>("[data-count]");
    let frame = 0;
    const finish = () => {
      cancelAnimationFrame(frame);
      numbers.forEach((node, index) => {
        node.textContent = format(metrics[index].value);
      });
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        numbers.forEach((node, index) => {
          node.textContent = format(metrics[index].from);
        });
        const start = performance.now();
        const tick = (now: number) => {
          // A shared clock keeps every counter finishing on the same frame.
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 2);
          numbers.forEach((node, index) => {
            const metric = metrics[index];
            const value =
              metric.from + Math.floor((metric.value - metric.from) * eased);
            const text = format(value);
            if (node.textContent !== text) node.textContent = text;
          });
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.15 },
    );
    const onMotionChange = () => {
      if (motion.matches) {
        observer.disconnect();
        finish();
      }
    };
    observer.observe(element);
    motion.addEventListener("change", onMotionChange);
    return () => {
      observer.disconnect();
      finish();
      motion.removeEventListener("change", onMotionChange);
    };
  }, []);

  return (
    <dl
      ref={ref}
      className="grid gap-x-8 gap-y-10 sm:grid-cols-2 xl:grid-cols-4"
    >
      {metrics.map((metric, index) => (
        <Reveal
          key={metric.label}
          delay={index * REVEAL_STAGGER_MS}
          className="flex min-w-0 flex-col border-t border-carbon/15 pt-7"
        >
          <dt className="order-2 mt-5 max-w-60 text-sm leading-6 text-carbon/65">
            {metric.label}
          </dt>
          <dd className="metric-number font-display text-navy">
            <span className="sr-only">{format(metric.value)}</span>
            <span aria-hidden="true" className="inline-grid">
              <span className="invisible col-start-1 row-start-1">
                {format(metric.value)}
              </span>
              <span data-count className="col-start-1 row-start-1">
                {format(metric.value)}
              </span>
            </span>
          </dd>
        </Reveal>
      ))}
    </dl>
  );
}
