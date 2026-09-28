"use client";

import { useEffect, useEffectEvent, type RefObject } from "react";

type DismissReason = "outside" | "escape";
const layers: symbol[] = [];

/** Dismiss only the most recently opened layer. Include its trigger in boundaryRef. */
export function useDismiss({
  open,
  boundaryRef,
  onDismiss,
}: {
  open: boolean;
  boundaryRef: RefObject<HTMLElement | null>;
  onDismiss: (reason: DismissReason) => void;
}) {
  const dismiss = useEffectEvent(onDismiss);

  useEffect(() => {
    if (!open) return;
    const layer = Symbol("dismiss-layer");
    layers.push(layer);
    const isTopLayer = () => layers.at(-1) === layer;
    const outside = (event: MouseEvent) => {
      const boundary = boundaryRef.current;
      if (isTopLayer() && boundary && !event.composedPath().includes(boundary)) {
        dismiss("outside");
      }
    };
    const escape = (event: KeyboardEvent) => {
      if (isTopLayer() && event.key === "Escape" && !event.defaultPrevented) {
        event.preventDefault();
        dismiss("escape");
      }
    };
    // A completed click avoids dismissing during a touch drag or scrollbar gesture.
    document.addEventListener("click", outside, true);
    document.addEventListener("keydown", escape);
    return () => {
      layers.splice(layers.indexOf(layer), 1);
      document.removeEventListener("click", outside, true);
      document.removeEventListener("keydown", escape);
    };
  }, [open, boundaryRef]);
}
