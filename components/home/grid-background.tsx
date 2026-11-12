'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

const CELL = 64
const SPEED = 140 // px per second

type Run = { id: number; x0: number; y0: number; x1: number; y1: number; rotate: number; dur: number }

let runId = 0
function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/** Pick a random grid line and a direction; the comet travels its full length. */
function nextRun(w: number, h: number): Run {
  const horizontal = Math.random() < 0.6
  const reverse = Math.random() < 0.5
  const pad = 120
  if (horizontal) {
    const rows = Math.max(1, Math.floor(h / CELL) - 1)
    const y = randInt(1, rows) * CELL
    const [x0, x1] = reverse ? [w + pad, -pad] : [-pad, w + pad]
    return { id: ++runId, x0, y0: y, x1, y1: y, rotate: reverse ? 180 : 0, dur: (w + 2 * pad) / SPEED }
  }
  const cols = Math.max(1, Math.floor(w / CELL) - 1)
  const x = randInt(1, cols) * CELL
  const [y0, y1] = reverse ? [h + pad, -pad] : [-pad, h + pad]
  return { id: ++runId, x0: x, y0, x1: x, y1, rotate: reverse ? -90 : 90, dur: (h + 2 * pad) / SPEED }
}

function Comet({ w, h, startDelay }: { w: number; h: number; startDelay: number }) {
  const [run, setRun] = useState<Run | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    timer.current = setTimeout(() => setRun(nextRun(w, h)), startDelay)
    return () => clearTimeout(timer.current)
  }, [w, h, startDelay])

  if (!run) return null
  return (
    <motion.div
      key={run.id}
      className="absolute top-0 left-0 size-0"
      initial={{ x: run.x0, y: run.y0, rotate: run.rotate }}
      animate={{ x: run.x1, y: run.y1 }}
      transition={{ duration: run.dur, ease: 'linear' }}
      onAnimationComplete={() => {
        timer.current = setTimeout(() => setRun(nextRun(w, h)), randInt(400, 1800))
      }}
    >
      <span className="absolute top-0 -left-[110px] h-px w-[110px] bg-gradient-to-r from-transparent to-primary" />
      <span className="absolute -top-[3px] -left-[3px] size-[7px] rounded-full bg-primary shadow-[0_0_10px_2px_rgba(220,38,38,0.7)]" />
    </motion.div>
  )
}

/** Visible grid lines with 1–2 red comets travelling along them. */
export function GridBackground({ comets = 2, className }: { comets?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState<{ w: number; h: number } | null>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => {
      const w = Math.round(e.contentRect.width)
      const h = Math.round(e.contentRect.height)
      // only react to meaningful size changes (mobile URL bar etc.)
      setSize((s) => (s && Math.abs(s.w - w) < CELL && Math.abs(s.h - h) < CELL ? s : { w, h }))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn('pointer-events-none absolute inset-0 overflow-hidden grid-mask', className)}
    >
      <div className="hero-grid absolute inset-0" />
      {size &&
        !reduce &&
        Array.from({ length: comets }, (_, i) => (
          <Comet key={i} w={size.w} h={size.h} startDelay={600 + i * 2200} />
        ))}
    </div>
  )
}
