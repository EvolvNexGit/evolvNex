import Link from 'next/link'
import { ArrowUpRight, type LucideIcon } from 'lucide-react'

export function ServiceCard({
  icon: Icon,
  title,
  description,
  href,
}: {
  icon: LucideIcon
  title: string
  description: string
  href: string
}) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col rounded-lg border border-border bg-card p-6 transition-colors duration-200 hover:border-[#3a3a3a] hover:bg-[#141414] sm:p-7"
    >
      <Icon className="size-7 text-accent-text" strokeWidth={1.5} aria-hidden />
      <h3 className="mt-6 text-xl font-semibold tracking-tight">{title}</h3>
      <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">{description}</p>
      <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-foreground">
        Learn more
        <ArrowUpRight
          className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden
        />
      </span>
    </Link>
  )
}
