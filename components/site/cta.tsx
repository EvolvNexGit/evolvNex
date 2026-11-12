import { ArrowUpRight, Mail, Phone } from 'lucide-react'
import { Container } from './container'
import { ButtonLink } from './button-link'
import { Reveal } from './reveal'
import { SITE, whatsappUrl } from '@/lib/site'

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
    <section className="relative overflow-hidden border-t border-border py-24 md:py-36">
      <div aria-hidden className="hero-grid absolute inset-0 opacity-70" />
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 size-[50vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[140px]"
        style={{ animation: 'drift-a 18s ease-in-out infinite' }}
      />
      <Container className="relative">
        <Reveal className="mx-auto max-w-4xl text-center">
          <p className="mb-6 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-accent-text">
            <span className="h-px w-10 bg-primary" aria-hidden />
            Start a project
            <span className="h-px w-10 bg-primary" aria-hidden />
          </p>
          <h2 className="text-[clamp(2.5rem,7vw,6rem)] leading-[1] font-semibold tracking-[-0.035em]">
            {title}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">{description}</p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <ButtonLink href={primaryHref} arrow className="min-h-14 px-8 text-base">
              {primaryLabel}
            </ButtonLink>
            <ButtonLink
              href={whatsappUrl()}
              variant="secondary"
              className="min-h-14 px-8 text-base"
            >
              Chat on WhatsApp
              <ArrowUpRight className="size-4" aria-hidden />
            </ButtonLink>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
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
        </Reveal>
      </Container>
    </section>
  )
}
