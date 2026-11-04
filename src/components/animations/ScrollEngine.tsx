"use client";

import { useEffect, useLayoutEffect } from "react";
import { chapterStore } from "@/lib/chapter-store";
import { onScrollFrame } from "@/lib/scroll-engine";
import { clamp, prefersReducedMotion } from "@/lib/utils";
import type { ChapterId } from "@/types";

/**
 * Drives the scroll-linked chapter effects by writing CSS custom properties:
 *  --jp    journey progress (0→1 over the whole page) on <html> — top bar and side rail
 *  --p     per-section progress on elements with data-progress:
 *            "pin"  → 0→1 while a pinned section is scrolled through (the hero room)
 *            "pass" → 0→1 from the section entering at the bottom to leaving at the top
 *  --draw  how far the arches in chapter 03 are drawn
 * It also reports which chapter is on screen to the navigation.
 */
export function ScrollEngine() {
  // React resets <html> attributes on the development-only remount; restore the `js` flag
  // that the inline script in layout.tsx sets before first paint. (No-op in production.)
  useLayoutEffect(() => {
    document.documentElement.classList.add("js");
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const progressEls = Array.from(document.querySelectorAll<HTMLElement>("[data-progress]"));
    const sections = Array.from(document.querySelectorAll<HTMLElement>("section[data-chapter]"));

    const measure = (el: HTMLElement, vh: number) => {
      const r = el.getBoundingClientRect();
      if (el.dataset.progress === "pin") return clamp(-r.top / Math.max(1, r.height - vh));
      return clamp((vh - r.top) / (r.height + vh));
    };

    return onScrollFrame(({ y, vh }) => {
      const max = Math.max(1, root.scrollHeight - vh);
      root.style.setProperty("--jp", (y / max).toFixed(4));

      if (!prefersReducedMotion()) {
        for (const el of progressEls) {
          const p = measure(el, vh);
          el.style.setProperty("--p", p.toFixed(4));
          if (el.id === "challenges") el.style.setProperty("--draw", clamp(p * 2.3 - 0.25).toFixed(4));
        }
      }

      // active chapter: the last one whose top has passed 45% of the viewport
      let active = sections[0];
      for (const s of sections) if (s.getBoundingClientRect().top <= vh * 0.45) active = s;
      if (active) chapterStore.set(active.id as ChapterId);
    });
  }, []);

  return null;
}
