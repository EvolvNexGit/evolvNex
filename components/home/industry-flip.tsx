'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'

export type IndustryItem = {
  title: string
  description: string
  points: string[]
  href: string
  cta: string
  image: string
  imageAlt: string
}

/** Black-tone image card, red border on hover, flips to reveal content. Tap toggles on touch. */
function FlipCard({ item, index }: { item: IndustryItem; index: number }) {
  const [flipped, setFlipped] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="flip-scene aspect-[4/5] sm:aspect-[5/6]"
      data-flipped={flipped}
      onClick={(e) => {
        // let real link clicks through; otherwise toggle (touch devices)
        if ((e.target as HTMLElement).closest('a')) return
        setFlipped((f) => !f)
      }}
    >
      <div className="flip-card relative size-full">
        {/* front */}
        <div className="flip-face group absolute inset-0 overflow-hidden rounded-lg border border-border bg-card transition-colors duration-500 hover:border-primary">
          <Image
            src={item.image}
            alt={item.imageAlt}
            fill
            sizes="(min-width: 768px) 560px, 100vw"
            className="object-cover grayscale brightness-[0.5] contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-7">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em]">{item.title}</h3>
            <span className="text-[11px] uppercase tracking-[0.2em] text-white/60">Hover / tap</span>
          </div>
        </div>

        {/* back */}
        <div className="flip-face flip-back absolute inset-0 flex flex-col justify-between overflow-hidden rounded-lg border border-primary bg-gradient-to-br from-[#1a0909] via-[#0f0f0f] to-background p-7 sm:p-9">
          <div>
            <span className="block h-px w-12 bg-primary" aria-hidden />
            <h3 className="mt-6 text-3xl font-semibold tracking-tight">{item.title}</h3>
            <p className="mt-3 text-muted-foreground">{item.description}</p>
            <ul className="mt-6 space-y-3">
              {item.points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <Link
            href={item.href}
            className="group/link inline-flex items-center gap-2 text-sm font-semibold text-accent-text transition-colors hover:text-foreground"
          >
            {item.cta}
            <ArrowRight
              className="size-4 transition-transform duration-200 group-hover/link:translate-x-1"
              aria-hidden
            />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export function IndustryFlip({ items }: { items: IndustryItem[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {items.map((it, i) => (
        <FlipCard key={it.title} item={it} index={i} />
      ))}
    </div>
  )
}
