import { Mail, Phone, MessageCircle } from 'lucide-react'
import { buildMetadata } from '@/lib/seo'
import { SITE, whatsappUrl } from '@/lib/site'
import { Container, Section } from '@/components/site/container'
import { PageHero } from '@/components/site/page-hero'
import { ContactForm } from '@/components/site/contact-form'

export const metadata = buildMetadata({
  title: 'Contact EvolvNex: Start a Project Enquiry',
  description:
    'Tell EvolvNex about your website, branding, CRM or automation project. Send a short enquiry, email, call or message us on WhatsApp.',
  path: '/contact',
})

const INTEREST_MAP: Record<string, string> = {
  food: 'Food business CRM / POS',
  healthcare: 'Healthcare CRM',
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ interest?: string }>
}) {
  const { interest } = await searchParams
  const defaultInterest = (interest && INTEREST_MAP[interest]) || ''

  return (
    <>
      <PageHero
        crumbs={[{ name: 'Contact', href: '/contact' }]}
        eyebrow="Contact"
        title="Tell us about your project"
        lead="A few lines about your business and what you want to build or fix is enough to start. We will reply by email, or on WhatsApp if you opt in."
      />

      <Section>
        <Container className="grid gap-14 lg:grid-cols-[1.4fr_1fr]">
          <ContactForm defaultInterest={defaultInterest} />

          <aside aria-label="Other ways to reach us" className="space-y-8">
            <ul className="space-y-5">
              <li className="flex gap-4">
                <Mail className="mt-1 size-5 text-accent-text" aria-hidden />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a href={`mailto:${SITE.email}`} className="font-medium hover:text-accent-text">
                    {SITE.email}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <Phone className="mt-1 size-5 text-accent-text" aria-hidden />
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <a href={`tel:${SITE.phoneTel}`} className="font-medium hover:text-accent-text">
                    {SITE.phoneDisplay}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <MessageCircle className="mt-1 size-5 text-accent-text" aria-hidden />
                <div>
                  <p className="text-sm text-muted-foreground">WhatsApp</p>
                  <a
                    href={whatsappUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium hover:text-accent-text"
                  >
                    Start a conversation
                  </a>
                </div>
              </li>
            </ul>

            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="text-lg font-semibold">What happens next</h2>
              <ol className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li>1. We read your message and may ask a few follow-up questions.</li>
                <li>2. We set up a call or chat to understand your requirement.</li>
                <li>3. You receive a clear proposal covering scope and approach.</li>
              </ol>
            </div>

            <p className="text-sm text-muted-foreground">
              EvolvNex is a remote-first team and works with clients online.
            </p>
          </aside>
        </Container>
      </Section>
    </>
  )
}
