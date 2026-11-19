'use client'

import { COOKIE_SETTINGS_EVENT } from '@/components/site/analytics-consent'

/** Footer link that reopens the analytics consent banner so a choice can be changed. */
export function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(COOKIE_SETTINGS_EVENT))}
      className="underline underline-offset-2 transition-colors hover:text-foreground"
    >
      Cookie settings
    </button>
  )
}
