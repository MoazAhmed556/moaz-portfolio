import type { ChapterHeading, ExperienceExtra, Role } from "@/types";

/**
 * 02 · THE EXPERIENCE (anchor #challenges) — what the work actually is.
 * No counts or percentages: none of them is confirmed yet. Add one only when Moaz confirms it.
 */
export const challengesHeading: ChapterHeading = {
  label: "The Experience",
  title: "Client-facing technical work, ",
  titleEmphasis: "in e-commerce and clinic software.",
  lede: "Over three years in client-facing technical roles. My main work is e-commerce operations and client support — which grew into analysing processes, customer problems and competitors, and proposing improvements.",
};

export const roles: Role[] = [
  {
    period: "Mar 2025 — Present · main role",
    title: "E-commerce Operations & Client Support",
    organization: "NTG Clarity · Markatty",
    location: "Cairo, Egypt",
    cases: [
      { tag: "Client relationships", text: "I manage client relationships, run client meetings and follow up on their issues and progress, including for pharmacy businesses." },
      { tag: "Store setup & support", text: "I help clients set up, configure and use their stores and dashboards, explain how the platform works, and troubleshoot operational and platform problems." },
      { tag: "Working with developers", text: "When a problem needs a developer, I document it clearly for the technical team and follow it until it is addressed." },
      { tag: "Business & process analysis", text: "Within this role, I review recurring complaints and storefront usability problems, look at how work moves between Sales, Account Management, Operations and Development, and propose clearer responsibilities and handovers to management." },
      { tag: "Case · Pharmacy Chain Client", text: "Main contact for a pharmacy chain, with weekly review meetings: I solved what I could in the meeting, showed the team how to avoid recurring problems, and escalated real bugs to developers. I also proposed that Add to Cart should change to Notify Me when a product is out of stock — I spotted the UX problem and suggested the fix; I didn’t build it." },
      { tag: "Case · Client retention", text: "A client unhappy with the service was considering leaving. I handled the conversation, helped rebuild their confidence, and guided them through the dashboard step by step, along with other platform tasks." },
      { tag: "Case · Proposed CRM workflow & requirements", text: "When Markatty planned its CRM, I proposed the customer-lifecycle workflow — what Sales, Account Management, Operations and Development each own, from first sale to renewal — and what the CRM should track: stages, owners, interactions, onboarding progress and where delays happen. I defined the requirements and the workflow; I didn’t build the CRM system." },
      { tag: "Case · Competitor analysis", text: "I compared Markatty with other e-commerce platform providers — services, features, pricing and subscriptions, customer experience — and presented the gaps and my recommendations on product, services, pricing and positioning to management." },
    ],
  },
  {
    period: "Mar 2025 — Present · part-time",
    title: "Frontend Development",
    organization: "NTG Clarity · Markatty",
    location: "Cairo, Egypt",
    cases: [
      { tag: "Storefront themes", text: "I design the pages and UX of e-commerce storefront themes, write the HTML, CSS and Tailwind, and build and edit React / Next.js components, with AI assistance where needed." },
      { tag: "Review & testing", text: "I review the generated code, test on desktop and mobile, and fix visual and responsive issues until the interface is right." },
      { tag: "With the frontend team", text: "Other developers handle the JavaScript business logic, API integration, data fetching and publishing." },
    ],
  },
  {
    period: "Apr 2023 — Feb 2025",
    title: "Account Manager",
    organization: "Dentolize · Dental Clinic Management System",
    location: "Cairo, Egypt",
    cases: [
      { tag: "Client accounts", text: "I managed clinic accounts and handled system issues by phone, AnyDesk remote sessions and on-site visits." },
      { tag: "Onboarding", text: "I helped clinic teams adopt the system and use its features." },
      { tag: "Bug reporting", text: "I reported bugs to the development team in detail and followed fixes and updates through." },
    ],
  },
];

export const experienceExtras: ExperienceExtra[] = [
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
