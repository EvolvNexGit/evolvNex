'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useReducedMotion } from 'framer-motion'
import { CometDot, useComets } from './use-comets'

const CELL = 64 // must match .site-grid background-size

/**
 * Red dots that travel along the fixed site-wide background grid, visible only
 * inside the parent element (which must be positioned). The dots live in a fixed
 * layer (so they stay exactly on the background lines while the page scrolls),
 * clipped to the parent's on-screen rectangle every frame.
 */
export function ZoneComets({ count = 2, speed = 140, trail = 110 }: { count?: number; speed?: number; trail?: number }) {
  const sentinel = useRef<HTMLSpanElement>(null)
  const layer = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => setMounted(true), [])

  const els = useComets({
    count,
    enabled: mounted && !reduce,
    speed,
    trail,
    cell: () => ({ w: CELL, h: CELL }),
    area: () => {
      const r = sentinel.current?.getBoundingClientRect()
      if (!r) return null
      const top = Math.max(0, r.top)
      const bottom = Math.min(window.innerHeight, r.bottom)
      const left = Math.max(0, r.left)
      const right = Math.min(window.innerWidth, r.right)
      if (bottom - top < 80 || right - left < 80) return null
      return { x: left, y: top, w: right - left, h: bottom - top }
    },
    onTick: () => {
      const r = sentinel.current?.getBoundingClientRect()
      if (!r || !layer.current) return
      const vw = window.innerWidth
      const vh = window.innerHeight
      const c = (v: number, max: number) => Math.min(max, Math.max(0, v))
      layer.current.style.clipPath = `inset(${c(r.top, vh)}px ${c(vw - r.right, vw)}px ${c(vh - r.bottom, vh)}px ${c(r.left, vw)}px)`
    },
  })

  return (
    <>
      <span ref={sentinel} aria-hidden className="pointer-events-none absolute inset-0" />
      {mounted &&
        !reduce &&
        createPortal(
          <div
            ref={layer}
            aria-hidden
            className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
            style={{ clipPath: 'inset(100%)' }}
          >
            {Array.from({ length: count }, (_, i) => (
              <CometDot key={i} trail={trail} setRef={(el) => (els.current[i] = el)} />
            ))}
          </div>,
          document.body,
        )}
    </>
  )
}
