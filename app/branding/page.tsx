import { buildMetadata } from '@/lib/seo'
import { Container, Section } from '@/components/site/container'
import { PageHero } from '@/components/site/page-hero'
import { ButtonLink } from '@/components/site/button-link'
import { Reveal } from '@/components/site/reveal'
import { SectionHeading } from '@/components/site/section-heading'
import { FeatureList, ScopeNote } from '@/components/site/feature-list'
import { CTA } from '@/components/site/cta'
import { TextLink } from '@/components/site/text-link'

export const metadata = buildMetadata({
  title: 'Brand Identity & Branding Services',
  description:
    'EvolvNex helps founders and growing businesses build a consistent brand identity: visual direction, logo direction, colour and typography systems, and brand guidelines.',
  path: '/branding',
})

// TODO (business): confirm exact branding deliverables before publishing as final.
const deliverables = [
  'Brand discovery and positioning conversation',
  'Logo design and direction',
  'Visual identity, colour and typography systems',
  'Brand guidelines for consistent use',
  'Brand collateral applied across your website and materials',
]

export default function BrandingPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: 'Branding', href: '/branding' }]}
        eyebrow="Branding"
        title="Brand identity that keeps your business consistent and recognisable"
        lead="A brand is how your business looks, sounds and feels at every touchpoint. We help founders and growing teams build or refresh a visual identity they can use confidently."
      >
        <ButtonLink href="/contact" arrow>
          Discuss a Project
        </ButtonLink>
      </PageHero>

      <Section>
        <Container className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              title="Common signs a brand needs work"
              description="Branding is usually worth looking at when:"
            />
          </Reveal>
          <Reveal delay={0.08}>
            <FeatureList
              columns={1}
              items={[
                'Your logo, colours and fonts change from one place to the next',
                'Your website does not look like the same business as your social profiles',
                'Customers cannot tell what you stand for at a glance',
                'You are launching a business and need a starting identity',
              ]}
            />
          </Reveal>
        </Container>
      </Section>

      <Section tone="surface">
        <Container className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              title="What a branding project can include"
              description="We scope each project to what you actually need."
            />
          </Reveal>
          <Reveal delay={0.08} className="space-y-6">
            <FeatureList columns={1} items={deliverables} />
            <ScopeNote>
              Final deliverables are confirmed in your proposal. We only commit to what is
              agreed in writing.
            </ScopeNote>
          </Reveal>
        </Container>
      </Section>

      <Section>
        <Container>
          <Reveal>
            <p className="max-w-2xl text-lg text-muted-foreground">
              A consistent brand pairs naturally with a clear website. See our{' '}
              <TextLink href="/services/website-development">website development</TextLink>{' '}
              service or <TextLink href="/work/websites">recent website work</TextLink>.
            </p>
          </Reveal>
        </Container>
      </Section>

      <CTA title="Planning a brand or a refresh?" />
    </>
  )
}
