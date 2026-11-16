import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { JsonLd } from './json-ld'
import { absoluteUrl } from '@/lib/seo'

export type Crumb = { name: string; href: string }

/** Visible breadcrumb trail + matching BreadcrumbList structured data. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const trail: Crumb[] = [{ name: 'Home', href: '/' }, ...items]
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.href),
    })),
  }
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        {trail.map((c, i) => {
          const last = i === trail.length - 1
          return (
            <li key={c.href} className="inline-flex items-center gap-1.5">
              {last ? (
                <span aria-current="page" className="text-foreground">
                  {c.name}
                </span>
              ) : (
                <Link href={c.href} className="hover:text-foreground">
                  {c.name}
                </Link>
              )}
              {!last && <ChevronRight className="size-3.5 text-subtle" aria-hidden />}
            </li>
          )
        })}
      </ol>
      <JsonLd data={jsonLd} />
    </nav>
  )
}
