"use client";

import { useEffect } from "react";

/**
 * The opening: once the fonts are ready (or after 1.3s at most), the sun comes into
 * the room and the name assembles letter by letter (CSS in styles/chapters/beginning.css).
 */
export function HeroEntrance({ targetId }: { targetId: string }) {
  useEffect(() => {
    let done = false;
    let raf = 0;
    const ready = () => {
      if (done) return;
      done = true;
      raf = requestAnimationFrame(() => document.getElementById(targetId)?.classList.add("ready"));
    };
    const timer = window.setTimeout(ready, 1300);
    document.fonts?.ready.then(ready).catch(ready);
    return () => {
      done = true;
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [targetId]);

  return null;
}
