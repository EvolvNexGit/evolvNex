/**
 * Single source of truth for company facts, navigation and routes.
 * Facts here come from the EvolvNex Company & SEO Content Brief.
 * Anything not in the brief is deliberately absent (no office address,
 * no prices, no client counts, no metrics).
 */

export const SITE = {
  name: 'EvolvNex',
  url: 'https://www.evolvnex.com',
  email: 'team@evolvnex.com',
  // Display format to confirm with the business (see "Facts to confirm").
  phoneDisplay: '+91 99600 83547',
  phoneTel: '+919960083547',
  whatsappNumber: '919960083547',
  linkedin: 'https://www.linkedin.com/company/evolvnex/',
  tagline: 'Digital systems that help businesses move forward.',
  shortDescription:
    'EvolvNex is a business technology and digital systems company offering website development, branding, custom CRM solutions and automation for businesses.',
} as const

export function whatsappUrl(message = "Hi EvolvNex, I'd like to talk about a project.") {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`
}

export const NAV_LINKS = [
  { name: 'Services', href: '/services' },
  { name: 'CRM', href: '/crm' },
  { name: 'Websites', href: '/work/websites' },
  { name: 'Branding', href: '/branding' },
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
] as const

export const FOOTER_LINKS = {
  Services: [
    { name: 'Website development', href: '/services/website-development' },
    { name: 'Branding', href: '/branding' },
    { name: 'CRM & business systems', href: '/crm' },
    { name: 'All services', href: '/services' },
  ],
  Industries: [
    { name: 'Food & Beverage CRM', href: '/crm/food' },
    { name: 'Healthcare CRM', href: '/crm/healthcare' },
    { name: 'Website showcase', href: '/work/websites' },
  ],
  Company: [
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy', href: '/privacy' },
  ],
} as const

/** Indexable routes for sitemap. lastmod only changes with meaningful content updates. */
export const STATIC_ROUTES: { path: string; lastmod: string; priority: number }[] = [
  { path: '/', lastmod: '2026-11-12', priority: 1 },
  { path: '/services', lastmod: '2026-11-12', priority: 0.9 },
  { path: '/services/website-development', lastmod: '2026-11-12', priority: 0.8 },
  { path: '/branding', lastmod: '2026-11-12', priority: 0.8 },
  { path: '/crm', lastmod: '2026-11-12', priority: 0.9 },
  { path: '/crm/food', lastmod: '2026-11-12', priority: 0.8 },
  { path: '/crm/healthcare', lastmod: '2026-11-12', priority: 0.8 },
  { path: '/work/websites', lastmod: '2026-11-12', priority: 0.8 },
  { path: '/blog', lastmod: '2026-11-12', priority: 0.7 },
  { path: '/about', lastmod: '2026-11-12', priority: 0.6 },
  { path: '/contact', lastmod: '2026-11-12', priority: 0.7 },
  { path: '/privacy', lastmod: '2026-11-12', priority: 0.2 },
]
