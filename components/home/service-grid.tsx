'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, Check } from 'lucide-react'

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
 * Intro card (red border) + black-tone image cards that lift, turn red-bordered
 * and reveal their copy on hover. On touch screens the copy is always visible.
 */
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
          <Link
            href={s.href}
            className={`group relative block overflow-hidden border border-border bg-card transition-[border-color,transform] duration-500 hover:-translate-y-1.5 hover:border-primary focus-visible:border-primary ${aspect}`}
          >
            <Image
              src={s.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
              className="object-cover brightness-[0.55] contrast-110 grayscale transition-[transform,filter] duration-700 group-hover:scale-110 group-hover:brightness-[0.3] [@media(hover:none)]:brightness-[0.3]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-6">
              <p className="eyebrow opacity-0 transition-opacity duration-500 group-hover:opacity-100 [@media(hover:none)]:opacity-100">
                {s.tagline}
              </p>
              <h3 className="mt-1 text-sm font-bold uppercase tracking-[0.18em] transition-transform duration-500 group-hover:-translate-y-1">
                {s.title}
              </h3>
              <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr] [@media(hover:none)]:grid-rows-[1fr]">
                <div className="overflow-hidden">
                  <p className="pt-3 text-sm leading-relaxed text-white/80">{s.description}</p>
                  {s.points && (
                    <ul className="mt-3 space-y-1.5">
                      {s.points.map((p) => (
                        <li key={p} className="flex items-start gap-2 text-[13px] text-white/75">
                          <Check className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden />
                          {p}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>

            <span className="absolute top-5 right-5 inline-flex size-10 -translate-x-2 translate-y-2 items-center justify-center rounded-full bg-primary text-white opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100">
              <ArrowUpRight className="size-5" aria-hidden />
            </span>
          </Link>
        </motion.li>
      ))}
    </ul>
  )
}
