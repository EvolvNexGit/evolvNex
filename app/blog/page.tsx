import Link from 'next/link'
import { buildMetadata } from '@/lib/seo'
import { POSTS, CATEGORIES } from '@/lib/blog'
import { Container, Section } from '@/components/site/container'
import { PageHero } from '@/components/site/page-hero'
import { BlogCard } from '@/components/site/blog-card'

export const metadata = buildMetadata({
  title: 'Blog: Websites, CRM and Business Automation Guides',
  description:
    'Practical articles from EvolvNex on business websites, café and restaurant systems, clinic workflows and WhatsApp automation.',
  path: '/blog',
})

export default function BlogIndexPage() {
  const posts = [...POSTS].sort((a, b) => b.published.localeCompare(a.published))
  return (
    <>
      <PageHero
        crumbs={[{ name: 'Blog', href: '/blog' }]}
        eyebrow="Blog"
        title="Practical guides for growing businesses"
        lead="Short, useful articles answering real questions about websites, business systems and automation."
      />
      <Section>
        <Container>
          <nav aria-label="Blog categories" className="mb-10 flex flex-wrap gap-2">
            <span className="rounded-md bg-secondary px-3 py-1.5 text-sm font-medium" aria-current="page">
              All
            </span>
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                href={`/blog/category/${c.slug}`}
                className="rounded-md border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {c.name}
              </Link>
            ))}
          </nav>
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <li key={p.slug}>
                <BlogCard post={p} />
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  )
}
