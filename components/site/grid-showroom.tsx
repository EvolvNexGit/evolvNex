'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import * as Dialog from '@radix-ui/react-dialog'
import { ArrowRight, ArrowUpRight, LayoutGrid, Plus, X } from 'lucide-react'
import type { Project } from '@/lib/projects'
import { cn } from '@/lib/utils'
import { Comets } from './comets'

const COLS = 4
const TOTAL = 16
/** Cells without a screenshot (anti-diagonal). Two of them invite a new project. */
const FILLERS = [3, 6, 9, 12]
const INVITES = [6, 9]

type Shot = { key: string; name: string; type?: string; url?: string; src: string; alt: string }
type Cell = { kind: 'shot'; shot: Shot } | { kind: 'invite' } | { kind: 'empty' }

function buildCells(projects: Project[]): Cell[] {
  const shots: Shot[] = projects.flatMap((p) =>
    p.images.map((img) => ({ key: img.src, name: p.name, type: p.type, url: p.url, ...img })),
  )
  const cells: Cell[] = []
  let s = 0
  for (let i = 0; i < TOTAL; i++) {
    if (FILLERS.includes(i) || s >= shots.length) {
      cells.push(INVITES.includes(i) ? { kind: 'invite' } : { kind: 'empty' })
    } else {
      cells.push({ kind: 'shot', shot: shots[s++] })
    }
  }
  return cells
}

/** 4-neighbourhood on the desktop 4x4 grid. */
function isNeighbour(i: number, active: number | null) {
  if (active === null || i === active) return false
  const sameRow = Math.floor(i / COLS) === Math.floor(active / COLS)
  return (sameRow && Math.abs(i - active) === 1) || Math.abs(i - active) === COLS
}

const cellBase =
  'group relative block min-h-[150px] overflow-hidden border-r border-b border-white/10 text-left outline-none lg:min-h-0'

/**
 * Full-screen "showroom": a black 4x4 grid with the website screenshots hidden
 * behind it. Hovering a cell reveals its screenshot and lights the neighbouring
 * cells a little; clicking opens the live site (when a url is set in lib/projects).
 * Red dots travel along the grid lines and light them up as they pass.
 */
export function GridShowroom({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<number | null>(null)
  const cells = buildCells(projects)

  return (
    <Dialog.Root onOpenChange={() => setActive(null)}>
      <Dialog.Trigger className="group inline-flex min-h-11 items-center justify-center gap-2 border border-primary px-5 py-2.5 text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-primary">
        <LayoutGrid className="size-4" aria-hidden />
        Enter the Grid
        <ArrowRight
          className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
          aria-hidden
        />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Content
          aria-describedby={undefined}
          className="data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 fixed inset-0 z-[100] flex flex-col bg-[#0c0c0c] duration-300"
        >
          <div className="flex h-14 shrink-0 items-center justify-between border-b border-white/10 px-5 sm:px-8">
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

          <div className="relative min-h-0 flex-1 overflow-y-auto lg:overflow-hidden">
            <ul
              className="grid grid-cols-2 border-l border-white/10 lg:h-full lg:grid-cols-4 lg:grid-rows-4"
              onMouseLeave={() => setActive(null)}
            >
              {cells.map((cell, i) => {
                const on = active === i
                const near = isNeighbour(i, active)
                const hoverProps = {
                  onMouseEnter: () => setActive(i),
                  onFocus: () => setActive(i),
                  onBlur: () => setActive(null),
                }

                if (cell.kind === 'empty') {
                  return (
                    <li key={i} className="contents">
                      <div className={cn(cellBase, near && 'bg-white/[0.03]')} aria-hidden>
                        <span
                          className={cn(
                            'pointer-events-none absolute inset-0 border transition-colors duration-300',
                            near ? 'border-white/25' : 'border-transparent',
                          )}
                        />
                      </div>
                    </li>
                  )
                }

                if (cell.kind === 'invite') {
                  return (
                    <li key={i} className="contents">
                      <Link
                        href="/contact"
                        {...hoverProps}
                        className={cn(
                          cellBase,
                          'flex flex-col items-center justify-center gap-3 transition-colors duration-300',
                          on ? 'bg-primary text-white' : 'text-muted-foreground',
                          near && 'bg-white/[0.03]',
                        )}
                      >
                        <Plus className="size-6" strokeWidth={1.5} aria-hidden />
                        <span className="font-sub text-xs font-bold tracking-[0.2em] uppercase">
                          Your website next
                        </span>
                      </Link>
                    </li>
                  )
                }

                const { shot } = cell
                const inner = (
                  <>
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      fill
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      className={cn(
                        'object-cover object-top transition-[opacity,transform] duration-500 [@media(hover:none)]:opacity-60',
                        on ? 'scale-105 opacity-100' : near ? 'opacity-[0.18]' : 'opacity-0',
                      )}
                    />
                    <span
                      className={cn(
                        'pointer-events-none absolute inset-0 border transition-colors duration-300',
                        on ? 'border-primary' : near ? 'border-white/25' : 'border-transparent',
                      )}
                    />
                    <span
                      className={cn(
                        'absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-black/90 to-transparent p-4 transition-opacity duration-300 [@media(hover:none)]:opacity-100',
                        on ? 'opacity-100' : 'opacity-0',
                      )}
                    >
                      <span>
                        <span className="font-sub block text-sm font-bold tracking-wide uppercase">
                          {shot.name}
                        </span>
                        <span className="block text-xs text-white/70">
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

                return (
                  <li key={i} className="contents">
                    {shot.url ? (
                      <a
                        href={shot.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${shot.name}: open live website in a new tab`}
                        className={cn(cellBase, on && 'z-10')}
                        {...hoverProps}
                      >
                        {inner}
                      </a>
                    ) : (
                      <div tabIndex={0} className={cn(cellBase, on && 'z-10')} {...hoverProps}>
                        {inner}
                      </div>
                    )}
                  </li>
                )
              })}
            </ul>

            {/* red dots travel the 4x4 grid lines and light them up (desktop) */}
            <div className="pointer-events-none absolute inset-0 hidden lg:block">
              <Comets count={2} cols={COLS} rows={TOTAL / COLS} speed={230} trail={260} bright />
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
