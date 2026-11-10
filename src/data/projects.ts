import type { ChapterHeading, Project } from "@/types";

/**
 * 04 · THE PROJECTS — a short selection, strongest first.
 *
 * Honesty rules:
 *   - `industry` starts with what the project is: "Personal project", "Self-initiated concept"
 *     or "Unofficial concept" (uses a real business's name → `unofficial: true` shows the disclaimer).
 *     United World Foundation (kept LAST in the exhibition, at Moaz’s request) is the one client project: Moaz planned, designed and coded it on his own,
 *     without AI assistance (confirmed 2026-11-10) — never describe it like the AI-assisted concepts.
 *   - `role` says what Moaz did himself. For the six concepts (confirmed 2026-11-10, the same for all six): requirements
 *     and planning, design, directing the AI-assisted build, code review and testing on desktop and mobile,
 *     and his own HTML / CSS edits. He did NOT implement JavaScript business logic or API integration —
 *     never claim that.
 *   - Features and technologies were checked against each project's source code.
 *     Stats are short descriptions of the project, not counts.
 *
 * The other ten projects were taken off the page on 2026-11-10 but their files stay in
 * /public/projects and /public/images/projects (and in their own D:\Download folders).
 * Their earlier entries are in git history (commit 3b1f6db) if one should come back.
 *
 * To add a project:
 *   1. put its HTML file in /public/projects/<id>.html
 *      (a multi-file app goes in /public/projects/<id>/ with a rewrite in next.config.ts — see README)
 *   2. add a desktop screenshot (/public/images/projects/<id>.jpg) and a phone screenshot (<id>-m.jpg)
 *   3. add an entry below. Order here = order in the exhibition.
 */
export const projectsHeading: ChapterHeading = {
  label: "The Projects",
  title: "Seven projects. ",
  titleEmphasis: "Each one opens and works.",
  lede: "Six self-initiated projects that I planned and designed, built with AI coding tools and my own HTML and CSS, and tested on desktop and mobile — and, last, a client website I designed and coded on my own. Open any of them.",
};

export const projects: Project[] = [
  {
    id: "automotive-showroom",
    name: "Salon Noir",
    industry: "Personal project · 3D car showroom",
    previewUrl: "/projects/automotive-showroom",
    screenshot: "/images/projects/automotive-showroom.jpg",
    screenshotMobile: "/images/projects/automotive-showroom-m.jpg",
    tint: "#e7e3dc",
    accent: "#6f6248",
    stats: ["3D showroom", "Part-by-part studies", "Three.js"],
    tagline: "A private automotive museum you can walk into.",
    description:
      "A car showroom in the browser: three 3D car models under ring lights. Select a car and the camera moves to it; numbered markers open part-by-part studies with specifications.",
    role: "A personal project. I defined what the showroom should do, designed the staging, lighting and camera moves, and directed the build with AI coding tools — then reviewed it, tested it on desktop and mobile, and adjusted the HTML and CSS myself.",
    features: [
      "Select a car and the camera moves to it; ← / → switch cars",
      "Numbered markers tied to points on each car; drag to orbit",
      "Part studies that say how each part is shown: modelled, placed on the body, a schematic, or not modelled",
      "Quality that lowers itself on slower devices, plus reduced-motion support",
    ],
    tech: ["Three.js", "glTF models", "Vite", "JavaScript modules", "SVG"],
    notes: "Needs WebGL. One of the three models is a design study, not a production car. 3D model credits are inside the experience.",
    allow: "",
  },
  {
    id: "atelier-01",
    name: "ATELIER 01",
    industry: "Self-initiated concept · Architecture studio",
    previewUrl: "/projects/atelier-01",
    screenshot: "/images/projects/atelier-01.jpg",
    screenshotMobile: "/images/projects/atelier-01-m.jpg",
    tint: "#e9e1d5",
    accent: "#7e5c3a",
    stats: ["Interactive floor plan", "Room-by-room tour", "React · GSAP"],
    tagline: "Architecture of mass and light, explored room by room.",
    description:
      "A website for a sample architecture and interiors studio. Visitors walk a house on an interactive floor plan: choose a level, open a room, and see its photograph, materials and details.",
    role: "A self-initiated concept. I planned the pages and content, designed the visual system and the floor-plan idea, directed the AI-assisted build, and tested and refined the layout on desktop and mobile, editing HTML and CSS where needed.",
    features: [
      "A floor plan you explore level by level; each room opens with its photo, materials and details",
      "Project pages with typology filters and gallery and index views",
      "A material library whose samples carry into the enquiry form",
      "An enquiry form that saves in the browser and sends no email",
    ],
    tech: ["React", "React Router", "Vite", "GSAP", "SVG", "CSS Grid"],
    notes: "A sample studio — projects, team and contact details are placeholders. Photography from Unsplash, credited inside the site.",
    allow: "",
  },
  {
    id: "olfact",
    name: "OLFACT",
    industry: "Self-initiated concept · Fragrance store",
    previewUrl: "/projects/olfact",
    screenshot: "/images/projects/olfact.jpg",
    screenshotMobile: "/images/projects/olfact-m.jpg",
    tint: "#e4e2dc",
    accent: "#1f4a5a",
    stats: ["WebGL2 shaders", "Scent DNA quiz", "Demo checkout"],
    tagline: "A perfume house told as one continuous dive.",
    description:
      "A fictional fragrance house on one long page: each perfume is its own underwater world, its notes unfold as you scroll, and a short quiz suggests a fragrance before the store.",
    role: "A self-initiated concept. I wrote the concept and story, designed each world and the store, directed the AI-assisted build, and reviewed and tested it on desktop and mobile, fixing layout and responsive issues in the CSS myself.",
    features: [
      "A full-screen WebGL background that changes world by world as you scroll",
      "Top, heart and base notes revealed for each fragrance",
      "Scent DNA: pick moods and get a matched fragrance with the reasons",
      "A store with filters, quick view, sizes, a bag and a demo checkout",
    ],
    tech: ["HTML", "CSS", "JavaScript", "WebGL2 / GLSL", "localStorage"],
    notes: "A fictional brand — fragrances and prices are illustrative and no payment is taken. Works without WebGL using a simpler background. Photography from Unsplash.",
    allow: "",
  },
  {
    id: "nar-hatab",
    name: "Nar / Hatab",
    industry: "Self-initiated concept · Restaurant ordering",
    previewUrl: "/projects/nar-hatab",
    screenshot: "/images/projects/nar-hatab.jpg",
    screenshotMobile: "/images/projects/nar-hatab-m.jpg",
    tint: "#f4e7dc",
    accent: "#b5471f",
    stats: ["3 ordering modes", "QR table scan", "Live order totals"],
    tagline: "Order a Levantine feast from the table, the counter or the sofa.",
    description:
      "Online ordering for a restaurant, with one flow for dine-in, pickup and delivery. Guests build an order, see the total update, and follow it through a simulated kitchen tracker.",
    role: "A self-initiated concept. I mapped the three ordering flows, designed the interface, directed the AI-assisted build, and tested the flows on desktop and mobile, adjusting HTML and CSS where needed.",
    features: [
      "Dine-in, pickup and delivery — tables chosen on a floor plan, by code, or by scanning a QR code",
      "Dish options with required and optional choices, quantities and kitchen notes",
      "A live total with the service charge or delivery fee (demo values)",
      "Checkout checks for each mode, then a simulated kitchen tracker",
    ],
    tech: ["HTML", "CSS", "JavaScript", "Camera + BarcodeDetector", "jsQR"],
    notes: "Camera QR scanning needs a secure page and camera permission; typing the table code always works.",
    allow: "camera; clipboard-write",
  },
  {
    id: "sole-district",
    name: "SOLE DISTRICT",
    industry: "Self-initiated concept · Sneaker store",
    previewUrl: "/projects/sole-district",
    screenshot: "/images/projects/sole-district.jpg",
    screenshotMobile: "/images/projects/sole-district-m.jpg",
    tint: "#ebe6dc",
    accent: "#c8441a",
    stats: ["Live colour recolours", "Limited drop", "Demo checkout"],
    tagline: "Built to move. Made to stand out.",
    description:
      "A sneaker store for a fictional brand: the collection hangs like a gallery wall, details are explained with hotspots, and a limited drop has a countdown and a draw.",
    role: "A self-initiated concept. I defined the store’s structure and features, set the art direction, directed the AI-assisted build, and reviewed and tested it on desktop and mobile, editing HTML and CSS where needed.",
    features: [
      "A gallery-wall collection with filters, quick view and add to bag",
      "Colourways recoloured live in the browser, and labelled as recolours",
      "Sizes with stock, and a limited drop with a countdown and a draw entry",
      "A saved bag and a demo checkout",
    ],
    tech: ["HTML", "CSS", "JavaScript", "Canvas 2D + Web Worker", "localStorage"],
    notes: "A fictional brand — products, prices and the drop are illustrative; checkout takes no payment and the draw sends nothing.",
    allow: "",
  },
  {
    id: "freshmart",
    name: "Freshmart Ismailia",
    unofficial: true,
    industry: "Unofficial concept · Grocery store",
    previewUrl: "/projects/freshmart",
    screenshot: "/images/projects/freshmart.jpg",
    screenshotMobile: "/images/projects/freshmart-m.jpg",
    tint: "#e3eee5",
    accent: "#136b45",
    stats: ["Aisles & shelves", "Arabic / English", "Drag to the trolley"],
    tagline: "A whole supermarket, one aisle away.",
    description:
      "A grocery store concept laid out like walking into the shop, with aisles and shelves. Shoppers browse or search in English or Arabic and drag products into the trolley.",
    role: "A self-initiated concept, not commissioned by the store. I planned the store structure and the bilingual experience, designed the interface, directed the AI-assisted build, and tested it in both languages on desktop and mobile, editing HTML and CSS where needed.",
    features: [
      "English / Arabic with a full right-to-left layout",
      "Bilingual search that handles Arabic spelling variations",
      "Aisles, collections and product pages, with filters kept in the URL",
      "Drag to the trolley with a mouse, or long-press on a phone",
    ],
    tech: ["HTML", "CSS", "JavaScript", "Pointer & Touch Events", "localStorage"],
    notes: "The catalogue is embedded in the page (about 1.5 MB), so the first load takes a moment.",
    allow: "clipboard-write",
  },
  {
    id: "uwf",
    name: "United World Foundation",
    shortName: "United World",
    industry: "Client project · Foundation website",
    previewUrl: "https://uwf-eg.org/en",
    liveUrl: "https://uwf-eg.org/en",
    screenshot: "/images/projects/uwf.jpg",
    screenshotMobile: "/images/projects/uwf-m.jpg",
    tint: "#e4e9f1",
    accent: "#1f4fbf",
    stats: ["Live client site", "English / Arabic (RTL)", "Next.js · Tailwind"],
    tagline: "A foundation’s work, in English and Arabic.",
    description:
      "The public website of United World Foundation, a Markatty client: home, about, areas of work, success stories, archive and contact, plus a donation section — in English and Arabic.",
    role: "A client project I handled on my own: requirements and planning, project structure, page design and UX, coding in Next.js, React and Tailwind CSS, then testing and refinement — without AI assistance or another developer.",
    features: [
      "Separate English and Arabic versions, with a right-to-left layout for Arabic",
      "Home, About, Areas of work, Success stories, Archive and Contact pages",
      "A donation section with bank details and a QR code to scan",
      "Responsive layouts with a phone menu",
    ],
    tech: ["Next.js (App Router)", "React", "Tailwind CSS", "next/font · Inter, Cairo"],
    notes: "A live client website — the viewer shows the public site at uwf-eg.org. Content and photos belong to the foundation.",
    allow: "",
  },
];

export const projectName = (p: Project) => p.shortName ?? p.name;

/**
 * Filters in the project index. A project can appear in more than one.
 * Add a new project's id to the filters that describe it.
 */
export const projectFilters: { id: string; label: string; projects: string[] }[] = [
  { id: "client", label: "Client work", projects: ["uwf"] },
  { id: "commerce", label: "E-commerce", projects: ["olfact", "nar-hatab", "sole-district", "freshmart"] },
  { id: "experience", label: "Interactive experiences", projects: ["automotive-showroom", "atelier-01", "olfact"] },
  { id: "arabic", label: "Arabic / RTL", projects: ["uwf", "freshmart"] },
];
