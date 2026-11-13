import {
  UtensilsCrossed,
  Stethoscope,
  Users,
  CalendarClock,
  ReceiptText,
  ShieldCheck,
  BellRing,
  BarChart3,
} from 'lucide-react'
import { buildMetadata } from '@/lib/seo'
import { Container, Section } from '@/components/site/container'
import { PageHero } from '@/components/site/page-hero'
import { ButtonLink } from '@/components/site/button-link'
import { Reveal } from '@/components/site/reveal'
import { SectionHeading } from '@/components/site/section-heading'
import { ScopeNote } from '@/components/site/feature-list'
import { ModuleGrid, type Module } from '@/components/site/module-grid'
import { DashboardMockup } from '@/components/site/dashboard-mockup'
import { FaqSection } from '@/components/site/faq'
import { IndustryPanel } from '@/components/site/industry-panel'
import { CTA } from '@/components/site/cta'
import { TextLink } from '@/components/site/text-link'

export const metadata = buildMetadata({
  title: 'Custom CRM & Business Management Software',
  description:
    'EvolvNex builds custom CRM and business management systems for customers, appointments, transactions, products and staff workflows, including food business and healthcare CRM.',
  path: '/crm',
})

const modules: Module[] = [
  {
    icon: Users,
    title: 'Customer records',
    text: 'Every customer, their details and full interaction history in one place.',
  },
  {
    icon: CalendarClock,
    title: 'Appointments',
    text: 'Bookings and scheduling that stay organised as your day fills up.',
  },
  {
    icon: ReceiptText,
    title: 'Billing & products',
    text: 'Transactions, billing and product management without manual spreadsheets.',
  },
  {
    icon: ShieldCheck,
    title: 'Staff workflows',
    text: 'Clear staff workflows with role-based access to the right information.',
  },
  {
    icon: BellRing,
    title: 'Reminders & follow-ups',
    text: 'Reminders, follow-ups and WhatsApp communication where consent is in place.',
  },
  {
    icon: BarChart3,
    title: 'Reporting',
    text: 'Reporting scoped to the numbers you actually need to run the business.',
  },
]

const faqs = [
  {
    q: 'Why a custom CRM instead of off-the-shelf software?',
    a: 'Off-the-shelf tools are often a good fit, and sometimes a configured product is the right answer. A custom system makes sense when your workflow is specific and generic tools force awkward workarounds. We will tell you honestly which suits you.',
  },
  {
    q: 'Is the system custom-built, configured or integrated?',
    a: 'It depends on the feature and your needs. Before work begins we state which parts are custom-built, configured, integrated or supported, so there are no surprises.',
  },
  {
    q: 'Can it send WhatsApp reminders?',
    a: 'WhatsApp communication can be part of a system where it is scoped and set up with proper opt-in and opt-out handling. The integration method is confirmed per project.',
  },
]

export default function CrmPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: 'CRM', href: '/crm' }]}
        eyebrow="CRM & business systems"
        title="Custom CRM and business management systems"
        lead="Scattered customer records, missed follow-ups and manual billing slow a business down. We build purpose-built systems around the way you actually work."
        aside={<DashboardMockup />}
      >
        <ButtonLink href="/contact" arrow>
          Request a Demo
        </ButtonLink>
      </PageHero>

      <Section>
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Modules"
              title="What these systems help you manage"
              description="Modules are chosen per business. Common building blocks:"
            />
          </Reveal>
          <div className="mt-10">
            <ModuleGrid items={modules} />
          </div>
          <div className="mt-6">
            <ScopeNote>
              Features vary by deployment. We confirm what is live, configurable or custom-build
              for your project before committing to scope.
            </ScopeNote>
          </div>
        </Container>
      </Section>

      <Section tone="surface">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="By industry"
              title="Workflows for specific businesses"
              description="Start with the page closest to your business."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <Reveal>
              <IndustryPanel
                icon={UtensilsCrossed}
                title="Food & Beverage CRM and POS"
                description="Billing, products, inventory, customers, memberships and loyalty for cafés and restaurants."
                image="/images/home/industry-food.jpg"
                points={['Billing and POS workflows', 'Inventory and stock', 'Memberships and loyalty']}
                href="/crm/food"
                cta="Food business CRM"
              />
            </Reveal>
            <Reveal delay={0.08}>
              <IndustryPanel
                icon={Stethoscope}
                title="Healthcare CRM"
                description="Patient, appointment and follow-up workflows for clinics and healthcare providers."
                image="/images/home/industry-health.jpg"
                points={['Patient information', 'Appointments and calendar', 'Follow-ups and reminders']}
                href="/crm/healthcare"
                cta="Healthcare CRM"
              />
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <FaqSection title="Common questions" items={faqs} />
          <p className="mt-12 text-muted-foreground">
            Need a public-facing site as well? See{' '}
            <TextLink href="/services/website-development">website development</TextLink>.
          </p>
        </Container>
      </Section>

      <CTA title="Want to see how it could work for you?" primaryLabel="Request a Demo" />
    </>
  )
}
