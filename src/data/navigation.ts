import type { Chapter, ChapterId, NavShortcut } from "@/types";

/**
 * NAVIGATION — the eight chapters in page order.
 * `id` is the section anchor (#vision, #lens …); titles and blurbs appear in the
 * top bar, the side rail and the Chapters menu.
 */
export const chapters: Chapter[] = [
  { id: "beginning", number: 1, title: "The Beginning", blurb: "Who I am, in a room full of light." },
  { id: "vision", number: 2, title: "The Vision", blurb: "How I approach problems." },
  { id: "challenges", number: 3, title: "The Challenges", blurb: "My professional experience." },
  { id: "expertise", number: 4, title: "The Expertise", blurb: "Skills, tools and current learning — with evidence." },
  { id: "projects", number: 5, title: "The Projects", blurb: "Eight live projects you can use." },
  { id: "lens", number: 6, title: "Behind the Lens", blurb: "A personal photography collection." },
  { id: "next", number: 7, title: "The Next Chapter", blurb: "What I am learning, and where I am heading." },
  { id: "connection", number: 8, title: "The Connection", blurb: "Get in touch." },
];

/** Shortcuts in the top bar. */
export const navShortcuts: NavShortcut[] = [
  { label: "Projects", chapter: "projects" },
  { label: "Photography", chapter: "lens" },
];

/** Buttons at the bottom of the Chapters menu. */
export const menuLinks: { label: string; chapter: ChapterId; primary?: boolean }[] = [
  { label: "Go to the projects", chapter: "projects", primary: true },
  { label: "Go to the photography", chapter: "lens" },
];

export function chapterById(id: ChapterId): Chapter {
  const found = chapters.find((c) => c.id === id);
  if (!found) throw new Error(`Unknown chapter: ${id}`);
  return found;
}
