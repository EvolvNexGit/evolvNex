'use client'

import { useEffect } from 'react'
import { Container, Section } from '@/components/site/container'
import { ButtonLink } from '@/components/site/button-link'

/**
 * Branded fallback for unexpected runtime errors inside the app (500-type failures).
 * Shows no technical detail: only Next's opaque digest, which maps to the server log.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Keep a trace in the browser console for support; the message is already sanitised by Next in production.
    console.error('Page error', error.digest ?? '')
  }, [error])

  return (
    <Section>
      <Container>
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-text">
          Something went wrong
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">This page hit a problem</h1>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground">
          It is on our side, not yours. Try again, or use one of the links below.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors duration-200 hover:bg-[#b91c1c]"
          >
            Try again
          </button>
          <ButtonLink href="/" variant="secondary">
            Go to homepage
          </ButtonLink>
          <ButtonLink href="/services" variant="secondary">
            View services
          </ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            Contact us
          </ButtonLink>
        </div>
        {error.digest && (
          <p className="mt-8 text-xs text-muted-foreground">Reference: {error.digest}</p>
        )}
      </Container>
    </Section>
  )
}
