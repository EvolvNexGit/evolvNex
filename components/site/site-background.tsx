import { Comets } from './comets'

/**
 * One fixed layer behind every page: a light grid with two red dots travelling
 * along its lines. Sections stay transparent so it reads as one uniform backdrop.
 */
export function SiteBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <div className="site-grid absolute inset-0" />
      <Comets count={2} cell={64} />
    </div>
  )
}
