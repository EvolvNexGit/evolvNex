'use client'

import Image from 'next/image'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ChevronsUpDown, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { GRID_COLS, type Breakpoint, type BrandTile, type ResolvedTile } from '@/lib/brand-grid'

/**
 * Brand identity grid with ONE global monochrome-to-colour boundary.
 *
 * How it works
 *  - Every tile renders two aligned layers: a grayscale one underneath and a colour one on top.
 *  - The colour layer is clipped with `inset()` from a single CSS variable (--ry, the boundary's
 *    y position inside the grid) minus the tile's own top (--tt) and height (--th, both measured).
 *    So the boundary is the same horizontal line across every tile, whatever its size.
 *  - Dragging only writes `--ry` on the root element: no React state, no re-render per frame.
 */

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n))

type Props = {
  tiles: ResolvedTile[]
  /** Enable hover-to-flip notes (brand page). Tap toggles on touch devices. */
  flips?: boolean
  /** Starting boundary, 0 (top) .. 1 (bottom). */
  initial?: number
  /** Horizontal position of the hanging handle, % of grid width. */
  handleAt?: number
  /** Accessible name of the whole showcase. */
  label?: string
  className?: string
}

export function BrandReveal({
  tiles,
  flips = false,
  initial = 0.42,
  handleAt = 72,
  label = 'Brand identity showcase',
  className,
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const handleRef = useRef<HTMLDivElement>(null)
  const pos = useRef(initial)
  const height = useRef(0)
  const drag = useRef<{ y0: number; p0: number; s0: number; lastY: number; dir: number } | null>(null)
  const raf = useRef(0)
  const easeTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  const apply = useCallback((next: number) => {
    const root = rootRef.current
    const handle = handleRef.current
    if (!root || !handle) return
    pos.current = clamp(next, 0, 1)
    root.style.setProperty('--ry', `${(pos.current * height.current).toFixed(2)}px`)
    const pct = Math.round(pos.current * 100)
    handle.setAttribute('aria-valuenow', String(pct))
    handle.setAttribute('aria-valuetext', `${pct}% of the grid in colour`)
  }, [])

  // Measure tiles relative to the grid so the one boundary can be translated into each tile.
  useLayoutEffect(() => {
    const grid = gridRef.current
    if (!grid) return
    const measure = () => {
      const g = grid.getBoundingClientRect()
      height.current = g.height
      grid.querySelectorAll<HTMLElement>('[data-tile]').forEach((el) => {
        const r = el.getBoundingClientRect()
        el.style.setProperty('--tt', `${(r.top - g.top).toFixed(2)}px`)
        el.style.setProperty('--th', `${r.height.toFixed(2)}px`)
      })
      apply(pos.current)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(grid)
    return () => ro.disconnect()
  }, [apply])

  // One gentle tug on the handle the first time the grid is properly in view.
  useEffect(() => {
    const root = rootRef.current
    if (!root || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        root.dataset.hint = 'true'
        io.disconnect()
      },
      { threshold: 0.5 },
    )
    io.observe(root)
    return () => io.disconnect()
  }, [])

  useEffect(() => () => clearTimeout(easeTimer.current), [])

  // Boundary follows the pointer plus however far the page has scrolled since the drag began.
  const follow = useCallback(() => {
    const d = drag.current
    if (!d || !height.current) return
    const raw = d.p0 + (d.lastY - d.y0 + (window.scrollY - d.s0)) / height.current
    const next = clamp(raw, 0, 1)
    // At either end, re-anchor the drag so reversing direction responds immediately (no dead travel).
    if (raw !== next) d.p0 += next - raw
    apply(next)
  }, [apply])

  // Near the top/bottom of the viewport, glide the page so the pull never has to be restarted.
  const autoScroll = useCallback(() => {
    const tick = () => {
      const d = drag.current
      if (!d) {
        raf.current = 0
        return
      }
      // Symmetric around the middle of the visible viewport (below the sticky header), so up and
      // down feel identical. Speed ramps from the edge of a small neutral band to the screen edges.
      const vh = window.innerHeight
      const header = 72
      const mid = (vh + header) / 2
      const half = (vh - header) / 2
      const off = d.lastY - mid
      const mag = Math.max(0, Math.abs(off) - half * 0.18)
      const v = Math.sign(off) * Math.min(1, mag / (half * 0.6))
      // Only glide in the direction the user is actually pulling: a plain click, or reversing
      // course, never scrolls the page.
      const intent = Math.sign(v) === d.dir
      const blocked = (v > 0 && pos.current >= 1) || (v < 0 && pos.current <= 0)
      if (v !== 0 && intent && !blocked) {
        window.scrollBy({ top: v * 8, behavior: 'instant' })
        follow()
      }
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
  }, [follow])

  useEffect(() => () => cancelAnimationFrame(raf.current), [])

  const onDown = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    e.currentTarget.setPointerCapture(e.pointerId)
    drag.current = { y0: e.clientY, p0: pos.current, s0: window.scrollY, lastY: e.clientY, dir: 0 }
    if (!raf.current) autoScroll()
    rootRef.current!.dataset.dragging = 'true'
    rootRef.current!.dataset.hint = 'done'
  }
  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    const d = drag.current
    if (!d) return
    const dy = e.clientY - d.lastY
    if (Math.abs(dy) >= 1) d.dir = Math.sign(dy)
    d.lastY = e.clientY
    follow()
  }
  const onUp = () => {
    drag.current = null
    cancelAnimationFrame(raf.current)
    raf.current = 0
    if (rootRef.current) delete rootRef.current.dataset.dragging
  }

  const onKey = (e: React.KeyboardEvent) => {
    const small = e.shiftKey ? 0.2 : 0.05
    let next: number | null = null
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = pos.current + small
    else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = pos.current - small
    else if (e.key === 'PageDown') next = pos.current + 0.2
    else if (e.key === 'PageUp') next = pos.current - 0.2
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = 1
    if (next === null) return
    e.preventDefault()
    const root = rootRef.current!
    root.dataset.ease = 'true'
    clearTimeout(easeTimer.current)
    easeTimer.current = setTimeout(() => delete root.dataset.ease, 320)
    apply(next)
  }

  const handleProps = {
    onPointerDown: onDown,
    onPointerMove: onMove,
    onPointerUp: onUp,
    onPointerCancel: onUp,
  }

  return (
    <div
      ref={rootRef}
      className={cn('brand-reveal', className)}
      style={{ '--hx': `${handleAt}%` } as React.CSSProperties}
    >
      <div className="brand-stage">
        <div ref={gridRef} className="brand-grid" role="group" aria-label={label}>
          {tiles.map((t) => (
            <Tile key={t.tile.id} resolved={t} flips={flips} />
          ))}
        </div>

        {/* The one boundary + its hanging pull tab */}
        <div className="brand-bar">
          <div className="brand-bar-line" aria-hidden />
          <div className="brand-bar-hit" aria-hidden {...handleProps} />
          <div className="brand-handle">
            <span className="brand-stem" aria-hidden />
            <div
              ref={handleRef}
              role="slider"
              tabIndex={0}
              aria-label="Colour reveal. Pull down to bring the brands to life."
              aria-orientation="vertical"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(initial * 100)}
              aria-valuetext={`${Math.round(initial * 100)}% of the grid in colour`}
              className="brand-tag"
              onKeyDown={onKey}
              {...handleProps}
            >
              <span className="brand-tag-eyelet" aria-hidden />
              <span className="font-display text-[1.05rem] leading-none tracking-[0.18em] uppercase">
                Pull me
              </span>
              <ChevronsUpDown className="size-5 opacity-90" aria-hidden />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------- tiles ------------------------------- */

function placementVars(r: ResolvedTile) {
  const v: Record<string, number> = {}
  for (const bp of ['sm', 'md', 'lg'] as Breakpoint[]) {
    const p = r.place[bp]
    v[`--${bp}-c`] = p.col
    v[`--${bp}-r`] = p.row
    v[`--${bp}-w`] = p.w
    v[`--${bp}-h`] = p.h
  }
  return v as unknown as React.CSSProperties
}

/** Responsive `sizes` so each tile only downloads what its slot needs. */
function sizesFor(r: ResolvedTile, zoom: number) {
  const px = (bp: Breakpoint, total: number) =>
    Math.round(((r.place[bp].w / GRID_COLS[bp]) * total) * zoom)
  const vw = (bp: Breakpoint) => Math.round((r.place[bp].w / GRID_COLS[bp]) * 100 * zoom)
  return `(min-width: 1024px) ${px('lg', 1136)}px, (min-width: 640px) ${vw('md')}vw, ${vw('sm')}vw`
}

function Tile({ resolved, flips }: { resolved: ResolvedTile; flips: boolean }) {
  const { tile } = resolved
  const [flipped, setFlipped] = useState(false)
  const canFlip = flips && !!tile.flip

  const front = (
    <>
      <div className="brand-layer brand-layer--mono" aria-hidden>
        <Art tile={tile} resolved={resolved} layer="mono" />
      </div>
      <div
        className="brand-layer brand-layer--color"
        {...(canFlip ? { 'aria-hidden': true } : { role: 'img', 'aria-label': tile.alt })}
      >
        <Art tile={tile} resolved={resolved} layer="color" />
      </div>
    </>
  )

  if (!canFlip) {
    return (
      <div data-tile className="brand-tile brand-hover" style={placementVars(resolved)}>
        {front}
      </div>
    )
  }

  const note = tile.flip!
  return (
    <div
      data-tile
      data-flipped={flipped}
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      aria-label={`${tile.alt} ${note.line1} ${note.line2}`}
      className="brand-tile brand-flip"
      style={placementVars(resolved)}
      onClick={() => setFlipped((f) => !f)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          setFlipped((f) => !f)
        }
      }}
    >
      <div className="brand-flip-card">
        <div className="brand-flip-face">{front}</div>
        <div className="brand-flip-face brand-flip-back">
          <span aria-hidden className="absolute top-0 left-0 h-px w-14 bg-primary" />
          <div className="flex h-full flex-col justify-end p-5 sm:p-7">
            <p className="font-display text-lg leading-snug uppercase sm:text-xl lg:text-2xl">
              {note.line1}
            </p>
            <p className="mt-2 max-w-[28ch] text-sm leading-snug text-muted-foreground sm:text-base">
              {note.line2}
            </p>
          </div>
        </div>
      </div>
      <span className="brand-flip-hint" aria-hidden>
        <Plus className="size-3.5" />
      </span>
    </div>
  )
}

function Art({
  tile,
  resolved,
  layer,
}: {
  tile: BrandTile
  resolved: ResolvedTile
  layer: 'mono' | 'color'
}) {
  if (tile.kind === 'palette') {
    return (
      <div className="brand-palette">
        <div className="brand-palette-inner">
          {tile.swatches.map((s) => (
            <div
              key={s.hex}
              className={cn('brand-swatch', s.light ? 'text-[#17181c]' : 'text-white')}
              style={{ backgroundColor: s.hex }}
            >
              <span>{s.name}</span>
              <span className="opacity-70">{s.hex}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (tile.kind === 'type') {
    return (
      <div className="brand-type">
        <span className="brand-type-orb brand-type-orb--a" />
        <span className="brand-type-orb brand-type-orb--b" />
        <div className="brand-type-copy">
          <span className="brand-type-aa">{tile.specimen}</span>
          <span className="brand-type-line">
            {tile.lines[0]}
            <br />
            {tile.lines[1]}
          </span>
        </div>
      </div>
    )
  }

  const zoom = tile.zoom ?? 1
  const [fx, fy] = tile.focus ?? [0.5, 0.5]
  const src = layer === 'mono' && tile.monoSrc ? tile.monoSrc : tile.src
  return (
    <div
      className="brand-zoom"
      style={{ '--z': zoom, '--fx': fx, '--fy': fy } as React.CSSProperties}
    >
      <Image
        src={src}
        alt=""
        fill
        sizes={sizesFor(resolved, zoom)}
        priority={!!tile.priority && layer === 'color'}
        className="object-cover"
        style={{ objectPosition: `${fx * 100}% ${fy * 100}%` }}
        draggable={false}
      />
    </div>
  )
}
