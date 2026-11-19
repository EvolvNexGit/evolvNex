import { describe, it, expect } from 'vitest'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import {
  BRAND_LAYOUT,
  BRAND_TILES,
  GRID_COLS,
  HOME_LAYOUT,
  parseLayout,
  resolveLayout,
  type Breakpoint,
  type LayoutMaps,
} from '@/lib/brand-grid'

const layouts: [string, LayoutMaps][] = [
  ['home', HOME_LAYOUT],
  ['brand page', BRAND_LAYOUT],
]

describe('parseLayout', () => {
  it('derives spans from solid rectangles', () => {
    expect(parseLayout(['AAB', 'AAB', 'CCB'], 3)).toEqual({
      A: { col: 1, row: 1, w: 2, h: 2 },
      B: { col: 3, row: 1, w: 1, h: 3 },
      C: { col: 1, row: 3, w: 2, h: 1 },
    })
  })
  it('rejects L-shaped tiles and ragged rows', () => {
    expect(() => parseLayout(['AB', 'AA'], 2)).toThrow(/solid rectangle/)
    expect(() => parseLayout(['AAA', 'AA'], 3)).toThrow(/cells/)
  })
})

describe.each(layouts)('%s layout', (_name, layout) => {
  it.each(['sm', 'md', 'lg'] as Breakpoint[])('%s: valid map with no empty cells', (bp) => {
    expect(() => parseLayout(layout[bp], GRID_COLS[bp])).not.toThrow()
    expect(layout[bp].join('')).not.toContain('.')
  })

  it('uses the same tiles at every breakpoint and only known tiles', () => {
    const resolved = resolveLayout(layout)
    expect(resolved.length).toBeGreaterThan(0)
  })

  it('points every image at a file that exists in /public', () => {
    for (const { tile } of resolveLayout(layout)) {
      if (tile.kind !== 'image') continue
      for (const src of [tile.src, tile.monoSrc].filter(Boolean) as string[]) {
        expect(existsSync(join(process.cwd(), 'public', src)), src).toBe(true)
      }
    }
  })

  it('keeps flip notes to two short lines', () => {
    for (const { tile } of resolveLayout(layout)) {
      if (!tile.flip) continue
      expect(tile.flip.line1.length).toBeLessThanOrEqual(48)
      expect(tile.flip.line2.length).toBeLessThanOrEqual(48)
    }
  })
})

describe('catalogue', () => {
  it('has one-character, matching ids and accessibility text', () => {
    for (const [key, tile] of Object.entries(BRAND_TILES)) {
      expect(key).toBe(tile.id)
      expect(tile.id).toHaveLength(1)
      expect(tile.alt.length).toBeGreaterThan(10)
    }
  })
})
