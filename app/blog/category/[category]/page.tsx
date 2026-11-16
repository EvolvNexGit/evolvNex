import Link from 'next/link'
import { notFound } from 'next/navigation'
import { buildMetadata } from '@/lib/seo'
import { POSTS, CATEGORIES, getCategory } from '@/lib/blog'
import { Container, Section } from '@/components/site/container'
import { PageHero } from '@/components/site/page-hero'
import { BlogCard } from '@/components/site/blog-card'

export const dynamicParams = false

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  const c = getCategory(category)
  if (!c) return {}
  return buildMetadata({
    title: `${c.name} Articles`,
    description: `${c.description} Articles from EvolvNex.`,
    path: `/blog/category/${c.slug}`,
  })
}

export default async function BlogCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  const c = getCategory(category)
  if (!c) notFound()
  const posts = POSTS.filter((p) => p.category === c.slug)

  return (
    <>
      <PageHero
        crumbs={[
          { name: 'Blog', href: '/blog' },
          { name: c.name, href: `/blog/category/${c.slug}` },
        ]}
        eyebrow="Blog category"
        title={c.name}
        lead={c.description}
      />
      <Section>
        <Container>
          <nav aria-label="Blog categories" className="mb-10 flex flex-wrap gap-2">
            <Link
              href="/blog"
              className="rounded-md border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              All
            </Link>
            {CATEGORIES.map((x) => (
              <Link
                key={x.slug}
                href={`/blog/category/${x.slug}`}
                aria-current={x.slug === c.slug ? 'page' : undefined}
                className={
                  x.slug === c.slug
                    ? 'rounded-md bg-secondary px-3 py-1.5 text-sm font-medium'
                    : 'rounded-md border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground'
                }
              >
                {x.name}
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
