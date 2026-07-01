/**
 * Central site configuration — single source of truth for SEO, structured
 * data, sitemap, manifest and analytics. Change the production domain via the
 * NEXT_PUBLIC_SITE_URL env var (no trailing slash).
 */

export const siteConfig = {
  name: "Pulsar ICT",
  legalName: "Pulsar ICT",
  // Override in production: NEXT_PUBLIC_SITE_URL=https://www.pulsarvoip.ch
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://www.pulsarvoip.ch").replace(/\/$/, ""),
  locale: "fr_CH",
  lang: "fr",

  tagline: "Infogérance, cybersécurité & téléphonie d'entreprise à Genève",
  description:
    "Pulsar ICT accompagne les PME de Genève et de Suisse romande : infogérance, cybersécurité, téléphonie VoIP, infrastructure cloud et solutions d'IA. Un partenaire informatique de proximité depuis 2006.",

  founded: "2006",

  contact: {
    email: "info@pulsarvoip.ch",
    phone: "+41 (0) 22 510 20 19",
    phoneE164: "+41225102019",
  },

  address: {
    locality: "Genève",
    district: "Aïre",
    region: "Genève",
    postalCode: "1219",
    country: "CH",
  },

  // Approx. coordinates for Aïre (Genève) — refine if needed.
  geo: { latitude: 46.2107, longitude: 6.1039 },

  social: {
    linkedin: "https://www.linkedin.com/company/pulsar-ict",
  },

  // Core services (used for structured data + sitemap context).
  services: [
    "Infogérance et support informatique",
    "Cybersécurité",
    "Téléphonie d'entreprise (VoIP)",
    "Infrastructure et sauvegarde cloud",
    "Conseil IT et transformation digitale",
    "Développement logiciel",
    "Solutions d'intelligence artificielle",
  ],

  // Researched keywords for the Geneva / Suisse romande B2B IT market.
  keywords: [
    "infogérance Genève",
    "support informatique Genève",
    "maintenance informatique Genève",
    "entreprise informatique Genève",
    "société informatique Genève",
    "service informatique PME Genève",
    "cybersécurité Genève",
    "cybersécurité PME",
    "téléphonie d'entreprise Genève",
    "téléphonie VoIP",
    "standard téléphonique entreprise",
    "prestataire informatique Suisse romande",
    "sauvegarde et cloud Genève",
    "hébergement de données en Suisse",
    "audit de sécurité informatique",
    "helpdesk et support réactif",
    "solutions IA PME",
    "Pulsar ICT",
    "Pulsar VoIP",
  ],
} as const

export type SiteConfig = typeof siteConfig
