'use client'

import './globals.css'

/**
 * Last-resort fallback when the root layout itself fails. It replaces the whole document,
 * so it must render its own <html>/<body> and cannot rely on the site header or fonts.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground antialiased">
        <main className="mx-auto w-full max-w-[1200px] px-5 py-24 sm:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-text">
            EvolvNex
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">
            We are having a temporary problem
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">
            Please try again in a moment. If it keeps happening, email us at{' '}
            <a className="underline underline-offset-2" href="mailto:team@evolvnex.com">
              team@evolvnex.com
            </a>
            .
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={reset}
              className="inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-[#b91c1c]"
            >
              Try again
            </button>
            {/* Plain anchor on purpose: a full page load recovers from a broken layout state. */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/"
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#3a3a3a] px-5 py-2.5 text-sm font-semibold hover:bg-secondary"
            >
              Go to homepage
            </a>
          </div>
          {error.digest && (
            <p className="mt-8 text-xs text-muted-foreground">Reference: {error.digest}</p>
          )}
        </main>
      </body>
    </html>
  )
}
