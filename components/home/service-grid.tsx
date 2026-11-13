'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export type ServiceItem = {
  /** optional anchor id, e.g. /services#seo */
  id?: string
  title: string
  tagline: string
  description: string
  /** optional bullet points, revealed with the description */
  points?: string[]
  href: string
  image: string
}

const reveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '0px 0px -10% 0px' },
} as const

/**
 * Image card: only the heading shows at rest. On hover the card lifts, the border
 * turns red, a red line draws across the top, the image zooms and pans, and the
 * tagline, description and points slide up. On touch screens the first tap reveals
 * the copy and the second tap opens the page.
 */
function ServiceCard({ s, aspect }: { s: ServiceItem; aspect: string }) {
  const [revealed, setRevealed] = useState(false)
  const pointer = useRef('mouse')

  return (
    <Link
      href={s.href}
      data-revealed={revealed}
      onPointerDown={(e) => (pointer.current = e.pointerType)}
      onClick={(e) => {
        if (pointer.current !== 'mouse' && !revealed) {
          e.preventDefault()
          setRevealed(true)
        }
      }}
      onBlur={() => setRevealed(false)}
      className={cn(
        'group relative block overflow-hidden border border-border bg-card',
        'transition-[border-color,transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
        'hover:-translate-y-2 hover:border-primary hover:shadow-[0_28px_60px_-28px_rgba(220,38,38,0.55)]',
        'focus-visible:border-primary data-[revealed=true]:border-primary',
        aspect,
      )}
    >
      <Image
        src={s.image}
        alt=""
        fill
        sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
        className="object-cover brightness-[0.55] contrast-110 grayscale transition-[transform,filter] duration-[900ms] ease-out group-hover:-translate-y-2 group-hover:scale-[1.12] group-hover:brightness-[0.3] group-data-[revealed=true]:scale-[1.12] group-data-[revealed=true]:brightness-[0.3]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent transition-opacity duration-500 group-hover:from-black/95" />

      {/* red line draws across the top */}
      <span
        aria-hidden
        className="absolute top-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-primary transition-transform duration-700 ease-out group-hover:scale-x-100 group-data-[revealed=true]:scale-x-100"
      />
      {/* soft red edge-light at the bottom */}
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-primary/25 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-data-[revealed=true]:opacity-100"
      />

      <div className="absolute inset-x-0 bottom-0 p-6">
        <p className="eyebrow translate-y-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-data-[revealed=true]:translate-y-0 group-data-[revealed=true]:opacity-100">
          {s.tagline}
        </p>
        <h3 className="mt-1 text-sm font-bold uppercase tracking-[0.18em] transition-transform duration-500 group-hover:-translate-y-0.5">
          {s.title}
        </h3>
        <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr] group-data-[revealed=true]:grid-rows-[1fr]">
          <div className="overflow-hidden">
            <p className="translate-y-2 pt-3 text-sm leading-relaxed text-white/80 opacity-0 transition-all delay-75 duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-data-[revealed=true]:translate-y-0 group-data-[revealed=true]:opacity-100">
              {s.description}
            </p>
            {s.points && (
              <ul className="mt-3 space-y-1.5">
                {s.points.map((p, i) => (
                  <li
                    key={p}
                    style={{ transitionDelay: `${150 + i * 70}ms` }}
                    className="flex translate-y-2 items-start gap-2 text-[13px] text-white/75 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-data-[revealed=true]:translate-y-0 group-data-[revealed=true]:opacity-100"
                  >
                    <Check className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden />
                    {p}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <span className="absolute top-5 right-5 inline-flex size-10 -translate-x-2 translate-y-2 scale-75 items-center justify-center rounded-full bg-primary text-white opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 group-data-[revealed=true]:translate-x-0 group-data-[revealed=true]:translate-y-0 group-data-[revealed=true]:scale-100 group-data-[revealed=true]:opacity-100">
        <ArrowUpRight className="size-5" aria-hidden />
      </span>
    </Link>
  )
}

/** Intro card (red border) + image cards. */
export function ServiceGrid({
  items,
  eyebrow = 'What we build',
  heading = 'We build digital presence with purpose',
  headingAs: Heading = 'h2',
}: {
  items: ServiceItem[]
  eyebrow?: string
  heading?: string
  headingAs?: 'h2' | 'h3'
}) {
  const detailed = items.some((i) => i.points?.length)
  const aspect = detailed ? 'min-h-[460px] sm:aspect-[4/5]' : 'aspect-[4/5]'

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <motion.li
        {...reveal}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex min-h-[220px] flex-col justify-between gap-10 overflow-hidden border border-primary/60 bg-card p-7 sm:aspect-[4/5]"
      >
        <span className="h-px w-12 bg-primary" aria-hidden />
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <Heading className="font-display mt-4 text-2xl leading-tight uppercase sm:text-3xl">
            {heading}
          </Heading>
        </div>
      </motion.li>

      {items.map((s, i) => (
        <motion.li
          key={s.title}
          id={s.id}
          {...reveal}
          transition={{ duration: 0.7, delay: ((i + 1) % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <ServiceCard s={s} aspect={aspect} />
        </motion.li>
      ))}
    </ul>
  )
}
