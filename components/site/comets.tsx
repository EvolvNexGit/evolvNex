'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

type Run = { id: number; x0: number; y0: number; x1: number; y1: number; rotate: number; dur: number }

let runId = 0
function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/** Pick a random grid line and direction; the comet travels its full length. */
function nextRun(w: number, h: number, cellW: number, cellH: number, speed: number, pad: number): Run {
  const horizontal = Math.random() < 0.6
  const reverse = Math.random() < 0.5
  if (horizontal) {
    const rows = Math.max(1, Math.round(h / cellH) - 1)
    const y = randInt(1, rows) * cellH
    const [x0, x1] = reverse ? [w + pad, -pad] : [-pad, w + pad]
    return { id: ++runId, x0, y0: y, x1, y1: y, rotate: reverse ? 180 : 0, dur: (w + 2 * pad) / speed }
  }
  const cols = Math.max(1, Math.round(w / cellW) - 1)
  const x = randInt(1, cols) * cellW
  const [y0, y1] = reverse ? [h + pad, -pad] : [-pad, h + pad]
  return { id: ++runId, x0: x, y0, x1: x, y1, rotate: reverse ? -90 : 90, dur: (h + 2 * pad) / speed }
}

type CometProps = {
  w: number
  h: number
  cellW: number
  cellH: number
  speed: number
  trail: number
  bright: boolean
}

function Comet({ w, h, cellW, cellH, speed, trail, bright, startDelay }: CometProps & { startDelay: number }) {
  const [run, setRun] = useState<Run | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const pad = trail + 20

  useEffect(() => {
    timer.current = setTimeout(() => setRun(nextRun(w, h, cellW, cellH, speed, pad)), startDelay)
    return () => clearTimeout(timer.current)
  }, [w, h, cellW, cellH, speed, pad, startDelay])

  if (!run) return null
  return (
    <motion.div
      key={run.id}
      className="absolute top-0 left-0 size-0"
      initial={{ x: run.x0, y: run.y0, rotate: run.rotate }}
      animate={{ x: run.x1, y: run.y1 }}
      transition={{ duration: run.dur, ease: 'linear' }}
      onAnimationComplete={() => {
        timer.current = setTimeout(
          () => setRun(nextRun(w, h, cellW, cellH, speed, pad)),
          randInt(400, 1800),
        )
      }}
    >
      {/* trail: lights up the grid line the dot has just travelled */}
      <span
        className={
          bright
            ? 'absolute -top-px h-0.5 bg-gradient-to-r from-transparent via-primary/60 to-primary shadow-[0_0_12px_1px_rgba(220,38,38,0.55)]'
            : 'absolute top-0 h-px bg-gradient-to-r from-transparent to-primary'
        }
        style={{ left: -trail, width: trail }}
      />
      <span className="absolute -top-[3px] -left-[3px] size-[7px] rounded-full bg-primary shadow-[0_0_10px_2px_rgba(220,38,38,0.7)]" />
    </motion.div>
  )
}

/**
 * Red dots travelling along grid lines. Fills its (relative/absolute/fixed) parent.
 * Lines are assumed at multiples of cellW / cellH from the parent's top-left.
 */
export function Comets({
  count = 2,
  cell = 64,
  cols,
  rows,
  speed = 140,
  trail = 110,
  bright = false,
}: {
  count?: number
  /** square cell size in px (ignored when cols/rows are given) */
  cell?: number
  /** fit the grid to the parent: lines at parentWidth/cols and parentHeight/rows */
  cols?: number
  rows?: number
  speed?: number
  trail?: number
  bright?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState<{ w: number; h: number } | null>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => {
      const w = Math.round(e.contentRect.width)
      const h = Math.round(e.contentRect.height)
      // ignore tiny changes (mobile URL bar etc.)
      setSize((s) => (s && Math.abs(s.w - w) < 48 && Math.abs(s.h - h) < 48 ? s : { w, h }))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const cellW = size && cols ? size.w / cols : cell
  const cellH = size && rows ? size.h / rows : cell

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {size &&
        !reduce &&
        Array.from({ length: count }, (_, i) => (
          <Comet
            key={i}
            w={size.w}
            h={size.h}
            cellW={cellW}
            cellH={cellH}
            speed={speed}
            trail={trail}
            bright={bright}
            startDelay={600 + i * 2200}
          />
        ))}
    </div>
  )
}
