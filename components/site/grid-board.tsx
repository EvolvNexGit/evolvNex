'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useReducedMotion } from 'framer-motion'
import { ArrowUpRight, LayoutGrid, Plus } from 'lucide-react'
import type { Project } from '@/lib/projects'
import { cn } from '@/lib/utils'
import { CometDot, useComets } from './use-comets'

export type Shot = { key: string; name: string; url?: string; src: string; alt: string }
export type GridCell =
  | { kind: 'shot'; shot: Shot }
  | { kind: 'invite' }
  | { kind: 'enter' }
  | { kind: 'empty' }

/** Screenshot width / height (the work screenshots are ~2.25:1). */
export const CELL_ASPECT = 2.25

/**
 * Lay screenshots into `total` cells; `specials` pins non-image cells to indexes.
 * Covers come first, then secondary screenshots; when there are more cells than
 * screenshots the list repeats.
 */
export function buildCells(
  projects: Project[],
  total: number,
  specials: Record<number, 'invite' | 'enter' | 'empty'>,
  coversOnly = false,
): GridCell[] {
  const toShot = (p: Project, img: Project['images'][number]): Shot => ({
    key: img.src,
    name: p.name,
    url: p.url,
    ...img,
  })
  const covers = projects.map((p) => toShot(p, p.images[0]))
  const extras = coversOnly ? [] : projects.flatMap((p) => p.images.slice(1).map((img) => toShot(p, img)))
  const shots = [...covers, ...extras]
  const cells: GridCell[] = []
  let s = 0
  for (let i = 0; i < total; i++) {
    const special = specials[i]
    if (special) cells.push({ kind: special })
    else if (shots.length) cells.push({ kind: 'shot', shot: shots[s++ % shots.length] })
    else cells.push({ kind: 'empty' })
  }
  return cells
}

const TRAIL = 220
const BAND = 64 // thickness of the strip revealed either side of a travelling dot
const FAR = '-9999px'

/**
 * Black grid of rectangular (screenshot-shaped) cells with website screenshots hidden underneath.
 * - Hover a cell: its screenshot shows in full with a red frame; the grid lines
 *   around it brighten and only the edges of neighbouring cells are revealed
 *   (a soft radial spotlight centred on the hovered cell).
 * - Red dots travel the grid lines; as they pass, the line glows and a thin strip
 *   of the screenshots on either side of that line shows through.
 */
export function GridBoard({
  cells,
  cols,
  rows,
  comets = 2,
  onEnter,
  className,
  style,
  imageSizes = '25vw',
  fill = false,
}: {
  cells: GridCell[]
  cols: number
  rows: number
  comets?: number
  onEnter?: () => void
  className?: string
  style?: CSSProperties
  imageSizes?: string
  /** fill the parent (cols/rows chosen by the caller) instead of sizing by aspect ratio */
  fill?: boolean
}) {
  const board = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<number | null>(null)
  const [inView, setInView] = useState(false)
  const pointer = useRef<string>('mouse')
  const reduce = useReducedMotion()

  useEffect(() => {
    const el = board.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const els = useComets({
    count: comets,
    enabled: inView && !reduce && comets > 0,
    speed: 200,
    trail: TRAIL,
    // one horizontal and one vertical dot
    axes: ['h', 'v'],
    cell: () => {
      const b = board.current
      return b ? { w: b.clientWidth / cols, h: b.clientHeight / rows } : { w: 0, h: 0 }
    },
    area: () => {
      const b = board.current
      return b ? { x: 0, y: 0, w: b.clientWidth, h: b.clientHeight } : null
    },
    onFrame: (i, f) => {
      const b = board.current
      if (!b) return
      const set = (k: string, v: string) => b.style.setProperty(`--c${i}${k}`, v)
      if (!f.active) {
        set('x', FAR)
        set('y', FAR)
        return
      }
      const along = (f.horizontal ? f.x : f.y) - f.dir * TRAIL * 0.4
      const len = TRAIL * 1.3
      if (f.horizontal) {
        set('x', `${along - len / 2}px`)
        set('y', `${f.y - BAND / 2}px`)
        set('w', `${len}px`)
        set('h', `${BAND}px`)
      } else {
        set('x', `${f.x - BAND / 2}px`)
        set('y', `${along - len / 2}px`)
        set('w', `${BAND}px`)
        set('h', `${len}px`)
      }
    },
  })

  const activate = (i: number) => {
    const b = board.current
    if (!b) return
    const cw = b.clientWidth / cols
    const ch = b.clientHeight / rows
    const x = `${((i % cols) + 0.5) * cw}px`
    const y = `${(Math.floor(i / cols) + 0.5) * ch}px`
    if (active === null) {
      // jump the spotlight centre without animating it across the board
      b.style.transition = 'none'
      b.style.setProperty('--mx', x)
      b.style.setProperty('--my', y)
      void b.offsetWidth
      b.style.transition = ''
    } else {
      b.style.setProperty('--mx', x)
      b.style.setProperty('--my', y)
    }
    b.style.setProperty('--srx', `${cw * 0.95}px`)
    b.style.setProperty('--sry', `${ch * 0.95}px`)
    b.style.setProperty('--hrx', `${cw * 1.55}px`)
    b.style.setProperty('--hry', `${ch * 1.55}px`)
    setActive(i)
  }
  const deactivate = () => {
    const b = board.current
    if (b) {
      for (const v of ['--srx', '--sry', '--hrx', '--hry']) b.style.setProperty(v, '0px')
    }
    setActive(null)
  }

  // CSS mask: spotlight (hover) + one soft strip per travelling dot
  const mask = (radiusVar: string): CSSProperties => {
    const images = [
      `radial-gradient(ellipse var(${radiusVar}x) var(${radiusVar}y) at var(--mx) var(--my), #000 40%, transparent 100%)`,
    ]
    const sizes = ['100% 100%']
    const positions = ['0 0']
    for (let i = 0; i < comets; i++) {
      images.push('radial-gradient(closest-side, #000 15%, transparent 100%)')
      sizes.push(`var(--c${i}w) var(--c${i}h)`)
      positions.push(`var(--c${i}x) var(--c${i}y)`)
    }
    const v = { image: images.join(', '), size: sizes.join(', '), position: positions.join(', ') }
    return {
      maskImage: v.image,
      WebkitMaskImage: v.image,
      maskSize: v.size,
      WebkitMaskSize: v.size,
      maskPosition: v.position,
      WebkitMaskPosition: v.position,
      maskRepeat: 'no-repeat',
      WebkitMaskRepeat: 'no-repeat',
    }
  }

  const initialVars: Record<string, string | number> = { '--cols': cols, '--rows': rows }
  for (let i = 0; i < comets; i++) {
    initialVars[`--c${i}x`] = FAR
    initialVars[`--c${i}y`] = FAR
    initialVars[`--c${i}w`] = '0px'
    initialVars[`--c${i}h`] = '0px'
  }

  const gridStyle: CSSProperties = {
    gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
    gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
  }

  const hoverProps = (i: number) => ({
    onPointerDown: (e: React.PointerEvent) => (pointer.current = e.pointerType),
    onMouseEnter: () => activate(i),
    onFocus: () => activate(i),
  })

  return (
    <div
      ref={board}
      className={cn('grid-board relative', className)}
      style={
        {
          ...(fill ? {} : { aspectRatio: `${cols * CELL_ASPECT} / ${rows}` }),
          ...initialVars,
          ...style,
        } as CSSProperties
      }
      onMouseLeave={deactivate}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) deactivate()
      }}
    >
      {/* screenshots, revealed only through the mask (edges near the spotlight / dots) */}
      <div aria-hidden className="absolute inset-0 grid" style={{ ...gridStyle, ...mask('--sr') }}>
        {cells.map((c, i) => (
          <div key={i} className="relative overflow-hidden">
            {c.kind === 'shot' && (
              <Image
                src={c.shot.src}
                alt=""
                fill
                sizes={imageSizes}
                className="object-cover object-top opacity-55"
              />
            )}
          </div>
        ))}
      </div>

      {/* brighter grid lines, shown only near the spotlight / dots */}
      <div aria-hidden className="grid-board-lines-hot absolute inset-0" style={mask('--hr')} />

      {/* interactive cells */}
      <ul className="absolute inset-0 grid" style={gridStyle}>
        {cells.map((cell, i) => {
          const on = active === i
          const base = 'group relative block size-full overflow-hidden text-left outline-none'

          if (cell.kind === 'empty') return <li key={i} aria-hidden />

          if (cell.kind === 'invite' || cell.kind === 'enter') {
            const inner = (
              <span
                className={cn(
                  'flex size-full flex-col items-center justify-center gap-3 p-3 text-center transition-colors duration-300',
                  on ? 'bg-primary text-white' : cell.kind === 'enter' ? 'text-accent-text' : 'text-muted-foreground',
                )}
              >
                {cell.kind === 'enter' ? (
                  <LayoutGrid className="size-6" strokeWidth={1.5} aria-hidden />
                ) : (
                  <Plus className="size-6" strokeWidth={1.5} aria-hidden />
                )}
                <span className="font-sub text-[11px] font-bold tracking-[0.2em] uppercase sm:text-xs">
                  {cell.kind === 'enter' ? 'Enter the Grid' : 'Your website next'}
                </span>
              </span>
            )
            return (
              <li key={i}>
                {cell.kind === 'enter' ? (
                  <button type="button" className={base} onClick={onEnter} {...hoverProps(i)}>
                    {inner}
                  </button>
                ) : (
                  <Link href="/contact" className={base} {...hoverProps(i)}>
                    {inner}
                  </Link>
                )}
              </li>
            )
          }

          const { shot } = cell
          const content = (
            <>
              <Image
                src={shot.src}
                alt={shot.alt}
                fill
                sizes={imageSizes}
                className={cn(
                  'object-cover object-top transition-[opacity,transform] duration-500',
                  on ? 'scale-105 opacity-100' : 'opacity-0',
                )}
              />
              <span
                className={cn(
                  'pointer-events-none absolute inset-0 border transition-colors duration-300',
                  on ? 'border-primary' : 'border-transparent',
                )}
              />
              <span
                className={cn(
                  'absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-black/90 to-transparent p-3 transition-opacity duration-300 sm:p-4',
                  on ? 'opacity-100' : 'opacity-0',
                )}
              >
                <span>
                  <span className="font-sub block text-xs font-bold tracking-wide uppercase sm:text-sm">
                    {shot.name}
                  </span>
                  <span className="block text-[11px] text-white/70 sm:text-xs">
                    {shot.url ? 'Visit live site' : 'Live link coming soon'}
                  </span>
                </span>
                {shot.url && (
                  <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                    <ArrowUpRight className="size-4" aria-hidden />
                  </span>
                )}
              </span>
            </>
          )

          // touch: first tap reveals, second tap opens
          const onClick = (e: React.MouseEvent) => {
            if (pointer.current !== 'mouse' && active !== i) {
              e.preventDefault()
              activate(i)
            }
          }

          return (
            <li key={i}>
              {shot.url ? (
                <a
                  href={shot.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${shot.name}: open live website in a new tab`}
                  className={cn(base, on && 'z-10')}
                  onClick={onClick}
                  {...hoverProps(i)}
                >
                  {content}
                </a>
              ) : (
                <div
                  tabIndex={0}
                  role="img"
                  aria-label={`${shot.name} website (live link coming soon)`}
                  className={cn(base, on && 'z-10')}
                  onClick={onClick}
                  {...hoverProps(i)}
                >
                  {content}
                </div>
              )}
            </li>
          )
        })}
      </ul>

      {/* travelling dots */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: comets }, (_, i) => (
          <CometDot key={i} trail={TRAIL} bright setRef={(el) => (els.current[i] = el)} />
        ))}
      </div>
    </div>
  )
}
