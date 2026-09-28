"use client";

import { useEffect } from "react";

let locks = 0;
let restore: (() => void) | undefined;

/** Share the document lock so closing one overlay cannot unlock another. */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    if (locks === 0) {
      // Do not make body a scroll container: that breaks sticky descendants.
      const elements = [document.documentElement];
      const previous = elements.map((element) => ({
        value: element.style.getPropertyValue("overflow"),
        priority: element.style.getPropertyPriority("overflow"),
      }));
      elements.forEach((element) => element.style.setProperty("overflow", "hidden"));
      restore = () => {
        elements.forEach((element, index) => {
          const { value, priority } = previous[index];
          if (value) element.style.setProperty("overflow", value, priority);
          else element.style.removeProperty("overflow");
        });
      };
    }
    locks += 1;
    return () => {
      locks -= 1;
      if (locks === 0) {
        restore?.();
        restore = undefined;
      }
    };
  }, [locked]);
}
