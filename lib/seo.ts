import type { Metadata } from 'next'
import { SITE } from '@/lib/site'

type PageMeta = {
  title: string
  description: string
  path: string
  type?: 'website' | 'article'
  publishedTime?: string
  noindex?: boolean
}

/** Unique title/description + self-referencing canonical + social tags. */
export function buildMetadata({
  title,
  description,
  path,
  type = 'website',
  publishedTime,
  noindex,
}: PageMeta): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    robots: noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE.name,
      type,
      locale: 'en_IN',
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export function absoluteUrl(path: string) {
  return `${SITE.url}${path === '/' ? '' : path}`
}

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE.url}/#organization`,
  name: SITE.name,
  url: SITE.url,
  logo: `${SITE.url}/symbol.png`,
  email: SITE.email,
  telephone: SITE.phoneTel,
  description: SITE.shortDescription,
  sameAs: [SITE.linkedin],
}

export const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE.url}/#website`,
  name: SITE.name,
  url: SITE.url,
  publisher: { '@id': `${SITE.url}/#organization` },
}
