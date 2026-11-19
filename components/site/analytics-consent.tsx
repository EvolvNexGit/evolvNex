'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Script from 'next/script'

const GA_ID = 'G-GWNE687LV4'
const STORAGE_KEY = 'evolvnex-analytics-consent'
export const COOKIE_SETTINGS_EVENT = 'evolvnex:cookie-settings'

type Choice = 'granted' | 'denied' | null

function readChoice(): Choice {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY)
    return v === 'granted' || v === 'denied' ? v : null
  } catch {
    return null // storage blocked: ask each visit, track nothing
  }
}

function writeChoice(choice: Exclude<Choice, null>) {
  try {
    window.localStorage.setItem(STORAGE_KEY, choice)
  } catch {
    // storage blocked: the choice applies to this page view only
  }
}

/** Best effort removal of Google Analytics cookies when consent is withdrawn. */
function clearGaCookies() {
  const hostParts = window.location.hostname.split('.')
  const domains = [
    undefined,
    window.location.hostname,
    // apex domain, e.g. .evolvnex.com for cookies set on www
    hostParts.length > 2 ? `.${hostParts.slice(-2).join('.')}` : undefined,
  ]
  for (const name of document.cookie.split(';').map((c) => c.split('=')[0].trim())) {
    if (name !== '_ga' && !name.startsWith('_ga_') && name !== '_gid') continue
    for (const domain of domains) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain ? `; domain=${domain}` : ''}`
    }
  }
}

/**
 * Loads Google Analytics only after the visitor accepts. Vercel Analytics (cookie-free,
 * aggregate page views) is rendered separately in the layout and is not gated here.
 */
export function AnalyticsConsent() {
  const [ready, setReady] = useState(false)
  const [choice, setChoice] = useState<Choice>(null)
  const [bannerOpen, setBannerOpen] = useState(false)

  useEffect(() => {
    const stored = readChoice()
    setChoice(stored)
    setBannerOpen(stored === null)
    setReady(true)
    const reopen = () => setBannerOpen(true)
    window.addEventListener(COOKIE_SETTINGS_EVENT, reopen)
    return () => window.removeEventListener(COOKIE_SETTINGS_EVENT, reopen)
  }, [])

  function decide(next: Exclude<Choice, null>) {
    writeChoice(next)
    setChoice(next)
    setBannerOpen(false)
    if (next === 'denied') {
      // Stops any already-loaded gtag from sending further hits, and removes its cookies.
      ;(window as unknown as Record<string, unknown>)[`ga-disable-${GA_ID}`] = true
      clearGaCookies()
    } else {
      ;(window as unknown as Record<string, unknown>)[`ga-disable-${GA_ID}`] = false
    }
  }

  if (!ready) return null

  return (
    <>
      {choice === 'granted' && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}
          </Script>
        </>
      )}

      {bannerOpen && (
        <div
          role="dialog"
          aria-label="Analytics cookies"
          className="fixed right-4 bottom-24 left-4 z-40 rounded-lg border border-border bg-card p-4 shadow-lg sm:right-auto sm:bottom-6 sm:left-6 sm:max-w-md"
        >
          <p className="text-sm leading-relaxed text-muted-foreground">
            We use Google Analytics, with cookies, to see which pages are useful. It stays off unless
            you accept. See our{' '}
            <Link href="/privacy" className="underline underline-offset-2 hover:text-foreground">
              privacy notice
            </Link>
            .
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => decide('granted')}
              className="inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-[#b91c1c]"
            >
              Accept
            </button>
            <button
              type="button"
              onClick={() => decide('denied')}
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#3a3a3a] px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              Decline
            </button>
          </div>
        </div>
      )}
    </>
  )
}
