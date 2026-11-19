import { buildMetadata } from '@/lib/seo'
import { Container, Section } from '@/components/site/container'
import { PageHero } from '@/components/site/page-hero'
import { ButtonLink } from '@/components/site/button-link'
import { Reveal } from '@/components/site/reveal'
import { SectionHeading } from '@/components/site/section-heading'
import { FeatureList, ScopeNote } from '@/components/site/feature-list'
import { FAQ } from '@/components/site/faq'
import { CTA } from '@/components/site/cta'
import { TextLink } from '@/components/site/text-link'

export const metadata = buildMetadata({
  title: 'Healthcare CRM & Clinic Patient Management Software',
  description:
    'Healthcare CRM and patient management systems from EvolvNex: administrative patient records, appointment scheduling, follow-up tracking and reminders for clinics.',
  path: '/crm/healthcare',
})

// TODO (business): confirm patient, appointment, reminder, follow-up, staff and reporting features.
const faqs = [
  {
    q: 'Is this medical software?',
    a: 'No. It supports administrative workflows such as patient records, appointments and follow-ups. It is not a medical device and does not provide clinical decision-making or medical advice.',
  },
  {
    q: 'Can it send WhatsApp appointment reminders?',
    a: 'Reminders can be part of a system where they are scoped and set up with appropriate consent and opt-out handling. The integration method is confirmed per project.',
  },
  {
    q: 'How is patient data handled?',
    a: 'Data handling requirements are discussed during scoping. We will not make claims about compliance or certifications that we have not confirmed for your deployment.',
  },
]

export default function HealthcareCrmPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { name: 'CRM', href: '/crm' },
          { name: 'Healthcare', href: '/crm/healthcare' },
        ]}
        eyebrow="Healthcare"
        title="Healthcare CRM and Patient Management Systems"
        lead="Clinics juggle appointments, follow-ups and enquiries across notebooks, calendars and chat. We build administrative workflow systems that keep these in one place."
      >
        <ButtonLink href="/contact?interest=healthcare" arrow>
          Request a Healthcare CRM Demo
        </ButtonLink>
      </PageHero>

      <Section>
        <Container className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              title="Administrative workflows for clinics"
              description="Typical areas a clinic system covers:"
            />
          </Reveal>
          <Reveal delay={0.08} className="space-y-6">
            <FeatureList
              columns={1}
              items={[
                'Patient information and management',
                'Appointment scheduling and calendar workflows',
                'Follow-up tracking',
                'WhatsApp reminders and communication, with consent and opt-out handling',
                'Staff workflows and reporting where relevant',
                'Lead and enquiry management for clinics',
              ]}
            />
            <ScopeNote>
              This is administrative workflow support, not medical advice or a medical device.
              Exact features are confirmed before work begins.
            </ScopeNote>
          </Reveal>
        </Container>
      </Section>

      <Section tone="surface">
        <Container>
          <Reveal>
            <SectionHeading
              title="Problems this is built to solve"
              description="Common frustrations for clinics:"
            />
          </Reveal>
          <Reveal delay={0.08} className="mt-8">
            <FeatureList
              items={[
                'Missed follow-ups after a first visit',
                'Appointments tracked in several different places',
                'Patient enquiries that never get a reply',
                'No clear view of what staff need to do today',
              ]}
            />
          </Reveal>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading title="Questions" />
          <div className="mt-8">
            <FAQ items={faqs} />
          </div>
          <p className="mt-10 text-muted-foreground">
            Part of our wider <TextLink href="/crm">CRM and business systems</TextLink> work. Also
            see <TextLink href="/crm/food">food business CRM</TextLink> and{' '}
            <TextLink href="/services/website-development">clinic website development</TextLink>.
          </p>
        </Container>
      </Section>

      <CTA
        title="Talk through your clinic workflow"
        primaryLabel="Request a Healthcare CRM Demo"
        primaryHref="/contact?interest=healthcare"
      />
    </>
  )
}
