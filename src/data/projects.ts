import type { ChapterHeading, Project } from "@/types";

/**
 * 05 · THE PROJECTS
 *
 * Every feature and technology below was verified against each project's source code.
 * "Design objectives" describe the intent visible in each design, not measured results.
 *
 * To add a project:
 *   1. put its HTML file in /public/projects/<id>.html
 *   2. add a desktop screenshot (/public/images/projects/<id>.jpg, 790×494)
 *      and a phone screenshot (/public/images/projects/<id>-m.jpg, 390×844)
 *   3. add an entry below. Order here = order in the exhibition.
 * When a project is hosted publicly, set `liveUrl` — the "Open on its own" links then
 * become "Visit the live site". The viewer keeps showing the local copy, because many
 * live sites refuse to be shown inside another page.
 */
export const projectsHeading: ChapterHeading = {
  label: "The Projects",
  title: "Eight digital destinations. ",
  titleEmphasis: "Every one of them works.",
  lede: "These are real, working websites — not screenshots. Enter any project to scroll it, search it, add to the cart and use it as a customer would.",
};

export const projects: Project[] = [
  {
    id: "nar-hatab",
    name: "Nar / Hatab",
    industry: "Restaurant · online ordering",
    previewUrl: "/projects/nar-hatab",
    screenshot: "/images/projects/nar-hatab.jpg",
    screenshotMobile: "/images/projects/nar-hatab-m.jpg",
    colors: ["#1a1411", "#f6f0e6", "#b5471f"],
    tint: "#f4e7dc",
    accent: "#b5471f",
    stats: ["34 dishes", "3 ordering modes", "QR table scan"],
    tagline: "Order a Levantine feast from the table, the counter or the sofa.",
    description:
      "A wood-fired Levantine restaurant where guests choose dine-in, pickup or delivery, build their order from a 34-dish menu and follow it through a simulated kitchen tracker. Dishes animate onto a table, into a bag or into a box, depending on how you dine.",
    role: "Designed and built as an interactive prototype: concept, the flows for three ordering modes, visual design and the complete front-end code.",
    objectives: [
      "Make three very different ways of ordering feel like one calm journey.",
      "Carry the warmth of a wood-fired kitchen into the interface through type, colour and photography.",
      "Keep every step clear on a phone, where most orders start.",
    ],
    features: [
      "Dine-in, pickup and delivery modes — tables chosen on a floor plan, by code, or by scanning a QR code with the camera",
      "Dish customisation with required and optional choices, quantities and kitchen notes, all validated",
      "Editable order with the dine-in service charge and delivery fee calculated live",
      "Animated table, bag and box scenes with each dish flying in",
      "Checkout validation per mode, then a simulated kitchen tracker",
      "Feedback form feeding a live guest book, plus a guided mobile app mode",
    ],
    tech: ["HTML5 · <dialog>", "CSS3 · Grid, keyframes, scroll-snap", "Vanilla JavaScript (ES2020+)", "IntersectionObserver", "Web Animations API", "History API", "getUserMedia + BarcodeDetector", "Canvas 2D", "jsQR 1.4.0 (scanner fallback)", "Google Fonts"],
    notes: "Camera QR scanning needs a secure page (https or localhost) and camera permission; table codes and the floor plan always work.",
    allow: "camera; clipboard-write",
  },
  {
    id: "freshmart",
    name: "Freshmart Ismailia",
    industry: "Grocery · supermarket storefront",
    previewUrl: "/projects/freshmart",
    screenshot: "/images/projects/freshmart.jpg",
    screenshotMobile: "/images/projects/freshmart-m.jpg",
    colors: ["#0c3b29", "#136b45", "#ffd23f"],
    tint: "#e3eee5",
    accent: "#136b45",
    stats: ["5,111 products", "28 departments", "English / Arabic"],
    tagline: "A whole supermarket, one aisle away.",
    description:
      "A full-catalogue grocery store — 5,111 products across 28 departments — laid out like walking into the shop: sliding doors, aisle signs and stocked shelves. Shoppers browse or search in English or Arabic and drag products straight into an animated trolley.",
    role: "Designed and built the storefront prototype around the store’s real catalogue: information structure, interface design and the complete front-end in vanilla JavaScript.",
    objectives: [
      "Make 5,111 products feel browsable rather than overwhelming, by borrowing the structure of a real store.",
      "Serve Arabic and English shoppers equally, including a true right-to-left layout.",
      "Turn adding to the trolley into a tactile, satisfying moment.",
    ],
    features: [
      "English / Arabic switch with a full right-to-left layout, remembered between visits",
      "Bilingual search with live suggestions, Arabic spelling normalisation and SKU matching",
      "Aisles, collections and product pages, with stock and price filters kept in the URL",
      "Drag-to-trolley with a mouse or a long-press on touch, capped at available stock",
      "Trolley drawer with quantities and totals saved in the browser — a bottom dock on phones",
      "Infinite-scrolling shelves that load 24 products at a time",
    ],
    tech: ["HTML5", "CSS3 · Grid, scroll-snap, logical properties (RTL)", "Vanilla JavaScript — no libraries", "Pointer & Touch Events", "IntersectionObserver", "Web Animations API", "URLSearchParams + History API", "Intl.Collator (Arabic)", "Clipboard API", "localStorage", "Google Fonts"],
    notes: "The full catalogue is embedded in the page (about 1.5 MB), so the first load takes a moment.",
    allow: "clipboard-write",
  },
  {
    id: "hany-pharmacy",
    name: "Dr. Hany Abdelzaher Pharmacies",
    shortName: "Hany Pharmacies",
    industry: "Healthcare · online pharmacy proposal",
    previewUrl: "/projects/hany-pharmacy",
    screenshot: "/images/projects/hany-pharmacy.jpg",
    screenshotMobile: "/images/projects/hany-pharmacy-m.jpg",
    colors: ["#0b7a3e", "#14a093", "#13212e"],
    tint: "#e0f0ea",
    accent: "#0b7a3e",
    stats: ["In-browser OCR", "Barcode lookup", "Fuzzy search"],
    tagline: "Upload a prescription. The store reads it for you.",
    description:
      "A smart-pharmacy design proposal for Dr. Hany Abdelzaher Pharmacies. Beyond a premium storefront, its standout tool reads an uploaded prescription in the browser and matches the medicines to the catalogue.",
    role: "Designed and built the proposal: concept, interface design and the front-end, including the prescription reader, fuzzy search and barcode lookup.",
    objectives: [
      "Present a pharmacy online with the calm and trust of a well-run counter.",
      "Remove the friction of typing medicine names, through prescription reading and forgiving search.",
      "Be clear that prices, stock and codes in a proposal are illustrative.",
    ],
    features: [
      "Prescription assistant: upload a photo or PDF, read it with in-browser OCR and match medicines with confidence scores",
      "Fuzzy search with autocomplete that tolerates misspelt medicine names",
      "Filters by category, type, availability, brand and price, with removable chips",
      "Medicine lookup by name, code or barcode — EAN-13 barcodes drawn as SVG, optional camera scanning",
      "Cart and wishlist drawers with prescription-only warnings, saved in the browser",
      "Hero and new-arrivals carousels, a mobile-app mockup and a weekly-offers countdown",
    ],
    tech: ["HTML5", "CSS3", "Vanilla JavaScript", "Tesseract.js 5.1.1 (OCR, loaded on demand)", "pdf.js 3.11.174 (loaded on demand)", "Canvas 2D", "File & Drag-and-Drop APIs", "BarcodeDetector + getUserMedia", "Clipboard API", "localStorage & sessionStorage", "IntersectionObserver", "Google Fonts"],
    notes: "The page is large (about 4.3 MB of embedded images). Prescription reading downloads its OCR engine on first use and needs an internet connection.",
    allow: "camera; clipboard-write",
  },
  {
    id: "maison-sucree",
    name: "Maison Sucrée",
    industry: "Food · pâtisserie storefront",
    previewUrl: "/projects/maison-sucree",
    screenshot: "/images/projects/maison-sucree.jpg",
    screenshotMobile: "/images/projects/maison-sucree-m.jpg",
    colors: ["#321c1b", "#fff8f0", "#c58a52"],
    tint: "#f3e6d8",
    accent: "#8a5a33",
    stats: ["39 products", "Cake builder", "No libraries"],
    tagline: "Dark chocolate, slowly made — and a cake you design yourself.",
    description:
      "An editorial store for a modern pâtisserie, with 39 products, an interactive signature cake and a build-your-own-cake studio. The cart and wishlist stay in the browser; checkout and newsletter are clearly marked as demos.",
    role: "Designed and built as an interactive prototype: art direction, interface design and the full front-end in plain JavaScript, with no libraries.",
    objectives: [
      "Make dessert shopping feel indulgent and editorial, like looking into a pâtisserie window.",
      "Let customers design a cake visually instead of filling in a form.",
      "Keep a long, rich page easy to move through on any screen.",
    ],
    features: [
      "Build-your-own-cake studio — flavour, size, filling, finish and message, with a live cake and live price",
      "Shop explorer with category chips, debounced search, four sorts, grid/list view and “load more”",
      "Cart drawer with a free-delivery progress bar, plus a wishlist — both saved in the browser",
      "Quick view with sizes and quantity; overlays trap focus and close with Esc",
      "Signature cake with layer hotspots and a pointer-follow tilt",
      "Swipeable hero and review carousels, a gallery lightbox and a “dessert match” picker",
    ],
    tech: ["HTML5 · inline SVG", "CSS3 · Grid, keyframes, backdrop-filter", "Vanilla JavaScript — no libraries", "localStorage", "IntersectionObserver", "requestAnimationFrame", "Touch events", "inert", "Google Fonts"],
    notes: "Runs fully inside the preview; the cart and wishlist are saved in your browser.",
    allow: "clipboard-write",
  },
  {
    id: "shopik-loopik",
    name: "Shopik Loopik",
    industry: "Retail · stationery & creative supplies",
    previewUrl: "/projects/shopik-loopik",
    screenshot: "/images/projects/shopik-loopik.jpg",
    screenshotMobile: "/images/projects/shopik-loopik-m.jpg",
    colors: ["#f8f5ed", "#24231f", "#d5f36a"],
    tint: "#eef2df",
    accent: "#334c3c",
    stats: ["8 chapters", "Desk builder", "SVG-drawn products"],
    tagline: "Open the book. Walk into the shop.",
    description:
      "A creative-supplies shop presented as a living library: you open a 3D book to enter, then move through eight chapters to browse, style a desk and build gift bundles. Every product illustration is SVG drawn by the JavaScript.",
    role: "Designed and built as an interactive prototype: concept and storytelling, the SVG illustration system, interface design and the full front-end.",
    objectives: [
      "Turn a stationery shop into a story you walk into, chapter by chapter.",
      "Make every product illustration part of one consistent drawn world.",
      "Let shoppers play — style a desk, build a box — before they buy.",
    ],
    features: [
      "3D book intro that opens into the site — skippable, and remembered on return visits",
      "“Build your dream desk”: drag items around an SVG desk, change colours and moods, add the whole desk to the bag",
      "Loopik Box bundle builder with a 12% bundle discount",
      "Catalogue with debounced search, category chips, a zone filter and sorting",
      "Bag and wishlist with stock-capped quantities and a free-delivery threshold",
      "Quick view with colour swatches and a fly-to-bag animation",
    ],
    tech: ["HTML5", "CSS3 · 3D transforms, mask-image, scroll-snap", "JS-generated SVG", "Vanilla JavaScript — no libraries", "Pointer Events (setPointerCapture)", "Web Animations API", "IntersectionObserver", "localStorage", "Google Fonts"],
    notes: "Opens with a short book intro — tap the cover, or use “Skip intro”.",
    allow: "clipboard-write",
  },
  {
    id: "bo-scrunchiess",
    name: "BO Scrunchiess",
    industry: "Fashion · boutique accessories",
    previewUrl: "/projects/bo-scrunchiess",
    screenshot: "/images/projects/bo-scrunchiess.jpg",
    screenshotMobile: "/images/projects/bo-scrunchiess-m.jpg",
    colors: ["#5b1838", "#b8679f", "#efe3f2"],
    tint: "#f3e6ef",
    accent: "#5b1838",
    stats: ["26 products", "387 variants", "9 categories"],
    tagline: "Satin for every strand, wrapped like a gift.",
    description:
      "A one-page boutique for satin hair accessories: 26 products across 9 categories, each category staged with its own layout, frame shapes and colours. Colour and size choices know which combinations exist and swap the photo to match.",
    role: "Designed and built the boutique prototype around the brand’s real catalogue — 26 products with 387 colour and size variants: interface design and front-end.",
    objectives: [
      "Give each of nine categories its own stage while staying one coherent boutique.",
      "Make 387 colour and size combinations easy to choose from, without dead ends.",
      "Keep the soft, gift-like character of the brand across the whole page.",
    ],
    features: [
      "Circular category picker with a “now viewing” indicator that follows your scroll",
      "A distinct staged layout for every category, including a dark berry theme for gift boxes",
      "Variant-aware colour and size chips — unavailable combinations are disabled and the photo follows your choice",
      "Featured-product gallery with crossfade and a product rail",
      "Add-to-bag fly animation and a bag drawer saved in the browser",
      "An SVG ribbon that draws itself in, clip-path reveals and gentle parallax",
    ],
    tech: ["HTML5", "CSS3 · clip-path, conic-gradient, scroll-snap", "Vanilla JavaScript — no libraries", "IntersectionObserver (reveals & scroll-spy)", "requestAnimationFrame", "Web Animations API", "SVG stroke animation", "localStorage", "Clipboard API", "Google Fonts"],
    notes: "Product photos load from the brand’s image CDN and need an internet connection.",
    allow: "clipboard-write",
  },
  {
    id: "pawland",
    name: "PAWLAND",
    industry: "Pets · pet supplies store",
    previewUrl: "/projects/pawland",
    screenshot: "/images/projects/pawland.jpg",
    screenshotMobile: "/images/projects/pawland-m.jpg",
    colors: ["#231a33", "#fff6ea", "#ff6b4a"],
    tint: "#fbe7dc",
    accent: "#c4452c",
    stats: ["42 products", "Pet quiz", "Corner builder"],
    tagline: "Big adventures. Little paws.",
    description:
      "A story-led pet store for cats and dogs: a scroll-driven hero and a five-chapter “day in a pet’s life” lead into a full shop of 42 products. A quiz recommends products, and a builder assembles a pet corner you can add to the cart in one click.",
    role: "Designed and built as an interactive prototype: concept, interface design and the full front-end.",
    objectives: [
      "Lead with story and personality before the shop, the way pet owners actually feel.",
      "Help undecided owners choose, through a quiz and a ready-made corner builder.",
      "Keep every animation optional for visitors who prefer reduced motion.",
    ],
    features: [
      "Shop with accent-insensitive search, category chips with live counts, collections and sorting",
      "Quick view where colour swatches swap the photo and size changes the price",
      "Four-step pet quiz that scores the catalogue and recommends the top four",
      "Pet-corner builder: pick a bed, bowl, toy and extra, preview the room, add the set at once",
      "Cart and wishlist drawers saved in the browser",
      "Pinned scroll hero with a clip-path reveal and a leash that draws itself — all off for reduced motion",
    ],
    tech: ["HTML5 · SVG sprite", "CSS3 · Grid areas, clip-path, color-mix(), svh", "Vanilla JavaScript — no libraries", "IntersectionObserver", "localStorage", "requestAnimationFrame", "Web Animations API", "Google Fonts"],
    notes: "The scroll-driven hero needs the preview to scroll — use full screen for the best view.",
    allow: "clipboard-write",
  },
  {
    id: "offscript",
    name: "OFFSCRIPT",
    industry: "Education · learning platform landing page",
    previewUrl: "/projects/offscript",
    screenshot: "/images/projects/offscript.jpg",
    screenshotMobile: "/images/projects/offscript-m.jpg",
    colors: ["#11110f", "#d6ff3f", "#ff6b35"],
    tint: "#eef3d6",
    accent: "#11110f",
    stats: ["6 courses", "Zero images", "CSS-only art"],
    tagline: "Think outside the lines.",
    description:
      "A bold editorial landing page for an independent learning platform, pitching short “side quest” classes. All the artwork — the hero, six course covers and the feature cards — is drawn in CSS, with no images at all.",
    role: "Designed and built as a landing-page concept: art direction and front-end — a study in typography and CSS-only illustration.",
    objectives: [
      "Create a strong, poster-like identity using only typography and CSS shapes.",
      "Keep the page light, with no image requests at all.",
      "Make finding a class quick, with filters and search.",
    ],
    features: [
      "Category filter pills and live keyword search across the class list",
      "Subject tiles that pre-filter the classes and jump straight to them",
      "Newsletter form with validation and a clear demo confirmation",
      "Sticky frosted header and a mobile menu",
      "CSS-only abstract artwork, with no image requests",
    ],
    tech: ["HTML5", "CSS3 · Grid, mix-blend-mode, backdrop-filter, clamp()", "Vanilla JavaScript", "System fonts — no external requests"],
    notes: "A landing-page concept — course prices are display only.",
    allow: "",
  },
];

export const projectName = (p: Project) => p.shortName ?? p.name;
