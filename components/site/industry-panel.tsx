import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Check, type LucideIcon } from 'lucide-react'

/**
 * Industry card. Hover: card lifts with a red glow, a black-and-white photo fades in
 * behind the copy and slowly zooms, a red line draws across the top, the icon tile
 * fills red, the checklist slides in one by one and the arrow travels.
 */
export function IndustryPanel({
  icon: Icon,
  title,
  description,
  points,
  href,
  cta,
  image,
}: {
  icon: LucideIcon
  title: string
  description: string
  points: string[]
  href: string
  cta: string
  image?: string
}) {
  return (
    <article className="group/panel relative flex h-full flex-col overflow-hidden border border-border bg-card p-6 transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:border-primary hover:shadow-[0_28px_60px_-28px_rgba(220,38,38,0.5)] sm:p-8">
      {image && (
        <>
          <Image
            src={image}
            alt=""
            fill
            sizes="(min-width: 768px) 560px, 100vw"
            className="object-cover opacity-0 grayscale transition-[opacity,transform] duration-[900ms] ease-out group-hover/panel:scale-110 group-hover/panel:opacity-[0.22]"
          />
          <span
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-card via-card/70 to-card/40 opacity-0 transition-opacity duration-500 group-hover/panel:opacity-100"
          />
        </>
      )}
      <span
        aria-hidden
        className="absolute top-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-primary transition-transform duration-700 ease-out group-hover/panel:scale-x-100"
      />
      <div className="relative flex h-full flex-col">
        <span className="inline-flex size-12 items-center justify-center border border-border text-accent-text transition-colors duration-300 group-hover/panel:border-primary group-hover/panel:bg-primary group-hover/panel:text-white">
          <Icon className="size-5" strokeWidth={1.5} aria-hidden />
        </span>
        <h3 className="mt-5 text-xl font-bold tracking-wide uppercase">{title}</h3>
        <p className="mt-3 text-muted-foreground">{description}</p>
        <ul className="mt-5 flex-1 space-y-2.5">
          {points.map((p, i) => (
            <li
              key={p}
              style={{ transitionDelay: `${i * 60}ms` }}
              className="flex gap-3 text-sm text-foreground/90 transition-transform duration-500 ease-out group-hover/panel:translate-x-1.5"
            >
              <Check className="mt-0.5 size-4 shrink-0 text-accent-text" aria-hidden />
              {p}
            </li>
          ))}
        </ul>
        <Link
          href={href}
          className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-foreground after:absolute after:inset-0 hover:text-accent-text"
        >
          {cta}
          <ArrowRight
            className="size-4 transition-transform duration-300 group-hover:translate-x-1.5 group-hover/panel:translate-x-1"
            aria-hidden
          />
        </Link>
      </div>
    </article>
  )
}
