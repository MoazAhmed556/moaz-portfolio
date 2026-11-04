import type { ChapterHeading, JourneyPath } from "@/types";

/** 07 · THE NEXT CHAPTER — kept honest: done, learning, and aiming for are separate. */
export const nextHeading: ChapterHeading = {
  label: "The Next Chapter",
  title: "The horizon is where ",
  titleEmphasis: "the work continues.",
  lede: "Kept honest and in three parts: what is done and on record, what I am learning right now, and where I want to take it next.",
};

export const journeyPaths: JourneyPath[] = [
  {
    kind: "done",
    label: "Done · on record",
    items: [
      "3+ years in client-facing technical support and operations",
      "10+ interactive UI prototypes designed and built",
      "Three e-commerce storefront themes live on Markatty, built in React and Next.js",
      "A live bilingual website for the United World Foundation",
      "30 clinics onboarded and trained",
    ],
  },
  {
    kind: "learning",
    label: "Learning · in progress",
    items: [
      "DevOps course with the eYouth Learning Platform",
      "Linux fundamentals — hands-on practice",
      "Docker basics — hands-on practice",
      "Jenkins basics and CI/CD fundamentals",
    ],
  },
  {
    kind: "aim",
    label: "Aiming for · next",
    items: [
      "Taking more of my interface work from prototype into production front-end with React and Next.js",
      "Bringing DevOps foundations into how projects are built and shipped",
      "Closing the gap between what clients ask for and what teams build",
    ],
  },
];
