'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Container } from '@/components/site/container'

export type Stat = { value: number; suffix?: string; label: string }

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

/** One rolling digit column (odometer). */
function Digit({ digit, active, delay }: { digit: number; active: boolean; delay: number }) {
  return (
    <span className="relative inline-block h-[1em] w-[0.68em] overflow-hidden">
      <motion.span
        className="absolute inset-x-0 top-0 flex flex-col"
        initial={{ y: 0 }}
        animate={{ y: active ? `${-digit * 10}%` : 0 }}
        transition={{ duration: 3.4, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {DIGITS.map((d) => (
          <span key={d} className="block h-[1em] text-center">
            {d}
          </span>
        ))}
      </motion.span>
    </span>
  )
}

/**
 * Number and suffix share one font, one size and one line box (line-height 1,
 * bottom aligned), so every stat sits on the same baseline.
 */
function Odometer({ value, suffix, active }: { value: number; suffix?: string; active: boolean }) {
  const digits = String(value).split('').map(Number)
  return (
    <span
      className="font-display flex items-end gap-1.5 text-5xl leading-none sm:text-6xl"
      role="text"
      aria-label={`${value}${suffix ? ` ${suffix}` : ''}`}
    >
      <span aria-hidden className="flex">
        {digits.map((d, i) => (
          <Digit key={i} digit={d} active={active} delay={i * 0.28} />
        ))}
      </span>
      {suffix && (
        <span
          aria-hidden
          className={
            suffix.length > 1
              ? 'mb-[0.16em] text-[0.42em] text-primary uppercase'
              : 'text-primary uppercase'
          }
        >
          {suffix}
        </span>
      )}
    </span>
  )
}

export function Stats({ stats }: { stats: Stat[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })

  return (
    <section aria-label="EvolvNex at a glance" className="border-b border-border">
      <Container>
        <div
          ref={ref}
          className="grid grid-cols-2 border-l border-border lg:grid-cols-4 [&>*:nth-child(-n+2)]:border-b lg:[&>*:nth-child(-n+2)]:border-b-0"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-start gap-4 border-r border-border px-5 py-8 sm:px-8 sm:py-10"
            >
              <Odometer value={s.value} suffix={s.suffix} active={inView} />
              <p className="font-sub text-xs font-bold uppercase tracking-[0.2em] text-sand">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
