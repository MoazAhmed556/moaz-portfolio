import type { ChapterHeading, Principle } from "@/types";

/** 02 · THE VISION — how I approach a problem. Each principle has a real "in practice" proof. */
export const visionHeading: ChapterHeading = {
  label: "The Vision",
  title: "Good experiences begin with people. ",
  titleEmphasis: "The pixels come after.",
  lede: "How I approach a problem — whether it is a store setup that isn’t working as expected, a layout that breaks on a phone, or a client who needs something they can’t quite describe yet.",
};

export const principles: Principle[] = [
  {
    numeral: "i.",
    title: "Listen before solving",
    text: "The first request is rarely the whole story. I start by understanding what the customer and the client actually need.",
    proof: "Clarifying requirements with 10+ clients who need urgent fixes.",
  },
  {
    numeral: "ii.",
    title: "Fix the real problem",
    text: "A quick patch hides a symptom. I trace issues to their root cause, so the fix holds.",
    proof: "Investigating root causes before any request reaches a developer.",
  },
  {
    numeral: "iii.",
    title: "Small details, real difference",
    text: "Spacing, layout and how a page behaves on a phone decide whether a store feels trustworthy.",
    proof: "Custom CSS, mobile responsiveness and layout fixes for client stores.",
  },
  {
    numeral: "iv.",
    title: "Translate in both directions",
    text: "Business language and technical language describe the same goal. I connect the two.",
    proof: "Well-documented handoffs that developers can act on straight away.",
  },
  {
    numeral: "v.",
    title: "Make it visible",
    text: "People decide faster when they can see and touch an idea. I design interfaces that are useful first, and beautiful because of it.",
    proof: "10+ interactive prototypes that clients and developers review without any tools.",
  },
];
