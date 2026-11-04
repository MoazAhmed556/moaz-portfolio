import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next.js 16 defaults from create-next-app.
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,

  // Tailwind CSS v4 runs through Turbopack's CSS pipeline (no postcss.config needed).
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },

  images: {
    // Only these folders in /public may be resized by the image optimizer.
    localPatterns: [{ pathname: "/photography/**" }, { pathname: "/images/**" }],
    // Next.js 16 requires an explicit list of allowed qualities.
    qualities: [75, 85],
    formats: ["image/avif", "image/webp"],
  },

  // Clean URLs for the live prototypes: /projects/pawland → /projects/pawland.html
  // Rewrites run after files in /public are checked, so the built apps' assets are served directly.
  async rewrites() {
    return [
      // single-file prototypes whose file names are not lowercase
      { source: "/projects/aureve-jewelry", destination: "/projects/Aureve-Jewelry.html" },
      { source: "/projects/furniture", destination: "/projects/Furniture.html" },
      // multi-page app built into its own folder: every page URL falls back to its index.html
      { source: "/projects/atelier-01", destination: "/projects/atelier-01/index.html" },
      { source: "/projects/atelier-01/:path*", destination: "/projects/atelier-01/index.html" },
      { source: "/projects/automotive-showroom", destination: "/projects/automotive-showroom/index.html" },
      { source: "/projects/:slug([a-z0-9-]+)", destination: "/projects/:slug.html" },
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // The prototypes are shown in same-origin iframes; camera is used by two of them for QR / barcode scanning.
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(self), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
