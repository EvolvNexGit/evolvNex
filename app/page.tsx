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
import { HomeGrid } from '@/components/site/grid-showroom'
import { IndustryFlip, type IndustryItem } from '@/components/home/industry-flip'
import { Approach } from '@/components/home/approach'

export const metadata = buildMetadata({
  title: 'EvolvNex | Websites, Branding, CRM & Business Automation',
  description:
    'EvolvNex builds business websites, brand identities, custom CRM and business systems, and workflow automation for growing businesses, delivered remotely.',
  path: '/',
})

/**
 * TODO (business): these figures are derived from what is in this repo
 * (9 published website projects, 5 service lines, 2 industry CRMs).
 * '7 Days delivery guarantee' was requested by the business; confirm its terms.
 * Replace with confirmed numbers (clients, years, projects) before launch.
 */
const stats: Stat[] = [
  { value: 9, suffix: '+', label: 'Websites delivered' },
  { value: 5, label: 'Core services' },
  { value: 2, label: 'Industry CRMs' },
  { value: 7, suffix: 'Days', label: 'Delivery guarantee' },
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
  {
    title: 'SEO Foundations',
    tagline: 'Search visibility',
    description: 'Technical SEO built in, so customers can find you on Google.',
    href: '/services#seo',
    image: '/images/home/seo.jpg',
  },
]

/** Top attractions: 6 hand-picked projects shown in the home grid. */
const TOP_SLUGS = [
  'k-fitness',
  'regain-clinic',
  '24k-springs-salon',
  'studio11-salon-spa',
  'av-fitness',
  'denson-unisex-salon',
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
    imageAlt: 'Modern restaurant dining room',
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
    imageAlt: 'Doctor holding a stethoscope',
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

      {/* Top attractions: the website grid */}
      <Section>
        <Container>
          <Reveal className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Top attractions"
              title="Builds we are proud of"
              description="Hover the grid to reveal each site."
            />
            <ButtonLink href="/work/websites" variant="link" arrow>
              View all websites
            </ButtonLink>
          </Reveal>
          <HomeGrid featured={top} all={PROJECTS} />
        </Container>
      </Section>

      {/* How we work: identical to the original evolvnex.com section */}
      <Approach />

      {/* Industries */}
      <Section className="border-t border-border">
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
