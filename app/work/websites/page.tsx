import { buildMetadata } from '@/lib/seo'
import { PROJECTS } from '@/lib/projects'
import { Container, Section } from '@/components/site/container'
import { PageHero } from '@/components/site/page-hero'
import { ButtonLink } from '@/components/site/button-link'
import { Reveal } from '@/components/site/reveal'
import { ProjectCard } from '@/components/site/project-card'
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
        lead="A selection of business websites designed and developed by EvolvNex. Select any project to view its screenshots."
      >
        <ButtonLink href="/contact" arrow>
          Discuss a Project
        </ButtonLink>
      </PageHero>

      <Section>
        <Container>
          <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((p, i) => (
              <Reveal as="li" key={p.slug} delay={(i % 3) * 0.05}>
                <ProjectCard project={p} priority={i < 3} />
              </Reveal>
            ))}
          </ul>
          <p className="mt-14 max-w-2xl text-sm text-muted-foreground">
            Project details such as scope and live links are shared on request. Want something
            similar? Read about our{' '}
            <TextLink href="/services/website-development">website development service</TextLink>.
          </p>
        </Container>
      </Section>

      <CTA title="Want a website like these?" />
    </>
  )
}
