/**
 * Brand identity grid: tile catalogue + art-directed layouts.
 *
 * HOW TO EDIT
 *  - Swap an image: change `src` (and `monoSrc` for hidden-logo tiles). Same tile id,
 *    same crop fields, the grid never needs touching.
 *  - Re-crop: `focus` is the point of the picture that stays centred ([x, y], 0..1),
 *    `zoom` magnifies around it (1 = plain cover crop).
 *  - Rearrange / resize: edit the ASCII maps at the bottom. One character = one cell,
 *    one letter = one tile id. A tile's span is simply the rectangle its letter fills.
 *    `.` leaves a deliberate empty cell. tests/brand-grid.test.ts validates the maps.
 *
 * The reveal needs no per-tile data: every tile gets the same global boundary.
 */

export type BrandId =
  | 'aurvia'
  | 'bohka'
  | 'nuvora'
  | 'monogram'
  | 'velora'
  | 'vibrantix'
  | 'zayra'

/** Optional back face (brand page, desktop hover / mobile tap). Two short lines max. */
export type FlipNote = { line1: string; line2: string }

type TileBase = {
  /** Single character, referenced by the layout maps. */
  id: string
  brand: BrandId
  /** Accessibility description of the finished (colour) artwork. */
  alt: string
  flip?: FlipNote
  /** Load eagerly (use for at most one tile near the top of a page). */
  priority?: boolean
}

export type ImageTile = TileBase & {
  kind: 'image'
  src: string
  /**
   * Prepared monochrome asset. Only for "hidden brand" tiles: the logo is retouched out
   * so the colour reveal genuinely adds it. Everything else reuses `src` with a CSS
   * grayscale filter (one download, perfect alignment).
   */
  monoSrc?: string
  focus?: [number, number]
  zoom?: number
}

export type PaletteTile = TileBase & {
  kind: 'palette'
  swatches: { name: string; hex: string; light?: boolean }[]
}

export type TypeTile = TileBase & {
  kind: 'type'
  specimen: string
  lines: [string, string]
}

export type BrandTile = ImageTile | PaletteTile | TypeTile

const IMG = '/images/brand'

const tiles: BrandTile[] = [
  {
    id: 'A',
    kind: 'image',
    brand: 'aurvia',
    src: `${IMG}/aurvia.jpg`,
    alt: 'Aurvia Natural Wellness: logo beside a black gift box wrapped in flowing coral, pink and teal leaf artwork.',
    priority: true,
  },
  {
    id: 'Z',
    kind: 'image',
    brand: 'zayra',
    src: `${IMG}/zayra.jpg`,
    monoSrc: `${IMG}/zayra-mono.jpg`,
    focus: [0.5, 0.55],
    alt: 'Zayra canvas tote bag hanging on a wooden chair, printed with a woman in profile among red lilies and green leaves.',
    flip: { line1: 'A logo is only the beginning.', line2: 'We built a visual language around it.' },
  },
  {
    id: 'L',
    kind: 'image',
    brand: 'monogram',
    src: `${IMG}/monogram.jpg`,
    alt: 'Cream wave-shaped N monogram foil-stamped on deep green card.',
  },
  {
    id: 'B',
    kind: 'image',
    brand: 'bohka',
    src: `${IMG}/bohka.jpg`,
    monoSrc: `${IMG}/bohka-mono.jpg`,
    focus: [0.58, 0.5],
    alt: 'Bohka Coffee Co. paper cup and kraft coffee bag with coral, forest green and line-art arch patterns.',
    flip: { line1: 'Not just packaging.', line2: 'A complete brand experience.' },
  },
  {
    id: 'P',
    kind: 'palette',
    brand: 'bohka',
    alt: 'Bohka colour palette: ember, forest, paper, blush and ink.',
    swatches: [
      { name: 'Ember', hex: '#E8412A' },
      { name: 'Forest', hex: '#14463C' },
      { name: 'Paper', hex: '#F3EADB', light: true },
      { name: 'Blush', hex: '#F2B5BD', light: true },
      { name: 'Ink', hex: '#17181C' },
    ],
  },
  {
    id: 'C',
    kind: 'image',
    brand: 'monogram',
    src: `${IMG}/cap.jpg`,
    focus: [0.45, 0.5],
    alt: 'Forest green baseball cap with a cream N monogram and cream piping.',
  },
  {
    id: 'T',
    kind: 'type',
    brand: 'vibrantix',
    alt: 'Vibrantix type specimen: a bold geometric Aa with the line Feel the Sound, Live the Vibe.',
    specimen: 'Aa',
    lines: ['Feel the Sound', 'Live the Vibe'],
  },
  {
    id: 'V',
    kind: 'image',
    brand: 'velora',
    src: `${IMG}/velora.jpg`,
    focus: [0.5, 0.5],
    alt: 'Velora tea packaging: an embossed black box beside a box printed with tropical leaves and a red hibiscus.',
    flip: { line1: 'Every detail carries the identity.', line2: 'From the label to the last impression.' },
  },
  {
    id: 'X',
    kind: 'image',
    brand: 'vibrantix',
    src: `${IMG}/vibrantix.jpg`,
    focus: [0.9, 0.5],
    alt: 'Vibrantix wireless headphones with patterned ear cups, standing beside their orange and purple retail box.',
  },
  {
    id: 'N',
    kind: 'image',
    brand: 'nuvora',
    src: `${IMG}/nuvora-chair.jpg`,
    focus: [0.62, 0.55],
    alt: 'Nuvora olive boucle lounge chair with a bronze base, in warm sunlight against a green arch.',
    flip: { line1: 'Made to be recognised.', line2: 'Designed to live beyond the screen.' },
  },
  // Close-ups: same artwork, tighter crops (details, finishes, applications)
  {
    id: 'z',
    kind: 'image',
    brand: 'zayra',
    src: `${IMG}/zayra.jpg`,
    focus: [0.66, 0.62],
    zoom: 2,
    alt: 'Close-up of the Zayra tote print: a woman in profile with a gold earring, painted in flat shapes.',
  },
  {
    id: 'b',
    kind: 'image',
    brand: 'bohka',
    src: `${IMG}/bohka.jpg`,
    focus: [0.75, 0.28],
    zoom: 2.4,
    alt: 'Close-up of fine line-art arches printed on the Bohka kraft coffee bag.',
  },
  {
    id: 'a',
    kind: 'image',
    brand: 'aurvia',
    src: `${IMG}/aurvia.jpg`,
    focus: [0.56, 0.2],
    zoom: 2.6,
    alt: 'Close-up of the layered coral, magenta and amber leaf artwork on the Aurvia box.',
  },
  {
    id: 'W',
    kind: 'image',
    brand: 'nuvora',
    src: `${IMG}/nuvora-chair.jpg`,
    focus: [0.22, 0.3],
    zoom: 1.7,
    alt: 'Nuvora wordmark with its twin-leaf symbol and the line Live Beautifully.',
  },
  {
    id: 'n',
    kind: 'image',
    brand: 'nuvora',
    src: `${IMG}/nuvora-chair.jpg`,
    focus: [0.81, 0.64],
    zoom: 3.4,
    alt: 'Close-up of the Nuvora leaf emblem inlaid in the brushed bronze chair base.',
  },
  {
    id: 'x',
    kind: 'image',
    brand: 'vibrantix',
    src: `${IMG}/vibrantix.jpg`,
    focus: [0.23, 0.36],
    zoom: 2.4,
    alt: 'Close-up of the Vibrantix sound-wave logo and tagline on the box.',
  },
]

export const BRAND_TILES: Record<string, BrandTile> = Object.fromEntries(
  tiles.map((t) => [t.id, t]),
)

/* ----------------------------- layouts ----------------------------- */

export type Breakpoint = 'sm' | 'md' | 'lg'
export type LayoutMaps = Record<Breakpoint, string[]>
export type Placement = { col: number; row: number; w: number; h: number }

export const GRID_COLS: Record<Breakpoint, number> = { sm: 6, md: 8, lg: 12 }

/** Turn an ASCII map into one rectangle per tile id. Throws on malformed maps. */
export function parseLayout(rows: string[], cols: number): Record<string, Placement> {
  const found: Record<string, { c0: number; c1: number; r0: number; r1: number; n: number }> = {}
  rows.forEach((row, r) => {
    if (row.length !== cols) {
      throw new Error(`Layout row ${r + 1} has ${row.length} cells, expected ${cols}: "${row}"`)
    }
    for (let c = 0; c < cols; c++) {
      const id = row[c]
      if (id === '.') continue
      const f = found[id]
      if (!f) found[id] = { c0: c, c1: c, r0: r, r1: r, n: 1 }
      else {
        f.c0 = Math.min(f.c0, c)
        f.c1 = Math.max(f.c1, c)
        f.r0 = Math.min(f.r0, r)
        f.r1 = Math.max(f.r1, r)
        f.n++
      }
    }
  })
  const out: Record<string, Placement> = {}
  for (const [id, f] of Object.entries(found)) {
    const w = f.c1 - f.c0 + 1
    const h = f.r1 - f.r0 + 1
    if (w * h !== f.n) throw new Error(`Tile "${id}" is not a solid rectangle`)
    out[id] = { col: f.c0 + 1, row: f.r0 + 1, w, h }
  }
  return out
}

export type ResolvedTile = {
  tile: BrandTile
  place: Record<Breakpoint, Placement>
}

/** Pair each tile with its placement at every breakpoint (order = first appearance, large screens). */
export function resolveLayout(
  layout: LayoutMaps,
  catalogue: Record<string, BrandTile> = BRAND_TILES,
): ResolvedTile[] {
  const place = {
    sm: parseLayout(layout.sm, GRID_COLS.sm),
    md: parseLayout(layout.md, GRID_COLS.md),
    lg: parseLayout(layout.lg, GRID_COLS.lg),
  }
  const ids = Object.keys(place.lg)
  for (const bp of ['sm', 'md'] as const) {
    const missing = ids.filter((id) => !place[bp][id])
    const extra = Object.keys(place[bp]).filter((id) => !place.lg[id])
    if (missing.length || extra.length) {
      throw new Error(`Layout "${bp}" tile set differs from "lg" (missing ${missing}, extra ${extra})`)
    }
  }
  return ids.map((id) => {
    const tile = catalogue[id]
    if (!tile) throw new Error(`Layout references unknown tile "${id}"`)
    return { tile, place: { sm: place.sm[id], md: place.md[id], lg: place.lg[id] } }
  })
}

/** Homepage teaser: 7 standout applications, three recompositions. */
export const HOME_LAYOUT: LayoutMaps = {
  lg: [
    'ZZZZAAAAALLL',
    'ZZZZAAAAALLL',
    'ZZZZAAAAALLL',
    'ZZZZBBBCCLLL',
    'NNNNBBBCCXXX',
    'NNNNBBBCCXXX',
  ],
  md: [
    'ZZZZAAAA',
    'ZZZZAAAA',
    'ZZZZCCLL',
    'ZZZZCCLL',
    'BBBBNNNN',
    'BBBBNNNN',
    'BBBBXXXX',
    'BBBBXXXX',
  ],
  sm: [
    'ZZZZLL',
    'ZZZZLL',
    'ZZZZLL',
    'ZZZZLL',
    'AAAACC',
    'AAAACC',
    'AAAACC',
    'BBBBXX',
    'BBBBXX',
    'BBBBNN',
    'BBBBNN',
  ],
}

/** Dedicated brand page: the full studio wall (hero tiles, details, palettes, type). */
export const BRAND_LAYOUT: LayoutMaps = {
  lg: [
    'AAAAAAAZZZZZ',
    'AAAAAAAZZZZZ',
    'AAAAAAAZZZZZ',
    'AAAAAAAZZZZZ',
    'AAAAAAAZZZZZ',
    'LLLBBBBZZZZZ',
    'LLLBBBBPPCCC',
    'LLLBBBBPPCCC',
    'LLLBBBBPPCCC',
    'TTVVVVVVVXXX',
    'TTVVVVVVVXXX',
    'TTVVVVVVVXXX',
    'TTVVVVVVVXXX',
    'zzzNNNNNNbbb',
    'zzzNNNNNNbbb',
    'zzzNNNNNNaaa',
    'zzzNNNNNNaaa',
    'nnWWWWWWWWxx',
    'nnWWWWWWWWxx',
  ],
  md: [
    'AAAAAZZZ',
    'AAAAAZZZ',
    'AAAAAZZZ',
    'AAAAAZZZ',
    'LLBBBCCC',
    'LLBBBCCC',
    'LLBBBCCC',
    'PPPPTTTT',
    'PPPPTTTT',
    'VVVVVXXX',
    'VVVVVXXX',
    'VVVVVXXX',
    'VVVVVXXX',
    'NNNNNzzz',
    'NNNNNzzz',
    'NNNNNzzz',
    'NNNNNzzz',
    'bbaaWWWW',
    'bbaaWWWW',
    'nnnnxxxx',
    'nnnnxxxx',
  ],
  sm: [
    'AAAAAA',
    'AAAAAA',
    'AAAAAA',
    'AAAAAA',
    'ZZZZLL',
    'ZZZZLL',
    'ZZZZLL',
    'ZZZZLL',
    'ZZZZLL',
    'BBBCCC',
    'BBBCCC',
    'BBBCCC',
    'PPPPPP',
    'PPPPPP',
    'TTVVVV',
    'TTVVVV',
    'TTVVVV',
    'XXXXXX',
    'XXXXXX',
    'XXXXXX',
    'NNNNNN',
    'NNNNNN',
    'NNNNNN',
    'NNNNNN',
    'zzzbbb',
    'zzzbbb',
    'zzzbbb',
    'WWWWWW',
    'WWWWWW',
    'aannxx',
    'aannxx',
  ],
}
