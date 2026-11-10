/**
 * Shared content types. Every data file in `src/data` is typed against these,
 * so an editor in VS Code shows exactly which fields a project, photo or skill needs.
 */

/** The anchor ids of the six chapters, in page order. */
export type ChapterId =
  | "beginning"
  | "challenges"
  | "expertise"
  | "projects"
  | "lens"
  | "connection";

export interface Chapter {
  id: ChapterId;
  number: number;
  title: string;
  /** One line shown in the Chapters menu. */
  blurb: string;
}

export interface NavShortcut {
  label: string;
  chapter: ChapterId;
}

/** A chapter heading: "label", a title whose last part is set in copper italics, and an optional lede. */
export interface ChapterHeading {
  label: string;
  title: string;
  /** Rendered after `title`, in italics. */
  titleEmphasis?: string;
  lede?: string;
}

/* ---------------------------------------------------------------- site */

export interface ContactItem {
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}

export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  shortDescription: string;
  /** Used for absolute URLs (Open Graph, sitemap). Set NEXT_PUBLIC_SITE_URL in production. */
  url: string;
  locale: string;
  jobTitle: string;
  organization: string;
  city: string;
  countryCode: string;
  email: string;
  cvPath: string;
  linkedin: string;
  contacts: ContactItem[];
  footer: { left: string; right: string };
}

export interface HeroContent {
  label: string;
  firstName: string;
  lastName: string;
  roles: string[];
  headline: string;
  headlineEmphasis: string;
  intro: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

/* ---------------------------------------------------------- experience */

export interface ExperienceCase {
  tag: string;
  text: string;
}

export interface Role {
  period: string;
  title: string;
  organization: string;
  location: string;
  cases: ExperienceCase[];
}

export interface ExperienceExtra {
  tag: string;
  title: string;
  text: string;
  link?: { label: string; href: string };
}

/* --------------------------------------------------------------- skills */

export interface SkillItem {
  code: string;
  name: string;
  evidence: string;
  source: string;
  /** Project ids from `projects.ts` — each becomes a "See it in …" button. */
  projects?: string[];
}

export interface SkillCategory {
  id: string;
  label: string;
  intro: string;
  /** Marks the "currently learning" category so it is styled as learning, not experience. */
  learning?: boolean;
  items: SkillItem[];
}

/* ------------------------------------------------------------- projects */

export interface Project {
  /** Used in links: /#project/<id> */
  id: string;
  name: string;
  /** Optional shorter name for tight spaces ("See it in …", loading text). */
  shortName?: string;
  industry: string;
  /** The working prototype, served from /public/projects. */
  previewUrl: string;
  /** Set when the project is hosted publicly; "Open on its own" then becomes "Visit the live site". */
  liveUrl?: string;
  screenshot: string;
  screenshotMobile: string;
  /** Background tint of its exhibition room. */
  tint: string;
  accent: string;
  stats: string[];
  tagline: string;
  description: string;
  role: string;
  features: string[];
  tech: string[];
  notes: string;
  /** iframe `allow` attribute, e.g. "camera; clipboard-write". */
  allow: string;
  /** Uses a real business name: shows the "unofficial concept" disclaimer (data/disclaimer.ts). */
  unofficial?: boolean;
}

/* ---------------------------------------------------------- photography */

export interface PhotoCollection {
  id: string;
  numeral: string;
  name: string;
  line: string;
}

export interface Photo {
  id: string;
  collection: string;
  /** Path inside /public. */
  src: string;
  width: number;
  height: number;
  title: string;
  alt: string;
  /**
   * Desktop placement on the 12-column wall (each collection is one row).
   * start = first column, span = columns wide, drop = rem from the top of the row.
   */
  layout: { start: number; span: number; drop: number };
}

