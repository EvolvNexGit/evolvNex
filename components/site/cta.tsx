import { ArrowRight, Mail, Phone } from 'lucide-react'
import { Container } from './container'
import { ButtonLink } from './button-link'
import { Reveal } from './reveal'
import { SITE, whatsappUrl } from '@/lib/site'

/** Quiet closing CTA: one bordered panel, no glow. */
export function CTA({
  title = "Let's build something that works.",
  description = 'Tell us what you want to launch or fix. We reply with clear next steps, no obligation.',
  primaryLabel = 'Start a Project',
  primaryHref = '/contact',
}: {
  title?: string
  description?: string
  primaryLabel?: string
  primaryHref?: string
}) {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <Reveal className="relative overflow-hidden border border-border bg-card">
          <div aria-hidden className="hero-grid grid-mask absolute inset-0 opacity-50" />
          <span aria-hidden className="absolute top-0 left-0 h-px w-24 bg-primary" />
          <div className="relative grid gap-10 p-8 sm:p-12 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:p-16">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-accent-text">
                Start a project
              </p>
              <h2 className="text-3xl font-black tracking-tight uppercase sm:text-4xl">{title}</h2>
              <p className="mt-4 max-w-lg text-muted-foreground">{description}</p>
            </div>
            <div className="flex flex-col gap-6 lg:items-end">
              <div className="flex flex-wrap gap-3">
                <ButtonLink href={primaryHref} arrow>
                  {primaryLabel}
                </ButtonLink>
                <ButtonLink href={whatsappUrl()} variant="secondary">
                  WhatsApp
                  <ArrowRight className="size-4" aria-hidden />
                </ButtonLink>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <a
                  href={`mailto:${SITE.email}`}
                  className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
                >
                  <Mail className="size-4 text-primary" aria-hidden />
                  {SITE.email}
                </a>
                <a
                  href={`tel:${SITE.phoneTel}`}
                  className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
                >
                  <Phone className="size-4 text-primary" aria-hidden />
                  {SITE.phoneDisplay}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
