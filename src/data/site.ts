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
    "Moaz Ahmed — e-commerce operations and client support in Cairo, with business analysis, UI/UX and part-time frontend work. Experience at Markatty and Dentolize, and web projects you can open.",
  shortDescription: "E-commerce Operations · Business Analysis · UI/UX & Frontend. Experience, projects and contact details.",
  url: resolveSiteUrl(),
  locale: "en_US",
  jobTitle: "E-commerce Operations & Client Support",
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
    { label: "Languages", value: "Arabic (native) · English — basic, currently improving" },
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
  roles: ["E-commerce Operations", "Business Analysis", "UI/UX & Frontend"],
  headline: "I help online stores run well, ",
  headlineEmphasis: "and work out how they could work better.",
  intro:
    "At Markatty (NTG Clarity) in Cairo, I work in e-commerce operations and client support — including analysing processes, customer problems and competitors. Part-time, I design storefront themes and build their interfaces.",
  primaryCta: { label: "See my work", href: "#projects" },
  secondaryCta: { label: "My experience", href: "#challenges" },
};

/* ------------------------------------------------ 06 · The Connection */
export const contactHeading: ChapterHeading = {
  label: "The Connection",
  title: "Have an idea? I’d like to hear it, ",
  titleEmphasis: "whoever you are.",
  lede: "Based in Nasr City, Cairo.",
};
