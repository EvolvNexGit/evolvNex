import { Globe, Palette, Workflow, Database, UtensilsCrossed, Stethoscope } from 'lucide-react'
import { buildMetadata } from '@/lib/seo'
import { PROJECTS, FEATURED_PROJECT_SLUGS } from '@/lib/projects'
import { Container, Section } from '@/components/site/container'
import { ButtonLink } from '@/components/site/button-link'
import { Reveal } from '@/components/site/reveal'
import { SectionHeading } from '@/components/site/section-heading'
import { ServiceCard } from '@/components/site/service-card'
import { ProjectCard } from '@/components/site/project-card'
import { IndustryPanel } from '@/components/site/industry-panel'
import { FeatureList, ScopeNote } from '@/components/site/feature-list'
import { CTA } from '@/components/site/cta'

export const metadata = buildMetadata({
  title: 'EvolvNex | Websites, Branding, CRM & Business Automation',
  description:
    'EvolvNex builds business websites, brand identities, custom CRM and business systems, and workflow automation for growing businesses, delivered remotely.',
  path: '/',
})

const capabilities = [
  'Website development',
  'Brand identity',
  'Custom CRM & business systems',
  'WhatsApp & workflow automation',
  'SEO-ready foundations',
  'Remote delivery',
]

const services = [
  {
    icon: Globe,
    title: 'Websites',
    description:
      'Responsive business websites that explain what you offer and turn visits into enquiries, bookings or sales.',
    href: '/services/website-development',
  },
  {
    icon: Palette,
    title: 'Branding',
    description:
      'Brand identity and visual direction that make your business consistent and recognisable.',
    href: '/branding',
  },
  {
    icon: Database,
    title: 'CRM & Business Systems',
    description:
      'Purpose-built tools for customers, appointments, transactions, products, staff and daily workflows.',
    href: '/crm',
  },
  {
    icon: Workflow,
    title: 'Automation',
    description:
      'Consent-aware WhatsApp reminders, follow-ups and workflow automation that cut repetitive work.',
    href: '/services#automation',
  },
]

const steps = [
  { n: '01', title: 'Discover', text: 'We learn how your business works, who you serve and what is slowing you down.' },
  { n: '02', title: 'Plan', text: 'We agree scope, structure and what gets built first, so nothing is vague.' },
  { n: '03', title: 'Build', text: 'We design and develop in reviewable stages, with your feedback along the way.' },
  { n: '04', title: 'Improve', text: 'After launch we refine what is working and fix what is not.' },
]

export default function HomePage() {
  const featured = FEATURED_PROJECT_SLUGS.map((s) => PROJECTS.find((p) => p.slug === s)!).filter(Boolean)

  return (
    <>
      {/* 1. Hero */}
      <section className="border-b border-border py-20 md:py-32">
        <Container>
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.14em] text-accent-text">
            Business technology partner
          </p>
          <h1 className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
            Digital systems that help businesses move forward.
          </h1>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              EvolvNex builds business websites, brand identities, custom CRM systems and
              automation workflows that help teams present their business, manage daily
              operations and stay connected with customers.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/contact" arrow>
                Discuss a Project
              </ButtonLink>
              <ButtonLink href="/work/websites" variant="secondary">
                Explore Our Work
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* 2. Capabilities strip (text only: no invented logos or metrics) */}
      <section aria-label="Capabilities" className="border-b border-border bg-card">
        <Container>
          <ul className="flex flex-wrap gap-x-8 gap-y-3 py-5 text-sm text-muted-foreground">
            {capabilities.map((c) => (
              <li key={c} className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-primary" aria-hidden />
                {c}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 3. What we build */}
      <Section>
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="What we build"
              title="A practical digital foundation for your business"
              description="Four focused areas. Start with one, or combine them as your business grows."
            />
          </Reveal>
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.06}>
                <ServiceCard {...s} />
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* 4. Selected websites */}
      <Section tone="surface">
        <Container>
          <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Selected websites"
              title="Recent website work"
              description="Websites we have built for salons, fitness studios and clinics."
            />
            <ButtonLink href="/work/websites" variant="link" arrow>
              View all websites
            </ButtonLink>
          </Reveal>
          <ul className="mt-12 grid gap-8 md:grid-cols-3">
            {featured.map((p, i) => (
              <Reveal as="li" key={p.slug} delay={i * 0.06}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* 5. CRM spotlight */}
      <Section>
        <Container className="grid items-start gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              eyebrow="CRM & business systems"
              title="Software shaped around how your business actually runs"
              description="Instead of forcing your workflow into generic software, we build or configure tools for the way you take bookings, bill customers and follow up."
            />
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              <ButtonLink href="/crm" variant="link" arrow>
                CRM overview
              </ButtonLink>
              <ButtonLink href="/crm/food" variant="link" arrow>
                Food &amp; Beverage CRM
              </ButtonLink>
              <ButtonLink href="/crm/healthcare" variant="link" arrow>
                Healthcare CRM
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="space-y-6">
            <FeatureList
              columns={1}
              items={[
                'Customer records and purchase or visit history',
                'Appointments, billing and product management',
                'Reminders and follow-ups, including WhatsApp where consent is in place',
                'Staff workflows and reporting, scoped to what you need',
              ]}
            />
            <ScopeNote>
              Exact modules are confirmed per project. We state clearly whether something is
              custom-built, configured or integrated before work begins.
            </ScopeNote>
          </Reveal>
        </Container>
      </Section>

      {/* 6. How we work */}
      <Section tone="surface">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="How we work"
              title="A simple, transparent process"
              description="Remote-first delivery with clear stages, so you always know what happens next."
            />
          </Reveal>
          <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.n} delay={i * 0.06} className="border-t border-border pt-5">
                <span className="text-sm font-semibold text-accent-text">{s.n}</span>
                <h3 className="mt-2 text-xl font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-muted-foreground">{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* 7. Industries */}
      <Section>
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Industries"
              title="Systems for food businesses and clinics"
              description="Two areas where day-to-day workflows benefit most from purpose-built software."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <Reveal>
              <IndustryPanel
                icon={UtensilsCrossed}
                title="Food & Beverage"
                description="For cafés, restaurants and food businesses that want billing, stock and customers in one place."
                points={[
                  'Billing and POS workflows',
                  'Products, inventory and transactions',
                  'Customers, memberships and loyalty',
                ]}
                href="/crm/food"
                cta="Explore Food CRM"
              />
            </Reveal>
            <Reveal delay={0.08}>
              <IndustryPanel
                icon={Stethoscope}
                title="Healthcare"
                description="Administrative workflow support for clinics and healthcare providers."
                points={[
                  'Patient information and appointments',
                  'Follow-up tracking and reminders',
                  'Clinic enquiry management',
                ]}
                href="/crm/healthcare"
                cta="Explore Healthcare CRM"
              />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* 8. CTA */}
      <CTA />
    </>
  )
}
