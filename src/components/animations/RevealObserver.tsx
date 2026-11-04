"use client";

import { useEffect } from "react";

/**
 * Adds `.in` to every [data-reveal] element as it scrolls into view (once).
 * Siblings get a small stagger (--rd, up to 450ms). New elements rendered later
 * (e.g. a different skills tab) are picked up automatically.
 */
export function RevealObserver() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("in"));
      return;
    }
    // threshold 0: "draw" reveals use clip-path, which reports zero visible area
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (!en.isIntersecting) continue;
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" },
    );
    const seen = new WeakSet<Element>();
    const groups = new Map<Element, number>();

    const scan = () => {
      document.querySelectorAll<HTMLElement>("[data-reveal]:not(.in)").forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        const parent = el.parentElement ?? document.body;
        const i = groups.get(parent) ?? 0;
        groups.set(parent, i + 1);
        el.style.setProperty("--rd", String(Math.min(i * 90, 450)));
        io.observe(el);
      });
    };
    scan();

    let queued = 0;
    const mo = new MutationObserver(() => {
      if (queued) return;
      queued = requestAnimationFrame(() => {
        queued = 0;
        scan();
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      cancelAnimationFrame(queued);
    };
  }, []);

  return null;
}
