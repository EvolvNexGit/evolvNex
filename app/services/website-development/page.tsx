import { buildMetadata } from '@/lib/seo'
import { PROJECTS } from '@/lib/projects'
import { Container, Section } from '@/components/site/container'
import { PageHero } from '@/components/site/page-hero'
import { ButtonLink } from '@/components/site/button-link'
import { Reveal } from '@/components/site/reveal'
import { SectionHeading } from '@/components/site/section-heading'
import { FeatureList, ScopeNote } from '@/components/site/feature-list'
import { ProjectCard } from '@/components/site/project-card'
import { FAQ } from '@/components/site/faq'
import { CTA } from '@/components/site/cta'
import { TextLink } from '@/components/site/text-link'

export const metadata = buildMetadata({
  title: 'Business Website Development',
  description:
    'Responsive, SEO-ready business website development by EvolvNex: clear structure, custom design aligned to your brand, and integrations for forms, booking, CRM or WhatsApp.',
  path: '/services/website-development',
})

const faqs = [
  {
    q: 'Will my website show up on Google?',
    a: 'We build search-friendly foundations: clean structure, metadata, sitemap and fast pages. Rankings depend on many factors outside any developer’s control, so we do not promise positions.',
  },
  {
    q: 'Can the website connect to my CRM or WhatsApp?',
    a: 'Where supported, yes: forms, booking, CRM and WhatsApp integrations can be part of the build. We confirm what is possible for your case during scoping.',
  },
  {
    q: 'Who looks after hosting and updates?',
    a: 'This is confirmed per project. Tell us what you need and we will outline hosting, maintenance and what is included in the proposal.',
  },
]

export default function WebsiteDevelopmentPage() {
  const examples = PROJECTS.filter((p) => ['k-fitness', 'regain-clinic', '24k-springs-salon'].includes(p.slug))
  return (
    <>
      <PageHero
        crumbs={[
          { name: 'Services', href: '/services' },
          { name: 'Website development', href: '/services/website-development' },
        ]}
        eyebrow="Website development"
        title="Business websites that explain your offer and earn enquiries"
        lead="Many business websites look fine but do not say clearly what the business does or what to do next. We build responsive sites around your offer, your audience and a single clear next step."
      >
        <ButtonLink href="/contact" arrow>
          Discuss a Project
        </ButtonLink>
        <ButtonLink href="/work/websites" variant="secondary">
          See website work
        </ButtonLink>
      </PageHero>

      <Section>
        <Container className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              title="What a website project covers"
              description="The exact scope is agreed with you up front. Typical building blocks:"
            />
          </Reveal>
          <Reveal delay={0.08} className="space-y-6">
            <FeatureList
              columns={1}
              items={[
                'Clear information architecture, so visitors find what they need',
                'Custom design aligned with your brand',
                'Responsive layouts that work on phones first',
                'SEO-ready technical foundations: metadata, headings, sitemap, structured data',
                'Integrations such as forms, booking, CRM or WhatsApp, where supported',
              ]}
            />
            <ScopeNote>
              Pricing, timelines, hosting and maintenance are confirmed per project. We do not
              promise first-page rankings or guaranteed leads.
            </ScopeNote>
          </Reveal>
        </Container>
      </Section>

      <Section tone="surface">
        <Container>
          <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading title="Examples" description="A few websites we have built." />
            <ButtonLink href="/work/websites" variant="link" arrow>
              View all websites
            </ButtonLink>
          </Reveal>
          <ul className="mt-10 grid gap-8 md:grid-cols-3">
            {examples.map((p) => (
              <li key={p.slug}>
                <ProjectCard project={p} />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading title="Questions" />
          <div className="mt-8">
            <FAQ items={faqs} />
          </div>
          <p className="mt-10 text-muted-foreground">
            Need more than a website? See our{' '}
            <TextLink href="/crm">CRM and business systems</TextLink> or{' '}
            <TextLink href="/branding">branding</TextLink> work.
          </p>
        </Container>
      </Section>

      <CTA />
    </>
  )
}
