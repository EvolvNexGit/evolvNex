import type { MetadataRoute } from 'next'
import { SITE, STATIC_ROUTES } from '@/lib/site'
import { POSTS, CATEGORIES } from '@/lib/blog'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = STATIC_ROUTES.map((r) => ({
    url: `${SITE.url}${r.path === '/' ? '' : r.path}`,
    lastModified: r.lastmod,
    priority: r.priority,
  }))
  const posts = POSTS.map((p) => ({
    url: `${SITE.url}/blog/${p.slug}`,
    lastModified: p.updated ?? p.published,
    priority: 0.6,
  }))
  const categories = CATEGORIES.map((c) => ({
    url: `${SITE.url}/blog/category/${c.slug}`,
    lastModified: '2026-11-12',
    priority: 0.4,
  }))
  return [...staticEntries, ...posts, ...categories]
}
