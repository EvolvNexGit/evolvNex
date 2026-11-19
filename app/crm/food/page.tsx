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
  title: 'Café & Restaurant CRM and POS Software',
  description:
    'Food business CRM and POS systems from EvolvNex: billing, products, inventory, customer records, memberships and loyalty workflows for cafés and restaurants.',
  path: '/crm/food',
})

// TODO (business): confirm live scope of POS, inventory, recipes, table QR, memberships, loyalty, branches and reporting.
const faqs = [
  {
    q: 'What is restaurant POS software supposed to cover?',
    a: 'At minimum: taking orders, billing, and recording transactions. Many food businesses also need product and price management, inventory tracking and customer records. The right mix depends on how you operate.',
  },
  {
    q: 'Can it handle memberships and loyalty?',
    a: 'Membership and loyalty workflows are part of what we build for food businesses. Exact behaviour is scoped to your offers and confirmed before work begins.',
  },
  {
    q: 'Does it support multiple branches or reservations?',
    a: 'Only where implemented for a specific deployment. Tell us your setup and we will confirm what is possible rather than assume.',
  },
]

export default function FoodCrmPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { name: 'CRM', href: '/crm' },
          { name: 'Food & Beverage', href: '/crm/food' },
        ]}
        eyebrow="Food & Beverage"
        title="Food Business CRM and POS Systems"
        lead="Billing in one place, stock in another, customers in a notebook. We build café and restaurant systems that bring billing, products, inventory and customers together."
      >
        <ButtonLink href="/contact?interest=food" arrow>
          Request a Food Business CRM Demo
        </ButtonLink>
      </PageHero>

      <Section>
        <Container className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              title="Workflows for cafés and restaurants"
              description="Typical areas a food business system covers:"
            />
          </Reveal>
          <Reveal delay={0.08} className="space-y-6">
            <FeatureList
              columns={1}
              items={[
                'Billing and POS workflows',
                'Products and transaction management',
                'Inventory and stock workflows',
                'Customer database and purchase history',
                'Memberships and subscription plans',
                'Loyalty and repeat-customer workflows',
                'WhatsApp integration and customer communication, with consent',
              ]}
            />
            <ScopeNote>
              Analytics, multi-branch support and reservations are included only where
              implemented for a given deployment. We confirm exact scope before you commit.
            </ScopeNote>
          </Reveal>
        </Container>
      </Section>

      <Section tone="surface">
        <Container>
          <Reveal>
            <SectionHeading
              title="Problems this is built to solve"
              description="Common frustrations for food businesses:"
            />
          </Reveal>
          <Reveal delay={0.08} className="mt-8">
            <FeatureList
              items={[
                'Manual billing that is slow and error-prone',
                'Inventory that is not connected to what you sell',
                'No record of who your regular customers are',
                'No simple way to run memberships or reward repeat visits',
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
            see <TextLink href="/crm/healthcare">healthcare CRM</TextLink>.
          </p>
        </Container>
      </Section>

      <CTA
        title="Talk through your café or restaurant workflow"
        primaryLabel="Request a Food Business CRM Demo"
        primaryHref="/contact?interest=food"
      />
    </>
  )
}
