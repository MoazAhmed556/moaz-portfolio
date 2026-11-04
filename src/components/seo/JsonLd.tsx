import { site } from "@/data/site";

/** Structured data for search engines (schema.org Person). */
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    jobTitle: site.jobTitle,
    worksFor: { "@type": "Organization", name: site.organization },
    address: { "@type": "PostalAddress", addressLocality: site.city, addressCountry: site.countryCode },
    sameAs: [site.linkedin],
  };
  return (
    <script
      type="application/ld+json"
      // escape "<" so the JSON can never close the script tag
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
