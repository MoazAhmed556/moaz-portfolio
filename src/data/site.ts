import type { ChapterHeading, HeroContent, SiteConfig } from "@/types";

/**
 * SITE — name, contact details, SEO text and the opening chapter.
 * Edit the strings below; every component reads from here.
 */

/** The public address of the site. On Vercel this is filled in automatically; you can also set NEXT_PUBLIC_SITE_URL. */
function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return "http://localhost:3000";
}

const email = "moazahmedabdelwahed556@gmail.com";

export const site: SiteConfig = {
  name: "Moaz Ahmed",
  title: "Moaz Ahmed — A Journey Through Light",
  description:
    "Moaz Ahmed — E-commerce Operations, UI/UX Design and Technical Solutions in Cairo. Eight live storefront projects, a personal photography collection, and the journey behind them.",
  shortDescription:
    "E-commerce Operations · UI/UX Design · Technical Solutions. Eight live projects and a personal photography collection.",
  url: resolveSiteUrl(),
  locale: "en_US",
  jobTitle: "E-commerce Operations & Technical Solutions Specialist",
  organization: "NTG Clarity — Markatty",
  city: "Cairo",
  countryCode: "EG",
  email,
  cvPath: "/cv/Moaz_Ahmed_CV.pdf",
  linkedin: "https://www.linkedin.com/in/moaz-ahmed-666571140",
  contacts: [
    { label: "LinkedIn", value: "in/moaz-ahmed-666571140", href: "https://www.linkedin.com/in/moaz-ahmed-666571140", external: true },
    { label: "Phone", value: "+20 109 735 2354", href: "tel:+201097352354" },
    { label: "Second email", value: "moaz_ahmed556@yahoo.com", href: "mailto:moaz_ahmed556@yahoo.com" },
    { label: "Languages", value: "Arabic (native) · English (good)" },
  ],
  footer: {
    left: "© 2026 Moaz Ahmed",
    right: "Portfolio of Moaz Ahmed · Cairo, Egypt",
  },
};

/* ------------------------------------------------ 01 · The Beginning */
export const hero: HeroContent = {
  label: "The Beginning",
  firstName: "Moaz",
  lastName: "Ahmed",
  roles: ["E-commerce Operations", "UI/UX Design", "Technical Solutions"],
  headline: "I translate what a store needs into ",
  headlineEmphasis: "what its customers see.",
  intro:
    "I work at Markatty (NTG Clarity) in Cairo, between clients and developers — solving complex store issues, clarifying what people actually need, and designing interactive interfaces so ideas can be seen before they are built.",
  primaryCta: { label: "Explore my work", href: "#projects" },
  secondaryCta: { label: "Discover my journey", href: "#vision" },
};

/* ------------------------------------------------ 08 · The Connection */
export const contactHeading: ChapterHeading = {
  label: "The Connection",
  title: "Let’s create something ",
  titleEmphasis: "meaningful.",
  lede: "Available to start immediately. Based in Nasr City, Cairo.",
};
