import type { ChapterHeading, ExperienceExtra, Role } from "@/types";

/** 03 · THE CHALLENGES — professional experience, taken from the CV. */
export const challengesHeading: ChapterHeading = {
  label: "The Challenges",
  title: "Most problems arrive in fog. ",
  titleEmphasis: "The work is making them clear.",
  lede: "My professional experience, as it actually is: client-facing technical roles where I solve what I can, and make sure everything else reaches the right person with what they need.",
};

export const roles: Role[] = [
  {
    period: "Mar 2025 — Present",
    title: "Operations & Frontend Developer",
    organization: "NTG Clarity · Markatty",
    location: "Cairo, Egypt",
    cases: [
      { tag: "E-commerce operations", text: "I own high-priority and complex client store issues end to end — about three cases a week." },
      { tag: "Technical troubleshooting", text: "I resolve around 70% of them independently, without escalation — including custom CSS, mobile responsiveness, and spacing and layout issues." },
      { tag: "Client communication", text: "I work directly with 10+ clients who need urgent fixes or developer-level attention." },
      { tag: "Business requirements", text: "I clarify what each client needs and recommend practical changes to their store setup." },
      { tag: "Coordination with developers", text: "When a code change is needed, I investigate the root cause and hand developers a well-documented request." },
      {
        tag: "UI & storefront design",
        text: "I designed and built 10+ interactive UI prototypes in HTML, CSS and JavaScript, so clients and developers can review an experience without any tools — and three storefront themes in React and Next.js, now live on the platform. The Frontend team handled publishing.",
      },
    ],
  },
  {
    period: "Apr 2023 — Feb 2025",
    title: "Account Manager",
    organization: "Dentolize · Dental Clinic Management System",
    location: "Cairo, Egypt",
    cases: [
      { tag: "Client relationships", text: "I managed relationships with 15 dental clinics, resolving issues by phone, AnyDesk remote sessions and on-site visits." },
      { tag: "Technical troubleshooting", text: "I resolved around four technical issues a week — device problems, system start-up failures, date and time configuration errors — mostly remotely." },
      { tag: "Training & onboarding", text: "I onboarded and trained 30 clinics, doctors and staff, in person and over Zoom or Google Meet, driving feature adoption." },
      { tag: "Coordination with developers", text: "I reported bugs with full details and followed up on fixes, updates and rollouts." },
    ],
  },
];

export const experienceExtras: ExperienceExtra[] = [
  {
    tag: "Live client project",
    title: "United World Foundation",
    text: "A bilingual English / Arabic website for a non-profit — areas of work, success stories, archive, contact and donations — designed and built with React and Next.js as a Markatty client project.",
    link: { label: "Visit uwf-eg.org/en", href: "https://uwf-eg.org/en" },
  },
  {
    tag: "Education",
    title: "B.Sc. Computers & Management Information Systems",
    text: "New Cairo Academy, Cairo · June 2021",
  },
  {
    tag: "Service",
    title: "Mandatory military service",
    text: "Egypt · completed, 2021 — April 2023",
  },
];
