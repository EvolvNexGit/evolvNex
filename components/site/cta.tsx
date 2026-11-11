import { Container, Section } from './container'
import { ButtonLink } from './button-link'
import { Reveal } from './reveal'
import { whatsappUrl } from '@/lib/site'

export function CTA({
  title = 'Have a project in mind?',
  description = 'Tell us what you are trying to build or fix. We will reply with next steps, with no obligation.',
  primaryLabel = 'Discuss a Project',
  primaryHref = '/contact',
}: {
  title?: string
  description?: string
  primaryLabel?: string
  primaryHref?: string
}) {
  return (
    <Section tone="surface">
      <Container>
        <Reveal className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-xl">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
            <p className="mt-3 text-lg text-muted-foreground">{description}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={primaryHref} arrow>
              {primaryLabel}
            </ButtonLink>
            <ButtonLink href={whatsappUrl()} variant="secondary">
              Chat on WhatsApp
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
