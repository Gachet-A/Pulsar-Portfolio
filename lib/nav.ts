/** Shared navigation config used by the global header and footer. */

export const logoMask = {
  WebkitMaskImage: "url(/Pulsar_Full_logo.svg)",
  maskImage: "url(/Pulsar_Full_logo.svg)",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskSize: "contain",
  maskSize: "contain",
  WebkitMaskPosition: "left center",
  maskPosition: "left center",
} as const

export interface NavItem {
  id: string
  fr: string
  /** Absolute route (e.g. "/blog"). Section links fall back to "/#id". */
  href?: string
}

export const navItems: NavItem[] = [
  { id: "home", fr: "Accueil", href: "/" },
  { id: "about", fr: "À Propos" },
  { id: "services", fr: "Services" },
  { id: "approche", fr: "Approche" },
  { id: "pourquoi", fr: "Pourquoi" },
  { id: "blog", fr: "Blog" },
  { id: "contact", fr: "Contact" },
]

/** Resolve a nav item to an href that works from any page. */
export function navHref(item: NavItem): string {
  return item.href ?? `/#${item.id}`
}
