"use client";

import { useSyncExternalStore } from "react";
import { chapterStore } from "@/lib/chapter-store";

/** The chapter currently on screen ("beginning" during server rendering). */
export function useActiveChapter() {
  return useSyncExternalStore(chapterStore.subscribe, chapterStore.get, chapterStore.getServer);
}
