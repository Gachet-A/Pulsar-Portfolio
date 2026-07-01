import { siteConfig } from "@/lib/site"

/**
 * JSON-LD structured data. Helps Google (rich results / knowledge panel) and
 * AI answer engines (ChatGPT, Perplexity, Google AI Overviews) understand who
 * Pulsar is, where it operates and what it offers.
 */
export default function StructuredData() {
  const orgId = `${siteConfig.url}/#organization`
  const siteId = `${siteConfig.url}/#website`

  const graph = [
    {
      "@type": ["ProfessionalService", "Organization"],
      "@id": orgId,
      name: siteConfig.name,
      legalName: siteConfig.legalName,
      url: siteConfig.url,
      description: siteConfig.description,
      foundingDate: siteConfig.founded,
      email: siteConfig.contact.email,
      telephone: siteConfig.contact.phoneE164,
      image: `${siteConfig.url}/opengraph-image`,
      logo: `${siteConfig.url}/Pulsar_Full_logo.svg`,
      slogan: siteConfig.tagline,
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        addressLocality: siteConfig.address.locality,
        postalCode: siteConfig.address.postalCode,
        addressRegion: siteConfig.address.region,
        addressCountry: siteConfig.address.country,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: siteConfig.geo.latitude,
        longitude: siteConfig.geo.longitude,
      },
      areaServed: [
        { "@type": "City", name: "Genève" },
        { "@type": "AdministrativeArea", name: "Suisse romande" },
        { "@type": "Country", name: "Suisse" },
      ],
      knowsLanguage: ["fr-CH", "fr"],
      sameAs: [siteConfig.social.linkedin],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: siteConfig.contact.phoneE164,
        email: siteConfig.contact.email,
        areaServed: "CH",
        availableLanguage: ["French"],
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Services informatiques",
        itemListElement: siteConfig.services.map((service) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: service },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": siteId,
      url: siteConfig.url,
      name: siteConfig.name,
      description: siteConfig.description,
      inLanguage: "fr-CH",
      publisher: { "@id": orgId },
    },
  ]

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": graph,
  }

  return (
    <script
      type="application/ld+json"
      // Content is static and built from our own config — safe to inline.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
