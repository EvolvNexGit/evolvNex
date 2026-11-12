'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Container } from '@/components/site/container'

export type Stat = { value: number; suffix?: string; label: string }

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

/** One rolling digit column (odometer). */
function Digit({ digit, active, delay }: { digit: number; active: boolean; delay: number }) {
  return (
    <span className="relative inline-block h-[1em] w-[0.62em] overflow-hidden leading-none">
      <motion.span
        className="absolute inset-x-0 top-0 flex flex-col"
        initial={{ y: 0 }}
        animate={{ y: active ? `${-digit * 10}%` : 0 }}
        transition={{ duration: 1.8, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {DIGITS.map((d) => (
          <span key={d} className="block h-[1em] text-center leading-none">
            {d}
          </span>
        ))}
      </motion.span>
    </span>
  )
}

function Odometer({ value, suffix, active }: { value: number; suffix?: string; active: boolean }) {
  const digits = String(value).split('').map(Number)
  return (
    <span
      className="inline-flex items-baseline text-5xl font-black tracking-tight tabular-nums sm:text-6xl"
      role="text"
      aria-label={`${value}${suffix ?? ''}`}
    >
      <span aria-hidden className="inline-flex">
        {digits.map((d, i) => (
          <Digit key={i} digit={d} active={active} delay={i * 0.12} />
        ))}
      </span>
      {suffix && (
        <span
          aria-hidden
          className={suffix.length > 2 ? 'ml-2 text-2xl font-black uppercase text-primary sm:text-3xl' : 'text-primary'}
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
        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`py-12 pr-4 sm:py-16 ${i % 2 === 1 ? 'border-l border-border pl-5' : ''} ${
                i > 0 ? 'lg:border-l lg:border-border lg:pl-8' : ''
              }`}
            >
              <Odometer value={s.value} suffix={s.suffix} active={inView} />
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
