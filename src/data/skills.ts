import type { ChapterHeading, SkillCategory } from "@/types";

/**
 * 04 · THE EXPERTISE — every item is backed by the CV or by a project in this portfolio.
 * No proficiency scores. "Currently learning" is kept separate from experience.
 * `projects` lists project ids from projects.ts; each one becomes a "See it in …" button.
 */
export const expertiseHeading: ChapterHeading = {
  label: "The Expertise",
  title: "Every skill here points to ",
  titleEmphasis: "where it shows up.",
  lede: "No percentages, no stars. Choose a skill to see the evidence behind it — from my CV, or from the projects you can open in this portfolio.",
};

export const skillCategories: SkillCategory[] = [
  {
    id: "practice",
    label: "Practical experience",
    intro: "What I do in my work — taken directly from my roles at Markatty and Dentolize.",
    items: [
      { code: "A-01", name: "E-commerce operations", evidence: "I own high-priority and complex client store issues end to end — about three cases a week.", source: "NTG Clarity · Markatty — 2025 to present" },
      { code: "A-02", name: "Technical troubleshooting", evidence: "I resolve around 70% of those cases without escalation: custom CSS, mobile responsiveness, spacing and layout. At Dentolize I resolved about four technical issues a week, mostly over AnyDesk.", source: "Markatty · Dentolize" },
      { code: "A-03", name: "Client communication", evidence: "I work directly with 10+ clients who need urgent fixes or developer-level attention. Before that, I managed relationships with 15 dental clinics.", source: "Markatty · Dentolize" },
      { code: "A-04", name: "Business requirements", evidence: "I clarify what clients actually need and recommend practical changes to their store setup.", source: "NTG Clarity · Markatty" },
      { code: "A-05", name: "Frontend collaboration", evidence: "When a code change is needed, I investigate the root cause and hand developers a well-documented request. The Frontend team published the storefront themes I built.", source: "NTG Clarity · Markatty" },
      { code: "A-06", name: "UI & storefront design", evidence: "I designed and built 10+ interactive UI prototypes and three e-commerce storefront themes that are now live on the platform.", source: "NTG Clarity · Markatty", projects: ["nar-hatab", "freshmart", "hany-pharmacy"] },
      { code: "A-07", name: "Onboarding & training", evidence: "I onboarded and trained 30 clinics — doctors and staff — in person and over Zoom or Google Meet, driving feature adoption.", source: "Dentolize — 2023 to 2025" },
      { code: "A-08", name: "Bug reporting & follow-up", evidence: "I reported bugs to developers with full details and followed fixes through updates and rollouts.", source: "Dentolize" },
    ],
  },
  {
    id: "tools",
    label: "Tools & technologies",
    intro: "What I build and work with — each one tied to where it shows up.",
    items: [
      { code: "B-01", name: "HTML5 · CSS3 · JavaScript (ES6+)", evidence: "The foundation of every project in this portfolio and of my 10+ interactive prototypes — layouts, animation and real interactions, with no libraries in most of them.", source: "Projects in this portfolio", projects: ["maison-sucree", "shopik-loopik", "pawland"] },
      { code: "B-02", name: "React.js & Next.js", evidence: "Full pages and components for three storefront themes now live on Markatty, and the bilingual United World Foundation website.", source: "NTG Clarity · Markatty" },
      { code: "B-03", name: "Responsive layouts", evidence: "Every project here is designed to work from a 360px phone to a wide desktop — open any of them and switch to phone width.", source: "Projects in this portfolio", projects: ["freshmart", "bo-scrunchiess"] },
      { code: "B-04", name: "Motion & interaction", evidence: "Scroll reveals, drag-and-drop, fly-to-cart and 3D effects built with CSS, requestAnimationFrame and the Web Animations API.", source: "Projects in this portfolio", projects: ["nar-hatab", "shopik-loopik"] },
      { code: "B-05", name: "Bootstrap", evidence: "Used for my personal profile website, presenting skills, services and contact information.", source: "CV — projects" },
      { code: "B-06", name: "Git & GitHub", evidence: "Version control and code hosting, listed among the tools on my CV.", source: "CV — tools & data" },
      { code: "B-07", name: "Excel — PivotTables, Power Query", evidence: "Summarising and shaping data with PivotTables and Power Query, listed among the tools on my CV.", source: "CV — tools & data" },
      { code: "B-08", name: "AnyDesk · Zoom · Google Meet", evidence: "Remote support sessions and clinic training.", source: "Dentolize" },
    ],
  },
  {
    id: "learning",
    label: "Currently learning",
    learning: true,
    intro: "What I am studying now. This is learning in progress — not professional experience, and not a certification.",
    items: [
      { code: "C-01", name: "DevOps course", evidence: "In progress with the eYouth Learning Platform: Linux, Docker, Jenkins and CI/CD fundamentals.", source: "eYouth — in progress" },
      { code: "C-02", name: "Linux fundamentals", evidence: "Hands-on practice with Linux commands as part of the course.", source: "Learning" },
      { code: "C-03", name: "Docker basics", evidence: "Hands-on practice with Docker commands as part of the course.", source: "Learning" },
      { code: "C-04", name: "Jenkins basics", evidence: "Introduction to build automation with Jenkins.", source: "Learning" },
      { code: "C-05", name: "CI/CD fundamentals", evidence: "How code moves from a commit to a release — the side of the work I usually hand off to developers.", source: "Learning" },
    ],
  },
];
