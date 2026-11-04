"use client";

import { useEffect } from "react";
import { clamp, hasFinePointer, prefersReducedMotion } from "@/lib/utils";

/**
 * Buttons marked `data-magnetic` lean gently toward a mouse pointer.
 * One delegated listener for the whole page; skipped on touch and for reduced motion.
 */
export function MagneticButtons() {
  useEffect(() => {
    let current: HTMLElement | null = null;

    const release = () => {
      if (current) current.style.transform = "";
      current = null;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || !hasFinePointer() || prefersReducedMotion()) return;
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-magnetic]") ?? null;
      if (el !== current) release();
      if (!el) return;
      current = el;
      const r = el.getBoundingClientRect();
      const dx = clamp((e.clientX - r.left - r.width / 2) * 0.2, -9, 9);
      const dy = clamp((e.clientY - r.top - r.height / 2) * 0.3, -7, 7);
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", release);
    window.addEventListener("blur", release);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", release);
      window.removeEventListener("blur", release);
      release();
    };
  }, []);

  return null;
}
