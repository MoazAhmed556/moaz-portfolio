/**
 * The scroll engine — one requestAnimationFrame per scroll/resize, shared by every effect.
 *
 * Components subscribe with `onScrollFrame(fn)` inside a useEffect and call the returned
 * function in the cleanup. Effects write CSS custom properties directly to the DOM, so the
 * cinematic motion never causes React re-renders.
 */
export interface ScrollFrame {
  y: number;
  vh: number;
  vw: number;
}

type Listener = (frame: ScrollFrame) => void;

const listeners = new Set<Listener>();
let ticking = false;
let attached = false;
let rafId = 0;

function run() {
  ticking = false;
  const frame: ScrollFrame = { y: window.scrollY, vh: window.innerHeight, vw: window.innerWidth };
  listeners.forEach((fn) => fn(frame));
}

/** Ask for a frame (coalesced: at most one per animation frame). */
export function requestScrollFrame() {
  if (typeof window === "undefined" || ticking) return;
  ticking = true;
  rafId = window.requestAnimationFrame(run);
}

function attach() {
  if (attached) return;
  attached = true;
  window.addEventListener("scroll", requestScrollFrame, { passive: true });
  window.addEventListener("resize", requestScrollFrame, { passive: true });
}

function detach() {
  if (!attached) return;
  attached = false;
  window.removeEventListener("scroll", requestScrollFrame);
  window.removeEventListener("resize", requestScrollFrame);
  window.cancelAnimationFrame(rafId);
  ticking = false;
}

/** Subscribe to scroll frames. Returns an unsubscribe function for useEffect cleanup. */
export function onScrollFrame(fn: Listener): () => void {
  listeners.add(fn);
  attach();
  requestScrollFrame();
  return () => {
    listeners.delete(fn);
    if (listeners.size === 0) detach();
  };
}
