'use client'

import { useEffect, useRef } from 'react'

export type Area = { x: number; y: number; w: number; h: number }
export type CometFrame = { active: boolean; x: number; y: number; horizontal: boolean; dir: 1 | -1 }

type Options = {
  count: number
  enabled: boolean
  /** grid cell size; lines sit at multiples of it from the container's top-left */
  cell: () => { w: number; h: number }
  /** region (container coords) a run may use; null = not available, retry later */
  area: () => Area | null
  speed: number
  trail: number
  onFrame?: (index: number, frame: CometFrame) => void
  onTick?: () => void
  /** fix each comet's axis by index ('h' | 'v'); unset = random per run */
  axes?: ('h' | 'v')[]
}

type State = {
  active: boolean
  h: boolean
  dir: 1 | -1
  line: number
  pos: number
  end: number
  wait: number
}

/**
 * requestAnimationFrame engine for "comets": red dots that travel along grid
 * lines. Dots are positioned by writing transforms straight to the DOM (no React
 * re-renders). Returns a ref array to attach to each dot element.
 */
export function useComets(options: Options) {
  const els = useRef<(HTMLDivElement | null)[]>([])
  const opts = useRef(options)
  opts.current = options
  const { enabled, count } = options

  useEffect(() => {
    if (!enabled) return
    const states: State[] = Array.from({ length: count }, (_, i) => ({
      active: false,
      h: true,
      dir: 1,
      line: 0,
      pos: 0,
      end: 0,
      wait: 0.6 + i * 2.2,
    }))

    const start = (s: State, index: number) => {
      const o = opts.current
      const a = o.area()
      if (!a || a.w < 40 || a.h < 40) return false
      const { w: cw, h: ch } = o.cell()
      const fixed = o.axes?.[index]
      const preferH = fixed ? fixed === 'h' : Math.random() < 0.6
      for (const h of fixed ? [preferH] : [preferH, !preferH]) {
        const step = h ? ch : cw
        if (step < 8) continue
        const lo = h ? a.y : a.x
        const hi = h ? a.y + a.h : a.x + a.w
        const k0 = Math.floor(lo / step) + 1
        const k1 = Math.ceil(hi / step) - 1
        if (k1 < k0) continue
        const dir: 1 | -1 = Math.random() < 0.5 ? 1 : -1
        const pad = o.trail + 20
        const from = h ? a.x : a.y
        const to = h ? a.x + a.w : a.y + a.h
        Object.assign(s, {
          active: true,
          h,
          dir,
          line: (k0 + Math.floor(Math.random() * (k1 - k0 + 1))) * step,
          pos: dir === 1 ? from - pad : to + pad,
          end: dir === 1 ? to + pad : from - pad,
        })
        return true
      }
      return false
    }

    let last = performance.now()
    let raf = 0
    const tick = (t: number) => {
      const dt = Math.min(0.05, (t - last) / 1000)
      last = t
      const o = opts.current
      o.onTick?.()
      states.forEach((s, i) => {
        const el = els.current[i]
        if (!s.active) {
          s.wait -= dt
          if (s.wait > 0) return
          if (!start(s, i)) {
            s.wait = 1
            return
          }
          if (el) el.style.opacity = '1'
        }
        s.pos += s.dir * o.speed * dt
        const x = s.h ? s.pos : s.line
        const y = s.h ? s.line : s.pos
        const rot = s.h ? (s.dir === 1 ? 0 : 180) : s.dir === 1 ? 90 : -90
        if (el) el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rot}deg)`
        o.onFrame?.(i, { active: true, x, y, horizontal: s.h, dir: s.dir })
        if ((s.dir === 1 && s.pos >= s.end) || (s.dir === -1 && s.pos <= s.end)) {
          s.active = false
          s.wait = 0.4 + Math.random() * 1.4
          if (el) el.style.opacity = '0'
          o.onFrame?.(i, { active: false, x, y, horizontal: s.h, dir: s.dir })
        }
      })
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [enabled, count])

  return els
}

/** The visual dot + trail. Attach the ref from useComets. */
export function CometDot({
  setRef,
  trail,
  bright = false,
}: {
  setRef: (el: HTMLDivElement | null) => void
  trail: number
  bright?: boolean
}) {
  return (
    <div ref={setRef} className="absolute top-0 left-0 size-0 opacity-0 will-change-transform">
      <span
        className={
          bright
            ? 'absolute -top-px h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-primary shadow-[0_0_12px_1px_rgba(220,38,38,0.5)]'
            : 'absolute top-0 h-px bg-gradient-to-r from-transparent to-primary'
        }
        style={{ left: -trail, width: trail }}
      />
      <span className="absolute -top-[3px] -left-[3px] size-[7px] rounded-full bg-primary shadow-[0_0_10px_2px_rgba(220,38,38,0.7)]" />
    </div>
  )
}
