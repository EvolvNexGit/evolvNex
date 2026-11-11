import { notFound } from 'next/navigation'
import { buildMetadata, absoluteUrl } from '@/lib/seo'
import { SITE } from '@/lib/site'
import { POSTS, getPost, getCategory, formatDate } from '@/lib/blog'
import { Container, Section } from '@/components/site/container'
import { Breadcrumbs } from '@/components/site/breadcrumbs'
import { JsonLd } from '@/components/site/json-ld'
import { ButtonLink } from '@/components/site/button-link'
import { CTA } from '@/components/site/cta'

export const dynamicParams = false

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    type: 'article',
    publishedTime: post.published,
  })
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()
  const category = getCategory(post.category)

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.published,
    dateModified: post.updated ?? post.published,
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    author: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    publisher: { '@id': `${SITE.url}/#organization` },
  }

  return (
    <>
      <article>
        <header className="border-b border-border pt-10 pb-12 md:pt-16">
          <Container className="max-w-3xl">
            <Breadcrumbs
              items={[
                { name: 'Blog', href: '/blog' },
                { name: post.title, href: `/blog/${post.slug}` },
              ]}
            />
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-accent-text">
              {category?.name}
            </p>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">{post.title}</h1>
            <p className="mt-5 text-sm text-muted-foreground">
              By {SITE.name} ·{' '}
              <time dateTime={post.published}>{formatDate(post.published)}</time> ·{' '}
              {post.readMinutes} min read
            </p>
          </Container>
        </header>

        <Section className="py-12 md:py-16">
          <Container className="max-w-3xl">
            <div className="space-y-5 text-lg leading-[1.75] text-foreground/90">
              {post.body.map((b, i) => {
                if (b.type === 'h2')
                  return (
                    <h2 key={i} className="!mt-10 text-2xl font-semibold tracking-tight text-foreground">
                      {b.text}
                    </h2>
                  )
                if (b.type === 'ul')
                  return (
                    <ul key={i} className="list-disc space-y-2 pl-6 marker:text-primary">
                      {b.items.map((it) => (
                        <li key={it}>{it}</li>
                      ))}
                    </ul>
                  )
                return <p key={i}>{b.text}</p>
              })}
            </div>

            <div className="mt-14 rounded-lg border border-border bg-card p-6">
              <p className="text-sm text-muted-foreground">Related service</p>
              <p className="mt-1 text-lg font-semibold">{post.service.label}</p>
              <ButtonLink href={post.service.href} variant="link" arrow className="mt-3">
                Learn more
              </ButtonLink>
            </div>
          </Container>
        </Section>
      </article>
      <JsonLd data={articleJsonLd} />
      <CTA />
    </>
  )
}
