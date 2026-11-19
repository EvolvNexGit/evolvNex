'use client'

import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, options: Record<string, unknown>) => string
      remove: (id: string) => void
    }
  }
}

const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'

function loadScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.turnstile) return resolve()
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`)
    const script = existing ?? document.createElement('script')
    script.addEventListener('load', () => resolve())
    script.addEventListener('error', () => reject(new Error('turnstile failed to load')))
    if (!existing) {
      script.src = SCRIPT_SRC
      script.async = true
      document.head.appendChild(script)
    }
  })
}

/**
 * Cloudflare Turnstile widget. Rendered only when NEXT_PUBLIC_TURNSTILE_SITE_KEY is set.
 * Tokens are single use: remount (change `key`) after every submit attempt to get a fresh one.
 */
export function Turnstile({
  siteKey,
  onToken,
}: {
  siteKey: string
  onToken: (token: string) => void
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let widgetId: string | undefined
    let cancelled = false
    loadScript()
      .then(() => {
        if (cancelled || !ref.current || !window.turnstile) return
        widgetId = window.turnstile.render(ref.current, {
          sitekey: siteKey,
          theme: 'dark',
          callback: (token: string) => onToken(token),
          'expired-callback': () => onToken(''),
          'error-callback': () => onToken(''),
        })
      })
      .catch(() => onToken(''))
    return () => {
      cancelled = true
      if (widgetId && window.turnstile) window.turnstile.remove(widgetId)
    }
  }, [siteKey, onToken])

  return <div ref={ref} />
}
