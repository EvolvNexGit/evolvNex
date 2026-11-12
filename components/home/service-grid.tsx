'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

export type ServiceItem = {
  title: string
  tagline: string
  description: string
  href: string
  image: string
}

/** Social-moodboard style grid: intro card (red) + grayscale image cards that lift and reveal copy on hover. */
export function ServiceGrid({ items }: { items: ServiceItem[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {/* intro card */}
      <motion.li
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-lg border border-primary/60 bg-card p-7"
      >
        <span className="h-px w-12 bg-primary" aria-hidden />
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-accent-text">
            What we build
          </p>
          <h2 className="mt-4 text-2xl font-black tracking-tight uppercase sm:text-3xl">
            We build digital presence with purpose
          </h2>
        </div>
      </motion.li>

      {items.map((s, i) => (
        <motion.li
          key={s.title}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ duration: 0.7, delay: ((i + 1) % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            href={s.href}
            className="group relative block aspect-[4/5] overflow-hidden rounded-lg border border-border bg-card transition-[border-color,transform] duration-500 hover:-translate-y-1.5 hover:border-primary"
          >
            <Image
              src={s.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
              className="object-cover grayscale brightness-[0.55] contrast-110 transition-[transform,filter] duration-700 group-hover:scale-110 group-hover:brightness-[0.35]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-accent-text opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                {s.tagline}
              </p>
              <h3 className="mt-1 text-sm font-bold uppercase tracking-[0.18em] transition-transform duration-500 group-hover:-translate-y-1">
                {s.title}
              </h3>
              <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr]">
                <p className="overflow-hidden text-sm leading-relaxed text-white/80">
                  <span className="block pt-3">{s.description}</span>
                </p>
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
