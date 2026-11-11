import Link from 'next/link'
import { ArrowRight, Check, type LucideIcon } from 'lucide-react'

export function IndustryPanel({
  icon: Icon,
  title,
  description,
  points,
  href,
  cta,
}: {
  icon: LucideIcon
  title: string
  description: string
  points: string[]
  href: string
  cta: string
}) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-border bg-card p-6 sm:p-8">
      <Icon className="size-7 text-accent-text" strokeWidth={1.5} aria-hidden />
      <h3 className="mt-5 text-2xl font-semibold tracking-tight">{title}</h3>
      <p className="mt-3 text-muted-foreground">{description}</p>
      <ul className="mt-5 flex-1 space-y-2.5">
        {points.map((p) => (
          <li key={p} className="flex gap-3 text-sm text-foreground/90">
            <Check className="mt-0.5 size-4 shrink-0 text-accent-text" aria-hidden />
            {p}
          </li>
        ))}
      </ul>
      <Link
        href={href}
        className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-accent-text"
      >
        {cta}
        <ArrowRight
          className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
          aria-hidden
        />
      </Link>
    </article>
  )
}
