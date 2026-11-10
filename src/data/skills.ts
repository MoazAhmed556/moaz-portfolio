import type { ChapterHeading, SkillCategory } from "@/types";

/**
 * 03 · THE SKILLS (anchor #expertise) — each item says how hands-on it is and where it shows up.
 * No proficiency scores. "Currently learning" is kept separate from experience.
 * `projects` lists project ids from projects.ts; each one becomes a "See it in …" button.
 */
export const expertiseHeading: ChapterHeading = {
  label: "The Skills",
  title: "What I work with, ",
  titleEmphasis: "and how hands-on I am.",
  lede: "Work skills, tools and current learning, kept separate. Choose one to see where it comes from.",
};

export const skillCategories: SkillCategory[] = [
  {
    id: "practice",
    label: "Work skills",
    intro: "From my roles at Markatty and Dentolize. Business analysis was part of my main role, not a separate job title.",
    items: [
      { code: "A-01", name: "E-commerce operations", evidence: "Store setup and day-to-day support for clients on the Markatty platform.", source: "NTG Clarity · Markatty — 2025 to present" },
      { code: "A-02", name: "Client relationship management", evidence: "Client meetings, follow-ups and ongoing accounts — including weekly reviews with a pharmacy client and helping an unhappy client decide to stay.", source: "Markatty · Dentolize" },
      { code: "A-03", name: "Troubleshooting", evidence: "Investigating store and system issues, and fixing storefront display problems with CSS.", source: "Markatty · Dentolize" },
      { code: "A-04", name: "Business & process analysis", evidence: "Mapping how work moves between departments, finding missing steps and unclear ownership, and proposing clearer handovers — including a proposed CRM workflow and requirements.", source: "NTG Clarity · Markatty" },
      { code: "A-05", name: "Customer experience analysis", evidence: "Reviewing complaints, recurring problems and storefront usability, and turning them into product and UX suggestions such as a Notify Me button for out-of-stock products.", source: "NTG Clarity · Markatty" },
      { code: "A-06", name: "Competitor analysis", evidence: "A comparison of Markatty with other e-commerce platforms — services, pricing, subscriptions and gaps — presented to management with recommendations.", source: "NTG Clarity · Markatty" },
      { code: "A-07", name: "Working with developers", evidence: "Clear, documented requests and bug reports, followed until the issue is addressed.", source: "Markatty · Dentolize" },
      { code: "A-08", name: "UI/UX design", evidence: "Storefront themes and store layouts at Markatty, and the projects in this portfolio.", source: "Client work · Markatty · Projects in this portfolio", projects: ["uwf", "atelier-01", "nar-hatab"] },
    ],
  },
  {
    id: "tools",
    label: "Tools & technologies",
    intro: "What I use, and how much of it I do myself.",
    items: [
      { code: "B-01", name: "HTML · CSS · Tailwind CSS", evidence: "Hands-on. I wrote the United World Foundation site myself, and I write the layout and styling of storefront themes.", source: "Client work · Markatty", projects: ["uwf"] },
      { code: "B-02", name: "React · Next.js", evidence: "I built the United World Foundation site in Next.js on my own. On storefront themes I build and edit components with AI assistance, while other developers handle the JavaScript logic and APIs.", source: "Client work · Markatty — part-time", projects: ["uwf"] },
      { code: "B-03", name: "AI-assisted development", evidence: "I plan the project, write the prompts and guide the build, review the generated code, test on desktop and mobile, and fix layout and styling myself.", source: "Projects in this portfolio", projects: ["automotive-showroom", "olfact", "sole-district"] },
      { code: "B-04", name: "Figma", evidence: "Store layouts and UI screens for clients.", source: "NTG Clarity · Markatty" },
      { code: "B-05", name: "Git · GitHub · Vercel", evidence: "This portfolio's code is on GitHub and deployed on Vercel.", source: "This portfolio" },
      { code: "B-06", name: "Excel · AnyDesk · Zoom", evidence: "PivotTables and Power Query, remote support sessions, and online client meetings.", source: "Markatty · Dentolize" },
    ],
  },
  {
    id: "learning",
    label: "Currently learning",
    learning: true,
    intro: "Learning in progress — not professional experience, and not a certification.",
    items: [
      { code: "C-01", name: "DevOps course", evidence: "eYouth Learning Platform, in progress: Linux, Git and GitHub, Docker, Jenkins, CI/CD and cloud deployment.", source: "eYouth — in progress" },
      { code: "C-02", name: "Linux & Docker practice", evidence: "Practising basic Linux and Docker commands as part of the course.", source: "Learning" },
      { code: "C-03", name: "JavaScript logic & APIs", evidence: "Application logic, data fetching and API integration — learning them now, not yet part of my professional work.", source: "Learning" },
    ],
  },
];
