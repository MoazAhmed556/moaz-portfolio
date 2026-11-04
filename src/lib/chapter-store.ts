import type { ChapterId } from "@/types";

/**
 * Which chapter is on screen. Written by <ScrollEngine/>, read with useActiveChapter().
 * A tiny external store (useSyncExternalStore) so only the navigation re-renders, and
 * only when the chapter actually changes.
 */
let active: ChapterId = "beginning";
const listeners = new Set<() => void>();

export const chapterStore = {
  get: () => active,
  getServer: (): ChapterId => "beginning",
  set(next: ChapterId) {
    if (next === active) return;
    active = next;
    listeners.forEach((l) => l());
  },
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
};
