import { buildMetadata } from '@/lib/seo'
import { Container, Section } from '@/components/site/container'
import { PageHero } from '@/components/site/page-hero'
import { ButtonLink } from '@/components/site/button-link'
import { ScopeNote } from '@/components/site/feature-list'
import { ServiceGrid, type ServiceItem } from '@/components/home/service-grid'
import { FaqSection } from '@/components/site/faq'
import { JsonLd } from '@/components/site/json-ld'
import { GENERAL_FAQS } from '@/lib/faqs'
import { CTA } from '@/components/site/cta'

export const metadata = buildMetadata({
  title: 'Website Development, Branding, CRM & Automation Services',
  description:
    'Services from EvolvNex: business website development, brand identity, custom CRM and business systems, WhatsApp and workflow automation, and SEO-ready foundations.',
  path: '/services',
})

const services: ServiceItem[] = [
  {
    id: 'websites',
    image: '/images/home/websites.jpg',
    tagline: 'Websites',
    title: 'Website development',
    description: 'Responsive business websites that explain your offer clearly, build trust and turn visits into enquiries, bookings or sales.',
    points: [
      'Clear information architecture',
      'Custom design aligned to your brand',
      'Mobile-first, fast-loading build',
      'Forms, booking, CRM or WhatsApp integrations where supported',
    ],
    href: '/services/website-development',
  },
  {
    id: 'branding',
    image: '/images/home/branding.jpg',
    tagline: 'Visual identity',
    title: 'Branding',
    description: 'Brand identity and visual direction that make a business consistent and recognisable across its website and customer experience.',
    points: ['Visual identity and logo direction', 'Colour and typography systems', 'Brand guidelines'],
    href: '/branding',
  },
  {
    id: 'crm',
    image: '/images/home/crm.jpg',
    tagline: 'Business systems',
    title: 'Custom CRM & business systems',
    description: 'Purpose-built tools for customers, appointments, transactions, products, staff and daily workflows, including dedicated systems for food businesses and clinics.',
    points: ['Customer and transaction records', 'Industry workflows for food and healthcare', 'Reporting scoped to your needs'],
    href: '/crm',
  },
  {
    id: 'automation',
    image: '/images/home/automation.jpg',
    tagline: 'Automation',
    title: 'WhatsApp & workflow automation',
    description: 'Consent-aware reminders, communication and follow-up workflows that reduce repetitive manual work.',
    points: ['Appointment and follow-up reminders', 'Lead follow-up workflows', 'Opt-in and opt-out handling'],
    href: '/contact',
  },
  {
    id: 'seo',
    image: '/images/home/seo.jpg',
    tagline: 'Search visibility',
    title: 'SEO foundations',
    description: 'Search-friendly site structure and content foundations that improve how clearly your business can be found and understood. We build the foundation; we do not promise rankings.',
    points: ['Clean page structure and metadata', 'Sitemap, canonical URLs and structured data', 'Fast, accessible pages'],
    href: '/services/website-development',
  },
]

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: GENERAL_FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={faqJsonLd} />
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
        <Container className="space-y-10">
          <ServiceGrid
            items={services}
            eyebrow="What we do"
            heading="Five services, one connected system"
          />
          <ScopeNote>
            Deliverables are confirmed in writing for each project. We do not promise search
            rankings, guaranteed leads or fixed conversion lifts.
          </ScopeNote>
        </Container>
      </Section>

      <Section tone="surface">
        <Container>
          <FaqSection
            title="Common questions"
            description="Straight answers on how we work, what to expect and what we do and do not promise."
            items={GENERAL_FAQS}
          />
        </Container>
      </Section>

      <CTA />
    </>
  )
}
