# Moaz Ahmed — A Journey Through Light

A cinematic, bright-luxury portfolio in eight chapters, built with **Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Motion and Lucide**.

| # | Chapter | What happens |
|---|---|---|
| 01 | The Beginning | A sunlit room drawn in CSS. Scrolling walks you through its window into open sky. |
| 02 | The Vision | Drifting clouds and five working principles, each with a real "in practice" proof. |
| 03 | The Challenges | Fog clears and arches draw in, revealing experience at Markatty and Dentolize. |
| 04 | The Expertise | A blueprint. Three tabs of skills, each showing its evidence (no percentages). |
| 05 | The Projects | A sideways exhibition of 16 working projects, each opening in a live, interactive browser viewer. |
| 06 | Behind the Lens | 19 curated iPhone photographs over a moving "living architecture" background. |
| 07 | The Next Chapter | Sunrise. Done, learning and aiming for, kept separate. |
| 08 | The Connection | Real contact details, copy-email and CV download. |

---

## Quick start

**You need:** [Node.js](https://nodejs.org) **20.9 or newer** (the current LTS, 24, is recommended).

```bash
npm install
```

```bash
npm run dev
```

Then open http://localhost:3000.

| Command | What it does |
|---|---|
| `npm run dev` | Development server with instant reload |
| `npm run build` | Production build (what Vercel runs) |
| `npm run start` | Serve the production build locally (after `build`) |
| `npm run lint` | ESLint (Next.js rules + React hooks rules) |
| `npm run typecheck` | TypeScript check |
| `npm run check` | All three: typecheck, lint, build |

---

## Editing content — start here

All text, links, projects and photographs live in **`src/data/`**. You rarely need to touch a component.

| To change… | Edit |
|---|---|
| Name, SEO title/description, email, phone, LinkedIn, CV path, footer | `src/data/site.ts` |
| Opening chapter: roles, headline, intro, buttons | `src/data/site.ts` → `hero` |
| Chapter names and the one-line menu descriptions | `src/data/navigation.ts` |
| The five principles (02) | `src/data/vision.ts` |
| Experience, roles, education (03) | `src/data/experience.ts` |
| Skills and their evidence (04) | `src/data/skills.ts` |
| Projects (05) | `src/data/projects.ts` |
| Photographs and collections (06) | `src/data/photography.ts` |
| Done / learning / aiming for (07) | `src/data/journey.ts` |
| Colours, fonts | `src/styles/base.css` (`:root`) and `src/app/globals.css` (`@theme`) |

Every data file is typed (`src/types/index.ts`), so VS Code shows each field and underlines a typo or a missing value.

**Titles with an italic ending:** chapter titles are split into `title` and `titleEmphasis`. The emphasis part is set in copper italics, for example `title: "Most problems arrive in fog. "` and `titleEmphasis: "The work is making them clear."`.

### Replace or add a photograph
1. Put the JPG in `public/photography/`. About 1920 px on the long side is plenty: Next.js creates the smaller sizes automatically.
2. In `src/data/photography.ts`, edit or add an entry with the real pixel `width` and `height`, a `title`, an `alt` description and a `collection`.
3. Set its `layout` on the desktop wall. Each collection is **one row** on 12 columns:
   - `start`: the first column.
   - `span`: how many columns it covers. Use **3** for the featured photo and **2** for the others.
   - `drop`: how far it hangs below the top of the row, in rem.

   Spans in one collection should add up to 12 or less. An unused column leaves some air. Phones and portrait tablets automatically show each collection as a swipeable filmstrip instead.

### Add a project
1. Put the prototype's HTML file in `public/projects/<id>.html`. It's served at `/projects/<id>`.
2. Add screenshots: `public/images/projects/<id>.jpg` (desktop, 790×494) and `<id>-m.jpg` (phone, 390×844).
3. Add an entry to `src/data/projects.ts`. Its position in the list is its position in the exhibition. Every room, the index, the viewer and the "01–16" counters update automatically. Rooms alternate between three compositions by position.
4. Add its id to the matching filters in `projectFilters` (same file) — they drive the category chips in the project index.
5. When a project is hosted publicly, add `liveUrl: "https://…"`. The "Open on its own" links then become "Visit the live site". The viewer keeps showing the local copy, because many live sites refuse to be framed by another page.

**Multi-file apps** (ATELIER 01, Salon Noir) are production builds in their own folder, `public/projects/<id>/`, built from their source projects with a matching base path. `next.config.ts` maps `/projects/<id>` (and, for ATELIER 01, every page below it) to that folder's `index.html`. After changing either source project, rebuild it into the portfolio:

```bash
cd D:\Download\ATELIER-01
npx vite build --base=/projects/atelier-01/ --outDir ../Moaz-Portfolio-Experience/public/projects/atelier-01 --emptyOutDir
```

```bash
cd D:\Download\Automotive-Showroom-Experience
npx vite build --base=/projects/automotive-showroom/ --outDir ../Moaz-Portfolio-Experience/public/projects/automotive-showroom --emptyOutDir
```

(In Git Bash, prefix each command with `MSYS_NO_PATHCONV=1` so `--base` is not turned into a Windows path.)

### Link a skill to a project
In `src/data/skills.ts`, add project ids to a skill's `projects: [...]`. Each one becomes a "See it in …" button that opens that project in the viewer.

### Replace the CV
Overwrite `public/cv/Moaz_Ahmed_CV.pdf`, or change `cvPath` in `src/data/site.ts`.

### Share image, favicon
- `src/app/opengraph-image.jpg` and `twitter-image.jpg` (1200×630) are the link-preview images, real captures of the opening chapter. Replace them with any 1200×630 JPG.
- `src/app/icon.svg`, `favicon.ico` and `apple-icon.png` are the "M" mark.

---

## Project structure

```
Moaz-Portfolio-Experience/
├── public/
│   ├── photography/            19 curated photographs (Next.js serves optimised sizes)
│   ├── images/projects/        exhibition screenshots (desktop + phone) per project
│   ├── projects/               the 16 working projects shown in the live viewer
│   │                           (11 single HTML files + atelier-01/ and automotive-showroom/ builds)
│   └── cv/Moaz_Ahmed_CV.pdf
├── src/
│   ├── app/
│   │   ├── layout.tsx          fonts, SEO metadata, viewport, pre-paint "js" flag
│   │   ├── page.tsx            assembles the eight chapters
│   │   ├── globals.css         Tailwind + theme tokens + imports from src/styles
│   │   ├── favicon.ico · icon.svg · apple-icon.png
│   │   ├── opengraph-image.jpg · twitter-image.jpg (+ .alt.txt)
│   │   └── robots.ts · sitemap.ts
│   ├── components/
│   │   ├── layout/             Navbar, ChapterNavigation (side rail), ChapterMenu, JourneyProgress, Footer
│   │   ├── chapters/           HeroSection, VisionSection, ChallengesSection, ExpertiseSection,
│   │   │                       ProjectsSection, BehindTheLensSection, NextChapterSection, ContactSection
│   │   ├── expertise/          ExpertiseExplorer (tabs → skills → evidence)
│   │   ├── projects/           ProjectGallery (exhibition), ProjectIndex, ProjectViewer,
│   │   │                       ProjectPreview (live iframe), ProjectDetails, ProjectNavigation,
│   │   │                       ProjectViewerContext
│   │   ├── photography/        PhotographyGallery, PhotographyItem, PhotographyLightbox,
│   │   │                       LivingArchitecture (+ living-architecture-engine.ts, the canvas)
│   │   ├── animations/         ScrollEngine, RevealObserver, HeroEntrance, MagneticButtons
│   │   ├── ui/                 Dialog, Icon, Toast, ChapterLabel
│   │   └── seo/JsonLd.tsx      schema.org "Person"
│   ├── data/                   ← all editable content (see above)
│   ├── hooks/                  useActiveChapter, useMediaQuery, useInView
│   ├── lib/                    scroll-engine, chapter-store, utils
│   ├── styles/                 base.css, navigation.css, chapters/*.css (one file per chapter)
│   └── types/index.ts          content types
├── next.config.ts              images, clean prototype URLs, security headers
├── eslint.config.mjs · tsconfig.json · package.json
├── .env.example                optional environment variables (documented)
└── AGENTS.md                   added by Next.js for AI coding assistants. Safe to keep.
```

---

## How it is built

**Server first.** Every chapter is a React Server Component and renders to static HTML. Only the parts that react to the visitor are client components, marked `"use client"`:
- the navigation;
- the expertise tabs;
- the exhibition, the project viewer and the index;
- the gallery, the lightbox and the canvas;
- copy-email.

The whole page is prerendered at build time (`○ Static`).

**Scroll-linked motion without re-renders.** `lib/scroll-engine.ts` runs at most one `requestAnimationFrame` per scroll or resize. Effects subscribe to it and write CSS custom properties straight to the DOM, so the cinematic motion never re-renders React:
- `--p`: progress through a chapter;
- `--jp`: progress through the whole journey;
- `--draw`: how far the arches in chapter 03 are drawn;
- `--exit`: the sunlight at the end of chapter 06.

Every subscription, listener, observer and animation loop is removed in its effect's cleanup.

**Styling.** Tailwind CSS v4 provides the reset, the utilities and the design tokens (`bg-ivory`, `text-copper`, `font-serif`, `ease-luxe` …).
- The cinematic chapter styles (CSS-drawn room, clip-path reveals, fog, keyframes, scroll-driven variables) are carried over unchanged from the approved design.
- They're organised as one plain CSS file per chapter in `src/styles/chapters/`. They read better as CSS than as long utility strings, and keeping them as-is guarantees the look is identical.
- Those files sit outside Tailwind's layers, so they take priority.

**Animation.**
- **CSS and the scroll engine:** the scroll-linked effects and each chapter's own reveal motion (drift, clear, draw, rise, frame, dawn, settle).
- **Motion (`motion/react`):** component transitions, such as switching projects in the viewer and photographs in the lightbox.
- **Reduced motion:** for visitors who ask for it, the zoom, parallax, canvas loop and reveals switch off.

**Images.** `next/image` serves AVIF/WebP at the right size for each screen and lazy-loads everything below the fold. Allowed qualities are 75 (gallery, screenshots) and 85 (lightbox).

**Fonts.** Cormorant Garamond and Hanken Grotesk via `next/font`. They're downloaded at build time and served from the site itself (no Google requests from visitors), so a `public/fonts` folder isn't needed.

**Live previews.**
- The prototypes are static HTML in `public/projects`, plus two built apps in their own folders there. `next.config.ts` gives them all clean URLs (`/projects/pawland`, `/projects/atelier-01`).
- The viewer loads one at a time in a same-origin `<iframe>` with a loading state.
- It offers desktop, tablet and phone widths, reload, open in a new tab, and full screen (in-window, plus native full screen where the browser allows).
- The iframe is removed when the viewer closes.
- Direct links work: `/#project/pawland`.

**SEO.**
- Title, description and canonical URL.
- Open Graph and Twitter cards with a 1200×630 image.
- `robots.txt`, `sitemap.xml`, JSON-LD (Person) and a favicon set.

**Security headers.** `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options: SAMEORIGIN` and a `Permissions-Policy` that allows the camera only for the site itself (two prototypes scan QR codes and barcodes). The site has no API keys or secrets.

---

## Deploy: GitHub + Vercel

### 1. Put the project on GitHub
Install [Git](https://git-scm.com/download/win) (or use [GitHub Desktop](https://desktop.github.com)), create an empty repository on github.com, then run these in the project folder:

```bash
git init
```

```bash
git add .
```

```bash
git commit -m "Moaz Ahmed portfolio"
```

```bash
git branch -M main
```

```bash
git remote add origin https://github.com/<your-username>/<your-repo>.git
```

```bash
git push -u origin main
```

`.gitignore` already excludes `node_modules`, `.next`, environment files and ZIPs.

### 2. Deploy on Vercel
1. Sign in at [vercel.com](https://vercel.com) with GitHub, then choose **Add New → Project** and import the repository.
2. Vercel detects Next.js automatically. Keep the defaults: build `next build`, Node 20+. No environment variables are required.
3. Click **Deploy**. Every later `git push` redeploys automatically.
4. Optional: add your own domain under **Settings → Domains**.

The canonical and Open Graph URLs use your Vercel production domain automatically. To force a different address, set `NEXT_PUBLIC_SITE_URL` (see `.env.example`).

### Environment variables
| Name | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | No | Public address used for canonical, Open Graph and sitemap URLs. Falls back to Vercel's production domain, then `http://localhost:3000`. |

---

## Quality checks (last run)

- `npm run typecheck`: passed, no errors.
- `npm run lint`: passed, no warnings.
- `npm run build`: passed, all routes prerendered as static.
- Tested in the browser at desktop (1440×900), tablet (768×1024) and phone (390×844):
  - **Chapters and navigation:** all eight chapters; navigation, side rail, journey bar and Chapters menu; direct links (`/#lens`, `/#project/pawland`).
  - **Expertise:** tabs, and the phone accordion.
  - **Projects:** the pinned exhibition and its controls; the project index; the live viewer (all 8 prototype URLs, switching, device widths, full screen, jump list, Esc, back to the room).
  - **Behind the Lens:** filters, the lightbox (keys and wrap-around), and phone filmstrips.
  - **Contact:** copy-email and CV download.
- No console errors or hydration warnings.
- `npm audit --omit=dev`: **0 vulnerabilities** in what visitors receive. `npm audit` lists moderate advisories only in developer tooling (`minimatch` under ESLint 9, used by Next.js's official lint config). They don't affect the deployed site.

---

## Photography

19 photographs, chosen from 29 originals for sharpness, clean compression and variety. Near-duplicates and soft or heavily compressed shots were left out.

Each kept photo was rebuilt from its original with gentle, whole-image corrections:
- black point and highlights adjusted;
- brightening capped at 6–15%;
- light sharpening where the source allowed;
- colour converted from Display P3 to sRGB.

Re-encoding removed all metadata, including GPS. Titles describe only what is visible; no places or dates are claimed.

---

## Content honesty

- Experience, dates and figures come from the CV. No testimonials, metrics or certifications were added.
- DevOps, Linux, Docker and Jenkins appear **only** under "Currently learning".
- None of the 16 projects has its own public address yet, so the viewer runs the copies in this project and says so.
- Demo limits are stated per project: demo checkouts and forms, ATELIER 01's enquiry form (saved in the browser only, no email), and Salon Noir's 3D model licences.
- No GitHub link is shown on the site because none was provided. Add one to `contacts` in `src/data/site.ts`.
