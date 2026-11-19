import { Container, Section } from '@/components/site/container'
import { ButtonLink } from '@/components/site/button-link'
import { Reveal } from '@/components/site/reveal'
import { SectionHeading } from '@/components/site/section-heading'
import { BrandReveal } from '@/components/brand/brand-reveal'
import { HOME_LAYOUT, resolveLayout } from '@/lib/brand-grid'

const tiles = resolveLayout(HOME_LAYOUT)

/** Compact homepage teaser for the brand identity grid. Full version lives on /branding. */
export function BrandTeaser() {
  return (
    <Section>
      <Container>
        <Reveal className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Brand identity"
            title="From idea to identity"
            description="Pull the tab and watch a brand come to life."
          />
          <ButtonLink href="/branding" variant="link" arrow>
            Explore Brand Identity
          </ButtonLink>
        </Reveal>
        <BrandReveal tiles={tiles} label="Brand identity preview: pull the tab to reveal colour" />
      </Container>
    </Section>
  )
}
