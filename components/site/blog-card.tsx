import Link from 'next/link'
import { formatDate, getCategory, type Post } from '@/lib/blog'

export function BlogCard({ post }: { post: Post }) {
  const category = getCategory(post.category)
  return (
    <article className="group relative flex h-full flex-col rounded-lg border border-border bg-card p-6 transition-colors duration-200 hover:border-[#3a3a3a]">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent-text">
        {category?.name}
      </p>
      <h3 className="mt-3 text-xl font-semibold tracking-tight">
        <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
          {post.title}
        </Link>
      </h3>
      <p className="mt-3 flex-1 text-muted-foreground">{post.description}</p>
      <p className="mt-5 text-sm text-muted-foreground">
        <time dateTime={post.published}>{formatDate(post.published)}</time> · {post.readMinutes} min read
      </p>
    </article>
  )
}
