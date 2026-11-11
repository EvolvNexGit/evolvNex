import { Container } from './container'
import { Breadcrumbs, type Crumb } from './breadcrumbs'

/** Standard interior-page header: breadcrumbs, single H1, lead, optional actions. */
export function PageHero({
  crumbs,
  eyebrow,
  title,
  lead,
  children,
}: {
  crumbs: Crumb[]
  eyebrow?: string
  title: string
  lead: string
  children?: React.ReactNode
}) {
  return (
    <header className="border-b border-border pt-10 pb-14 md:pt-16 md:pb-20">
      <Container>
        <Breadcrumbs items={crumbs} />
        {eyebrow && (
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-accent-text">
            {eyebrow}
          </p>
        )}
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{lead}</p>
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
      </Container>
    </header>
  )
}
