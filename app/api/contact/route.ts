import { z } from 'zod'
import { SITE } from '@/lib/site'
import { INTERESTS, LIMITS } from '@/lib/contact-shared'
import { rateLimit } from '@/lib/rate-limit'

/**
 * Server-side proxy for the contact form.
 *
 * The browser talks only to this route. The Google Apps Script endpoint is called from the
 * server, so it is no longer shipped in the client bundle. This route adds what the browser
 * alone cannot enforce: same-origin check, size limit, schema validation, honeypot, rate
 * limits, optional Turnstile CAPTCHA and an optional shared secret to the Apps Script.
 *
 * Environment (all optional; see README "Contact form"):
 *   CONTACT_WEBHOOK_URL, CONTACT_WEBHOOK_SECRET
 *   TURNSTILE_SECRET_KEY (+ NEXT_PUBLIC_TURNSTILE_SITE_KEY on the client)
 *   UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN
 */

// Existing Google Apps Script endpoint, kept as a fallback so the live form keeps working
// until CONTACT_WEBHOOK_URL is configured. Rotate it once the env var is set.
const LEGACY_WEBHOOK_URL =
  'https://script.google.com/macros/s/AKfycbxCOLa0Nyg0JNQR5rM3tMTKMYE4oWx-q0HdYz5LCxwgtu72t2_-loblv3tegx6e9Vxj/exec'

const PER_IP_LIMIT = 5 // legitimate visitors send one, maybe two, enquiries
const PER_IP_WINDOW_SEC = 10 * 60
const GLOBAL_LIMIT = 100 // protects the Apps Script mail quota from distributed spam
const GLOBAL_WINDOW_SEC = 60 * 60
const WEBHOOK_TIMEOUT_MS = 10_000

const oneLine = (s: string) => s.replace(/[\r\n\u2028\u2029]+/g, ' ').trim()

const schema = z.object({
  name: z.string().transform(oneLine).pipe(z.string().min(1).max(LIMITS.name)),
  email: z.string().transform(oneLine).pipe(z.email().max(LIMITS.email)),
  company: z.string().max(LIMITS.company).transform(oneLine).optional().default(''),
  phone: z
    .string()
    .max(LIMITS.phone)
    .regex(/^[0-9+()\-.\s]*$/)
    .transform(oneLine)
    .optional()
    .default(''),
  interest: z
    .union([z.enum(INTERESTS), z.literal('')])
    .optional()
    .default(''),
  message: z
    .string()
    .transform((s) => s.trim())
    .pipe(z.string().min(10).max(LIMITS.message)),
  consent: z.boolean().optional().default(false),
  website: z.string().max(200).optional().default(''), // honeypot
  turnstileToken: z.string().max(LIMITS.token).optional().default(''),
})

function json(body: Record<string, unknown>, status: number, headers: Record<string, string> = {}) {
  return Response.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store', ...headers },
  })
}

const GENERIC_FAILURE = {
  status: 'error',
  code: 'unavailable',
  message: 'Could not send your message right now. Please try again later or email us directly.',
}

function clientIp(request: Request) {
  const real = request.headers.get('x-real-ip')
  if (real) return real.trim()
  const fwd = request.headers.get('x-forwarded-for')
  if (fwd) return fwd.split(',')[0].trim()
  return 'unknown'
}

function sameOrigin(request: Request) {
  const origin = request.headers.get('origin')
  if (!origin) return false
  let originHost: string
  try {
    originHost = new URL(origin).host
  } catch {
    return false
  }
  const allowed = new Set<string>([new URL(SITE.url).host])
  const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host')
  if (host) allowed.add(host)
  return allowed.has(originHost)
}

async function verifyTurnstile(token: string, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) return true // CAPTCHA not configured
  if (!token) return false
  try {
    const body = new URLSearchParams({ secret, response: token })
    if (ip !== 'unknown') body.set('remoteip', ip)
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body,
      signal: AbortSignal.timeout(5000),
      cache: 'no-store',
    })
    const data = (await res.json()) as { success?: boolean }
    return data.success === true
  } catch {
    return false
  }
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) {
    return json({ status: 'error', code: 'forbidden', message: 'Request not allowed.' }, 403)
  }

  const contentType = request.headers.get('content-type') ?? ''
  if (!contentType.toLowerCase().startsWith('application/json')) {
    return json({ status: 'error', code: 'bad_request', message: 'Unsupported request.' }, 415)
  }
  const declared = Number(request.headers.get('content-length') ?? 0)
  if (declared > LIMITS.body) {
    return json({ status: 'error', code: 'too_large', message: 'Request is too large.' }, 413)
  }

  const ip = clientIp(request)
  const [perIp, global] = await Promise.all([
    rateLimit(`contact:ip:${ip}`, PER_IP_LIMIT, PER_IP_WINDOW_SEC),
    rateLimit('contact:global', GLOBAL_LIMIT, GLOBAL_WINDOW_SEC),
  ])
  const limited = !perIp.ok ? perIp : !global.ok ? global : null
  if (limited) {
    return json(
      {
        status: 'error',
        code: 'rate_limited',
        message: 'Too many submissions. Please wait a few minutes and try again.',
      },
      429,
      { 'Retry-After': String(limited.retryAfter) },
    )
  }

  let raw: unknown
  try {
    const text = await request.text()
    if (text.length > LIMITS.body) {
      return json({ status: 'error', code: 'too_large', message: 'Request is too large.' }, 413)
    }
    raw = JSON.parse(text)
  } catch {
    return json({ status: 'error', code: 'bad_request', message: 'Invalid request.' }, 400)
  }

  const parsed = schema.safeParse(raw)
  if (!parsed.success) {
    const fields: Record<string, string> = {}
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? 'form')
      if (!fields[key]) fields[key] = 'Please check this field.'
    }
    return json(
      { status: 'error', code: 'validation', message: 'Please check the form.', fields },
      422,
    )
  }
  const data = parsed.data

  // Honeypot: pretend success so bots do not learn they were detected.
  if (data.website) return json({ status: 'success' }, 200)

  if (!(await verifyTurnstile(data.turnstileToken, ip))) {
    return json(
      {
        status: 'error',
        code: 'captcha',
        message: 'Please complete the security check and try again.',
      },
      400,
    )
  }

  const message = [
    data.interest && `Interested in: ${data.interest}`,
    data.message,
    data.phone &&
      `Phone: ${data.phone} (WhatsApp follow-up consent: ${data.consent ? 'yes' : 'no'})`,
  ]
    .filter(Boolean)
    .join('\n\n')

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL || LEGACY_WEBHOOK_URL
  const secret = process.env.CONTACT_WEBHOOK_SECRET

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        company: data.company,
        budget: '',
        message,
        phone: data.phone,
        interest: data.interest,
        whatsappConsent: data.consent,
        ...(secret ? { secret } : {}),
      }),
      signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
      cache: 'no-store',
    })
    const out = (await res.json()) as { status?: string }
    if (out.status !== 'success') {
      console.error('[contact] webhook rejected submission', { httpStatus: res.status })
      return json(GENERIC_FAILURE, 502)
    }
    return json({ status: 'success' }, 200)
  } catch (err) {
    // Log the failure type only: never the submitted personal data.
    console.error('[contact] webhook failed', err instanceof Error ? err.name : 'unknown')
    return json(GENERIC_FAILURE, 502)
  }
}
