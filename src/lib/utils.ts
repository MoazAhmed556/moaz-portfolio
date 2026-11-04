import type { CSSProperties } from "react";

export const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));

/** 1 → "01" */
export const pad = (n: number) => String(n).padStart(2, "0");

/** Typed helper for CSS custom properties in a `style` prop: style={cssVars({ "--li": 3 })} */
export function cssVars(vars: Record<`--${string}`, string | number>, base?: CSSProperties): CSSProperties {
  return { ...base, ...(vars as CSSProperties) };
}

/** Join class names, skipping falsy values. */
export const cx = (...parts: (string | false | null | undefined)[]) => parts.filter(Boolean).join(" ");

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const hasFinePointer = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/** Scroll to a y position, smoothly unless the visitor prefers reduced motion. */
export function scrollToY(y: number, smooth = true) {
  window.scrollTo({ top: y, behavior: smooth && !prefersReducedMotion() ? "smooth" : "instant" });
}
