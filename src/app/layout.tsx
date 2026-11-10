import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Hanken_Grotesk } from "next/font/google";
import { site } from "@/data/site";
import "./globals.css";

/* Fonts are downloaded at build time and served from this site (no request to Google from visitors). */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});
const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-hanken",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.linkedin }],
  creator: site.name,
  keywords: ["Moaz Ahmed", "portfolio", "e-commerce operations", "UI/UX design", "front-end", "Next.js", "Cairo", "photography"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: site.title,
    description: site.shortDescription,
    locale: site.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.shortDescription,
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#f3f0e9",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${cormorant.variable} ${hanken.variable}`} suppressHydrationWarning>
      <head>
        {/* Before first paint: mark that JavaScript runs, so reveal animations start hidden instead of flashing.
            Then start the hero entrance as soon as the hero markup and the fonts are ready ("ready" on <html>),
            without waiting for React to load; <HeroEntrance/> remains as a fallback. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var d=document.documentElement,done=0;d.classList.add("js");function go(){if(done)return;done=1;requestAnimationFrame(function(){requestAnimationFrame(function(){d.classList.add("ready")})})}function start(){setTimeout(go,500);if(document.fonts&&document.fonts.ready)document.fonts.ready.then(go,go)}(function wait(){if(document.querySelector(".begin-ctas"))start();else if(document.readyState==="loading")requestAnimationFrame(wait);else start()})()})();`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
