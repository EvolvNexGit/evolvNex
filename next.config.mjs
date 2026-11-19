const isProd = process.env.NODE_ENV === 'production'

// Third-party origins the site actually uses: Google Analytics/Tag Manager,
// Vercel Analytics and the optional Cloudflare Turnstile widget on the contact form.
const SCRIPT_SRC = [
  "'self'",
  // Next.js emits inline bootstrap/hydration scripts and the GA snippet is inline.
  "'unsafe-inline'",
  'https://www.googletagmanager.com',
  'https://va.vercel-scripts.com',
  'https://challenges.cloudflare.com',
]
const CONNECT_SRC = [
  "'self'",
  'https://www.googletagmanager.com',
  'https://*.google-analytics.com',
  'https://analytics.google.com',
  'https://*.analytics.google.com',
  'https://*.g.doubleclick.net',
  'https://vitals.vercel-insights.com',
  'https://challenges.cloudflare.com',
]
const IMG_SRC = [
  "'self'",
  'data:',
  'blob:',
  'https://www.googletagmanager.com',
  'https://*.google-analytics.com',
  // GA audience pixel is served from the visitor's regional Google domain (google.com, google.co.in, ...).
  'https://*.google.com',
  'https://*.google.co.in',
  'https://*.doubleclick.net',
]

// Always enforced: directives that cannot break page rendering.
const ENFORCED_CSP = [
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
  "form-action 'self'",
].join('; ')

// Report-only first: full policy is observed in the browser console before it is enforced.
const REPORT_ONLY_CSP = [
  "default-src 'self'",
  `script-src ${SCRIPT_SRC.join(' ')}`,
  `connect-src ${CONNECT_SRC.join(' ')}`,
  `img-src ${IMG_SRC.join(' ')}`,
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self' data:",
  'frame-src https://challenges.cloudflare.com',
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
  "form-action 'self'",
].join('; ')

const securityHeaders = [
  { key: 'Strict-Transport-Security', value: 'max-age=31536000' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Content-Security-Policy', value: ENFORCED_CSP },
  { key: 'Content-Security-Policy-Report-Only', value: REPORT_ONLY_CSP },
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Headers are production-only so the dev server (which needs eval) is unaffected.
  async headers() {
    if (!isProd) return []
    return [{ source: '/:path*', headers: securityHeaders }]
  },
}

export default nextConfig
