import Link from 'next/link'
import { Globe, Palette, Database, Workflow, Search } from 'lucide-react'
import { buildMetadata } from '@/lib/seo'
import { Container, Section } from '@/components/site/container'
import { PageHero } from '@/components/site/page-hero'
import { ButtonLink } from '@/components/site/button-link'
import { Reveal } from '@/components/site/reveal'
import { SectionHeading } from '@/components/site/section-heading'
import { FeatureList, ScopeNote } from '@/components/site/feature-list'
import { FAQ } from '@/components/site/faq'
import { CTA } from '@/components/site/cta'

export const metadata = buildMetadata({
  title: 'Website Development, Branding, CRM & Automation Services',
  description:
    'Services from EvolvNex: business website development, brand identity, custom CRM and business systems, WhatsApp and workflow automation, and SEO-ready foundations.',
  path: '/services',
})

const services = [
  {
    id: 'websites',
    icon: Globe,
    title: 'Website development',
    text: 'Responsive business websites that explain your offer clearly, build trust and turn visits into enquiries, bookings or sales.',
    points: [
      'Clear information architecture',
      'Custom design aligned to your brand',
      'Mobile-first, fast-loading build',
      'Forms, booking, CRM or WhatsApp integrations where supported',
    ],
    href: '/services/website-development',
    cta: 'Website development',
  },
  {
    id: 'branding',
    icon: Palette,
    title: 'Branding',
    text: 'Brand identity and visual direction that make a business consistent and recognisable across its website and customer experience.',
    points: ['Visual identity and logo direction', 'Colour and typography systems', 'Brand guidelines'],
    href: '/branding',
    cta: 'Branding',
  },
  {
    id: 'crm',
    icon: Database,
    title: 'Custom CRM & business systems',
    text: 'Purpose-built tools for customers, appointments, transactions, products, staff and daily workflows, including dedicated systems for food businesses and clinics.',
    points: ['Customer and transaction records', 'Industry workflows for food and healthcare', 'Reporting scoped to your needs'],
    href: '/crm',
    cta: 'CRM & business systems',
  },
  {
    id: 'automation',
    icon: Workflow,
    title: 'WhatsApp & workflow automation',
    text: 'Consent-aware reminders, communication and follow-up workflows that reduce repetitive manual work.',
    points: ['Appointment and follow-up reminders', 'Lead follow-up workflows', 'Opt-in and opt-out handling'],
    href: '/contact',
    cta: 'Discuss automation',
  },
  {
    id: 'seo',
    icon: Search,
    title: 'SEO foundations',
    text: 'Search-friendly site structure and content foundations that improve how clearly your business can be found and understood. We build the foundation; we do not promise rankings.',
    points: ['Clean page structure and metadata', 'Sitemap, canonical URLs and structured data', 'Fast, accessible pages'],
    href: '/services/website-development',
    cta: 'Included with websites',
  },
]

const faqs = [
  {
    q: 'Do you only build websites?',
    a: 'No. Websites are one part of what we do. We also work on brand identity, custom CRM and business systems, and workflow automation, so your presence and your operations can work together.',
  },
  {
    q: 'How do you work with clients?',
    a: 'We work remotely. After an initial conversation we agree scope, build in reviewable stages and share progress as we go.',
  },
  {
    q: 'What does it cost and how long does it take?',
    a: 'It depends on scope. We prefer to understand your requirement first and then share a clear proposal, rather than quote generic packages. Use the contact page to start that conversation.',
  },
  {
    q: 'Is every CRM feature ready to use off the shelf?',
    a: 'Not necessarily. Depending on the feature, a solution may be custom-built, configured or integrated. We confirm which applies to your project before work begins.',
  },
]

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: 'Services', href: '/services' }]}
        eyebrow="Services"
        title="Website development, branding, CRM and automation"
        lead="Practical systems that improve how your business presents itself, manages operations, handles enquiries and supports growth."
      >
        <ButtonLink href="/contact" arrow>
          Discuss a Project
        </ButtonLink>
      </PageHero>

      <Section>
        <Container className="space-y-16">
          {services.map((s) => (
            <Reveal key={s.id}>
              <section id={s.id} className="grid gap-8 border-t border-border pt-10 lg:grid-cols-[1fr_1.2fr]">
                <div>
                  <s.icon className="size-8 text-accent-text" strokeWidth={1.5} aria-hidden />
                  <h2 className="mt-5 text-2xl font-semibold tracking-tight sm:text-3xl">{s.title}</h2>
                  <p className="mt-3 text-muted-foreground">{s.text}</p>
                </div>
                <div className="space-y-6">
                  <FeatureList columns={1} items={s.points} />
                  <Link
                    href={s.href}
                    className="inline-flex text-sm font-semibold text-accent-text hover:text-foreground"
                  >
                    {s.cta} →
                  </Link>
                </div>
              </section>
            </Reveal>
          ))}
          <ScopeNote>
            Deliverables are confirmed in writing for each project. We do not promise search
            rankings, guaranteed leads or fixed conversion lifts.
          </ScopeNote>
        </Container>
      </Section>

      <Section tone="surface">
        <Container>
          <SectionHeading title="Common questions" />
          <div className="mt-8">
            <FAQ items={faqs} />
          </div>
        </Container>
      </Section>

      <CTA />
    </>
  )
}
