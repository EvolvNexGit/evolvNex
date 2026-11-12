'use client'

import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { ArrowRight, LayoutGrid, X } from 'lucide-react'
import type { Project } from '@/lib/projects'
import { CELL_ASPECT, GridBoard, buildCells } from './grid-board'

const DESKTOP = '(min-width: 768px)'
function useIsDesktop() {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia(DESKTOP)
      m.addEventListener('change', cb)
      return () => m.removeEventListener('change', cb)
    },
    () => window.matchMedia(DESKTOP).matches,
    () => true,
  )
}

/** Target cell width per breakpoint; rows follow from the screenshot aspect. */
const TARGET_CELL_W = { desktop: 340, mobile: 180 }

/** Columns/rows that fill w x h with cells close to CELL_ASPECT. */
function fitGrid(w: number, h: number, desktop: boolean) {
  const cols = Math.max(2, Math.round(w / (desktop ? TARGET_CELL_W.desktop : TARGET_CELL_W.mobile)))
  const cellH = w / cols / CELL_ASPECT
  const rows = Math.max(2, Math.round(h / cellH))
  return { cols, rows }
}

/** Full-screen grid of website screenshots that adapts to the viewport. */
export function ShowroomDialog({
  projects,
  open,
  onOpenChange,
}: {
  projects: Project[]
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const desktop = useIsDesktop()
  const area = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState<{ w: number; h: number } | null>(null)

  useEffect(() => {
    if (!open) return
    // the dialog content mounts on open; observe once it is in the DOM
    let ro: ResizeObserver | undefined
    const raf = requestAnimationFrame(() => {
      const el = area.current
      if (!el) return
      ro = new ResizeObserver(([e]) => {
        const w = Math.round(e.contentRect.width)
        const h = Math.round(e.contentRect.height)
        setSize((s) => (s && s.w === w && s.h === h ? s : { w, h }))
      })
      ro.observe(el)
    })
    return () => {
      cancelAnimationFrame(raf)
      ro?.disconnect()
    }
  }, [open])

  const grid = size ? fitGrid(size.w, size.h, desktop) : null
  const total = grid ? grid.cols * grid.rows : 0
  // one "your website next" cell, roughly in the middle
  const invite = grid ? Math.floor(grid.rows / 2) * grid.cols + Math.floor(grid.cols / 2) : -1
  const cells = grid ? buildCells(projects, total, { [invite]: 'invite' }) : []

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Content
          aria-describedby={undefined}
          className="data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 fixed inset-0 z-[100] flex flex-col bg-[#0c0c0c] duration-300"
        >
          <div aria-hidden className="site-grid pointer-events-none absolute inset-0" />
          <div className="relative flex h-14 shrink-0 items-center justify-between border-b border-white/10 px-5 sm:px-8">
            <Dialog.Title className="font-display text-base uppercase sm:text-lg">
              Website <span className="text-primary">Grid</span>
            </Dialog.Title>
            <p className="font-sub hidden text-xs font-bold tracking-[0.2em] text-sand uppercase md:block">
              Hover to reveal · Click to visit
            </p>
            <Dialog.Close
              className="inline-flex size-10 items-center justify-center border border-white/15 text-foreground transition-colors hover:border-primary hover:bg-primary"
              aria-label="Close website grid"
            >
              <X className="size-5" aria-hidden />
            </Dialog.Close>
          </div>

          <div ref={area} className="relative min-h-0 flex-1 overflow-hidden">
            {grid && (
              <GridBoard
                key={`${grid.cols}x${grid.rows}`}
                fill
                cells={cells}
                cols={grid.cols}
                rows={grid.rows}
                comets={2}
                className="absolute inset-0"
                imageSizes={`${Math.ceil(100 / grid.cols)}vw`}
              />
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

/** "Enter the Grid" button that opens the full-screen showroom. */
export function GridShowroom({ projects }: { projects: Project[] }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group inline-flex min-h-11 items-center justify-center gap-2 border border-primary px-5 py-2.5 text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-primary"
      >
        <LayoutGrid className="size-4" aria-hidden />
        Enter the Grid
        <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
      </button>
      <ShowroomDialog projects={projects} open={open} onOpenChange={setOpen} />
    </>
  )
}

/** Inline home-page board (3x3 desktop, 2x4 mobile); last cell opens the full grid. */
export function HomeGrid({ featured, all }: { featured: Project[]; all: Project[] }) {
  const [open, setOpen] = useState(false)
  const desktop = useIsDesktop()
  const cells = desktop
    ? buildCells(featured, 9, { 4: 'invite', 8: 'enter' }, true)
    : buildCells(featured, 8, { 6: 'invite', 7: 'enter' }, true)
  return (
    <>
      <GridBoard
        key={desktop ? 'd' : 'm'}
        cells={cells}
        cols={desktop ? 3 : 2}
        rows={desktop ? 3 : 4}
        comets={2}
        onEnter={() => setOpen(true)}
        className="border-r border-b border-white/10"
        imageSizes={desktop ? '400px' : '50vw'}
      />
      <ShowroomDialog projects={all} open={open} onOpenChange={setOpen} />
    </>
  )
}
