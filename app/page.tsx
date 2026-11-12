import { buildMetadata } from '@/lib/seo'
import { PROJECTS } from '@/lib/projects'
import { Container, Section } from '@/components/site/container'
import { ButtonLink } from '@/components/site/button-link'
import { Reveal } from '@/components/site/reveal'
import { SectionHeading } from '@/components/site/section-heading'
import { CTA } from '@/components/site/cta'
import { Hero } from '@/components/home/hero'
import { IntroLoader } from '@/components/home/intro-loader'
import { ScrollProgress } from '@/components/home/scroll-progress'
import { Stats, type Stat } from '@/components/home/stats'
import { MarqueeBar } from '@/components/home/marquee-bar'
import { ServiceGrid, type ServiceItem } from '@/components/home/service-grid'
import { ProjectMarquee } from '@/components/home/project-marquee'
import { IndustryFlip, type IndustryItem } from '@/components/home/industry-flip'

export const metadata = buildMetadata({
  title: 'EvolvNex | Websites, Branding, CRM & Business Automation',
  description:
    'EvolvNex builds business websites, brand identities, custom CRM and business systems, and workflow automation for growing businesses, delivered remotely.',
  path: '/',
})

/**
 * TODO (business): these figures are derived from what is in this repo
 * (9 published website projects, 4 service lines, 2 industry CRMs).
 * Replace with confirmed numbers (clients, years, projects) before launch.
 */
const stats: Stat[] = [
  { value: 9, suffix: '+', label: 'Websites delivered' },
  { value: 4, label: 'Core services' },
  { value: 2, label: 'Industry CRMs' },
  { value: 100, suffix: '%', label: 'Remote delivery' },
]

const services: ServiceItem[] = [
  {
    title: 'Website Development',
    tagline: 'Websites',
    description: 'Fast, SEO-ready websites that turn visits into enquiries.',
    href: '/services/website-development',
    image: '/images/home/websites.jpg',
  },
  {
    title: 'Branding',
    tagline: 'Visual identity',
    description: 'Brand identity and direction that make you recognisable.',
    href: '/branding',
    image: '/images/home/branding.jpg',
  },
  {
    title: 'CRM & Business Systems',
    tagline: 'Optimisation hub',
    description: 'Customers, bookings, billing and reports in one place.',
    href: '/crm',
    image: '/images/home/crm.jpg',
  },
  {
    title: 'WhatsApp & Automation',
    tagline: 'Automation',
    description: 'Consent-aware reminders and follow-ups that save hours.',
    href: '/services#automation',
    image: '/images/home/automation.jpg',
  },
]

/** Top attractions: 4 hand-picked projects. */
const TOP_SLUGS = ['k-fitness', 'regain-clinic', '24k-springs-salon', 'studio11-salon-spa']

const steps = [
  {
    n: '01',
    title: 'Discovery & Strategy',
    text: 'We learn your business, customers and goals before we design or write a line of code.',
  },
  {
    n: '02',
    title: 'Scope & Planning',
    text: 'Clear scope, sitemap and priorities, so you know exactly what gets built and when.',
  },
  {
    n: '03',
    title: 'Design & Development',
    text: 'Responsive, SEO-ready websites and CRM systems built in reviewable stages.',
  },
  {
    n: '04',
    title: 'Launch & Optimisation',
    text: 'We go live, track performance and keep improving what works.',
  },
]

const industries: IndustryItem[] = [
  {
    title: 'Food & Beverage',
    description: 'Billing, stock and customers for cafés, restaurants and food brands.',
    points: [
      'Billing and POS workflows',
      'Products, inventory and transactions',
      'Customers, memberships and loyalty',
    ],
    href: '/crm/food',
    cta: 'Explore Food CRM',
    image: '/images/home/industry-food.jpg',
    imageAlt: 'Plated dish on a restaurant table',
  },
  {
    title: 'Healthcare',
    description: 'Administrative workflow support for clinics and healthcare providers.',
    points: [
      'Patient information and appointments',
      'Follow-up tracking and reminders',
      'Clinic enquiry management',
    ],
    href: '/crm/healthcare',
    cta: 'Explore Healthcare CRM',
    image: '/images/home/industry-health.jpg',
    imageAlt: 'Doctor in a white coat using a phone',
  },
]

export default function HomePage() {
  const top = TOP_SLUGS.map((s) => PROJECTS.find((p) => p.slug === s)!).filter(Boolean)

  return (
    <>
      <IntroLoader />
      <ScrollProgress />

      <Hero />
      <Stats stats={stats} />
      <MarqueeBar />

      {/* What we build */}
      <Section>
        <Container>
          <ServiceGrid items={services} />
        </Container>
      </Section>

      {/* Top attractions */}
      <Section className="overflow-hidden">
        <Container>
          <Reveal className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow="Top attractions" title="Builds we are proud of" />
            <ButtonLink href="/work/websites" variant="link" arrow>
              View all websites
            </ButtonLink>
          </Reveal>
        </Container>
        <ProjectMarquee projects={top} />
      </Section>

      {/* How we work: same layout and animation as before, new SEO copy */}
      <Section tone="surface">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="How we work"
              title="Our website, CRM and automation process"
              description="Remote-first delivery in four clear stages, so you always know what happens next."
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

      {/* Industries */}
      <Section>
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Industries"
              title="Built for food businesses and clinics"
              description="Purpose-built CRM and workflow software for restaurants, cafés and healthcare providers."
            />
          </Reveal>
          <div className="mt-12">
            <IndustryFlip items={industries} />
          </div>
        </Container>
      </Section>

      <CTA />
    </>
  )
}
