import { buildMetadata } from '@/lib/seo'
import { SITE } from '@/lib/site'
import { Container, Section } from '@/components/site/container'
import { PageHero } from '@/components/site/page-hero'

export const metadata = buildMetadata({
  title: 'Privacy Notice',
  description: 'How EvolvNex handles the information you send through its enquiry form, WhatsApp and website analytics.',
  path: '/privacy',
})

// TODO (business/legal): review this plain-language notice before relying on it.
export default function PrivacyPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: 'Privacy', href: '/privacy' }]}
        title="Privacy notice"
        lead="A short, plain-language summary of how this website handles your information."
      />
      <Section>
        <Container className="max-w-3xl space-y-8 text-muted-foreground [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground">
          <section>
            <h2>Enquiry form</h2>
            <p>
              When you send an enquiry we receive your name, email, optional business name,
              optional phone number and your message. We use this only to respond to you about
              your enquiry.
            </p>
          </section>
          <section>
            <h2>WhatsApp</h2>
            <p>
              If you tick the WhatsApp box, you agree that we may contact you on WhatsApp about
              that enquiry. You can ask us to stop at any time by replying STOP or by emailing us.
              Messaging us on WhatsApp yourself is separate and governed by WhatsApp’s own terms.
            </p>
          </section>
          <section>
            <h2>Analytics</h2>
            <p>
              We use Google Analytics and Vercel Analytics to understand how the site is used,
              such as which pages are visited. These services may set cookies or collect
              device and usage information.
            </p>
          </section>
          <section>
            <h2>Contact</h2>
            <p>
              For any question about your information, email{' '}
              <a className="text-accent-text underline underline-offset-2" href={`mailto:${SITE.email}`}>
                {SITE.email}
              </a>
              .
            </p>
          </section>
        </Container>
      </Section>
    </>
  )
}
