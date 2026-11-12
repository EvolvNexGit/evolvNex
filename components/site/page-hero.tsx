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
    <header className="border-b border-border pt-8 pb-10 md:pt-12 md:pb-14">
      <Container>
        <Breadcrumbs items={crumbs} />
        {eyebrow && (
          <p className="eyebrow mb-3">{eyebrow}</p>
        )}
        <h1 className="max-w-3xl text-3xl leading-tight uppercase sm:text-[2.75rem]">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{lead}</p>
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
      </Container>
    </header>
  )
}
