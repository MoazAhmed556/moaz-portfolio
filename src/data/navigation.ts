import type { Chapter, ChapterId, NavShortcut } from "@/types";

/**
 * NAVIGATION — the six chapters in page order.
 * `id` is the section anchor (#challenges, #projects …); titles and blurbs appear in the
 * top bar, the side rail and the Chapters menu.
 */
export const chapters: Chapter[] = [
  { id: "beginning", number: 1, title: "The Beginning", blurb: "Who I am and what I do." },
  { id: "challenges", number: 2, title: "The Experience", blurb: "Where I have worked." },
  { id: "expertise", number: 3, title: "The Skills", blurb: "What I work with, and how hands-on I am." },
  { id: "projects", number: 4, title: "The Projects", blurb: "Six concepts and a client website you can open." },
  { id: "lens", number: 5, title: "Behind the Lens", blurb: "A few of my photographs." },
  { id: "connection", number: 6, title: "The Connection", blurb: "Contact details and CV." },
];

/** Shortcuts in the top bar. */
export const navShortcuts: NavShortcut[] = [
  { label: "Experience", chapter: "challenges" },
  { label: "Projects", chapter: "projects" },
];

/** Buttons at the bottom of the Chapters menu. */
export const menuLinks: { label: string; chapter: ChapterId; primary?: boolean }[] = [
  { label: "Go to the projects", chapter: "projects", primary: true },
  { label: "Get in touch", chapter: "connection" },
];

export function chapterById(id: ChapterId): Chapter {
  const found = chapters.find((c) => c.id === id);
  if (!found) throw new Error(`Unknown chapter: ${id}`);
  return found;
}
