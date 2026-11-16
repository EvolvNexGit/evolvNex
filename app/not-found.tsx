import type { Metadata } from 'next'
import { Container, Section } from '@/components/site/container'
import { ButtonLink } from '@/components/site/button-link'

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <Section>
      <Container>
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-text">404</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">This page could not be found</h1>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground">
          The link may be old or mistyped. Try one of these instead.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/">Go to homepage</ButtonLink>
          <ButtonLink href="/services" variant="secondary">
            View services
          </ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            Contact us
          </ButtonLink>
        </div>
      </Container>
    </Section>
  )
}
