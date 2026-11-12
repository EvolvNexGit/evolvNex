/**
 * One fixed layer behind every page: a light grid. Sections stay transparent so it
 * reads as one uniform backdrop. Red dots only run in specific zones (see ZoneComets).
 */
export function SiteBackground() {
  return <div aria-hidden className="site-grid pointer-events-none fixed inset-0 -z-10" />
}
