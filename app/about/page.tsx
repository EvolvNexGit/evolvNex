import { buildMetadata } from '@/lib/seo'
import { Container, Section } from '@/components/site/container'
import { PageHero } from '@/components/site/page-hero'
import { ButtonLink } from '@/components/site/button-link'
import { Reveal } from '@/components/site/reveal'
import { SectionHeading } from '@/components/site/section-heading'
import { CTA } from '@/components/site/cta'
import { TextLink } from '@/components/site/text-link'

export const metadata = buildMetadata({
  title: 'About EvolvNex',
  description:
    'EvolvNex is a remote-first business technology company building websites, brand identities, custom CRM systems and automation for growing businesses.',
  path: '/about',
})

const principles = [
  {
    title: 'Practical over flashy',
    text: 'We build what helps your business present itself, run daily operations and handle enquiries, not features for their own sake.',
  },
  {
    title: 'Honest about scope',
    text: 'We say plainly what is custom-built, configured or integrated, and what we cannot promise. No invented numbers or guarantees.',
  },
  {
    title: 'Built in stages',
    text: 'Work is delivered in reviewable steps so you can give feedback early instead of discovering problems at the end.',
  },
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: 'About', href: '/about' }]}
        eyebrow="About"
        title="A business technology partner, not just a website developer"
        lead="EvolvNex helps businesses build a stronger digital foundation through websites, brand identity, custom CRM and business management systems, and workflow automation."
      />

      <Section>
        <Container className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeading title="What we do" />
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              We focus on practical systems that improve how a business presents itself, manages
              operations, handles enquiries and supports growth. That can start with a{' '}
              <TextLink href="/services/website-development">website</TextLink>, a{' '}
              <TextLink href="/branding">brand identity</TextLink>, or a{' '}
              <TextLink href="/crm">CRM and business system</TextLink>, and grow from there.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <SectionHeading title="How we deliver" />
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              EvolvNex is a remote-first team. We work with clients online through calls, chat and
              shared progress updates, so there is no need to meet in person.
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section tone="surface">
        <Container>
          <Reveal>
            <SectionHeading title="How we approach work" />
          </Reveal>
          <ul className="mt-10 grid gap-8 md:grid-cols-3">
            {principles.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 0.06} className="border-t border-border pt-5">
                <h3 className="text-xl font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-2 text-muted-foreground">{p.text}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container>
          <Reveal className="flex flex-wrap gap-3">
            <ButtonLink href="/contact" arrow>
              Discuss a Project
            </ButtonLink>
            <ButtonLink href="/work/websites" variant="secondary">
              Explore Our Work
            </ButtonLink>
          </Reveal>
        </Container>
      </Section>

      <CTA />
    </>
  )
}
