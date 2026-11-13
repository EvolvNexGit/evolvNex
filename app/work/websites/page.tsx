import { buildMetadata } from '@/lib/seo'
import { PROJECTS } from '@/lib/projects'
import { Container, Section } from '@/components/site/container'
import { PageHero } from '@/components/site/page-hero'
import { ButtonLink } from '@/components/site/button-link'
import { GridShowroom } from '@/components/site/grid-showroom'
import { CTA } from '@/components/site/cta'
import { TextLink } from '@/components/site/text-link'

export const metadata = buildMetadata({
  title: 'Website Showcase: Salon, Fitness & Clinic Websites',
  description:
    'Examples of business websites built by EvolvNex for salons, fitness studios, clinics and other local businesses. Select a project to view screenshots.',
  path: '/work/websites',
})

export default function WebsiteShowcasePage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: 'Website showcase', href: '/work/websites' }]}
        eyebrow="Website showcase"
        title="Websites we have built"
        lead="A selection of business websites designed and developed by EvolvNex. Enter the grid and hover to reveal each one."
      >
        <GridShowroom projects={PROJECTS} />
        <ButtonLink href="/contact" variant="secondary" arrow>
          Discuss a Project
        </ButtonLink>
      </PageHero>

      <Section>
        <Container>
          <p className="max-w-xl text-muted-foreground">
            Project details and live links are shared on request. Want something similar? Explore
            our <TextLink href="/services/website-development">website development service</TextLink>.
          </p>
        </Container>
      </Section>

      <CTA title="Want a website like these?" />
    </>
  )
}
