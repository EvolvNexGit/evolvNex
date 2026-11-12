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
    <article className="group/panel relative flex h-full flex-col overflow-hidden border border-border bg-card p-6 transition-[transform,border-color] duration-300 hover:-translate-y-1.5 hover:border-primary sm:p-8">
      <span
        aria-hidden
        className="absolute top-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-primary transition-transform duration-500 group-hover/panel:scale-x-100"
      />
      <span className="inline-flex size-12 items-center justify-center border border-border text-accent-text transition-colors duration-300 group-hover/panel:border-primary group-hover/panel:bg-primary group-hover/panel:text-white">
        <Icon className="size-5" strokeWidth={1.5} aria-hidden />
      </span>
      <h3 className="mt-5 text-xl font-bold tracking-wide uppercase">{title}</h3>
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
