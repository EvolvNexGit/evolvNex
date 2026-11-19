import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { POST } from '@/app/api/contact/route'

const ORIGIN = 'https://www.evolvnex.com'
const valid = {
  name: 'Test User',
  email: 'test@example.com',
  company: 'Acme',
  phone: '+91 99999 00000',
  interest: 'Branding',
  message: 'Hello, we need a new website please.',
  consent: true,
  website: '',
}

type ReqOpts = { origin?: string | null; ip?: string; type?: string; raw?: string }

let ipCounter = 0
function req(body: unknown, opts: ReqOpts = {}) {
  const headers: Record<string, string> = {
    'content-type': opts.type ?? 'application/json',
    'x-real-ip': opts.ip ?? `192.0.2.${++ipCounter}`,
  }
  if (opts.origin !== null) headers.origin = opts.origin ?? ORIGIN
  return new Request('https://www.evolvnex.com/api/contact', {
    method: 'POST',
    headers,
    body: opts.raw ?? JSON.stringify(body),
  })
}

const realFetch = globalThis.fetch
let webhook: ReturnType<typeof vi.fn>

function sentPayload(callIndex = 0) {
  const init = webhook.mock.calls[callIndex][1] as RequestInit
  return JSON.parse(init.body as string)
}

beforeEach(() => {
  webhook = vi.fn(async () => new Response(JSON.stringify({ status: 'success' }), { status: 200 }))
  globalThis.fetch = webhook as unknown as typeof fetch
  process.env.CONTACT_WEBHOOK_URL = 'https://hook.test/exec'
  process.env.CONTACT_WEBHOOK_SECRET = 's3cret'
  delete process.env.TURNSTILE_SECRET_KEY
})
afterEach(() => {
  globalThis.fetch = realFetch
  vi.restoreAllMocks()
})

describe('POST /api/contact', () => {
  it('forwards a valid enquiry with the secret and returns 200', async () => {
    const res = await POST(req(valid))
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ status: 'success' })
    expect(webhook).toHaveBeenCalledTimes(1)
    expect(webhook.mock.calls[0][0]).toBe('https://hook.test/exec')
    const sent = sentPayload()
    expect(sent.secret).toBe('s3cret')
    expect(sent.message).toContain('Interested in: Branding')
    expect(sent.message).toContain('WhatsApp follow-up consent: yes')
  })

  it('rejects a foreign or missing Origin with 403', async () => {
    expect((await POST(req(valid, { origin: 'https://evil.example' }))).status).toBe(403)
    expect((await POST(req(valid, { origin: null }))).status).toBe(403)
    expect(webhook).not.toHaveBeenCalled()
  })

  it('rejects non-JSON content type with 415', async () => {
    expect((await POST(req(valid, { type: 'text/plain' }))).status).toBe(415)
  })

  it('rejects malformed JSON with 400 and oversized bodies with 413', async () => {
    expect((await POST(req(null, { raw: 'not json' }))).status).toBe(400)
    const big = JSON.stringify({ ...valid, message: 'x'.repeat(20_000) })
    expect((await POST(req(null, { raw: big }))).status).toBe(413)
  })

  it('returns 422 with field names and no internals for invalid input', async () => {
    const res = await POST(req({ name: '', email: 'bad', message: 'short' }))
    expect(res.status).toBe(422)
    const body = await res.json()
    expect(Object.keys(body.fields).sort()).toEqual(['email', 'message', 'name'])
    expect(JSON.stringify(body)).not.toMatch(/zod|stack/i)
  })

  it('rejects an interest that is not in the allowed list', async () => {
    expect((await POST(req({ ...valid, interest: 'Something else' }))).status).toBe(422)
  })

  it('strips line breaks from single-line fields', async () => {
    await POST(req({ ...valid, name: 'Evil' + String.fromCharCode(10) + 'Bcc: x@y.z' }))
    const sent = sentPayload()
    expect(sent.name).toBe('Evil Bcc: x@y.z')
  })

  it('silently succeeds on a filled honeypot without calling the webhook', async () => {
    const res = await POST(req({ ...valid, website: 'http://spam.example' }))
    expect(res.status).toBe(200)
    expect(webhook).not.toHaveBeenCalled()
  })

  it('rate limits one IP after 5 submissions with Retry-After', async () => {
    const ip = '198.51.100.7'
    for (let i = 0; i < 5; i++) expect((await POST(req(valid, { ip }))).status).toBe(200)
    const blocked = await POST(req(valid, { ip }))
    expect(blocked.status).toBe(429)
    expect(Number(blocked.headers.get('retry-after'))).toBeGreaterThan(0)
    expect((await POST(req(valid, { ip: '198.51.100.8' }))).status).toBe(200)
  })

  it('returns a generic 502 when the webhook rejects or throws', async () => {
    webhook.mockResolvedValueOnce(new Response('boom', { status: 500 }))
    expect((await POST(req(valid))).status).toBe(502)
    webhook.mockRejectedValueOnce(new Error('network down: secret-host.internal'))
    const b = await POST(req(valid))
    expect(b.status).toBe(502)
    expect(JSON.stringify(await b.json())).not.toContain('secret-host')
  })

  it('requires a valid Turnstile token when TURNSTILE_SECRET_KEY is set', async () => {
    process.env.TURNSTILE_SECRET_KEY = 'ts-secret'
    webhook.mockImplementation(async (url: string) =>
      String(url).includes('turnstile')
        ? new Response(JSON.stringify({ success: false }), { status: 200 })
        : new Response(JSON.stringify({ status: 'success' }), { status: 200 }),
    )
    expect((await POST(req(valid))).status).toBe(400)
    expect((await POST(req({ ...valid, turnstileToken: 'nope' }))).status).toBe(400)
    webhook.mockImplementation(
      async () => new Response(JSON.stringify({ success: true, status: 'success' })),
    )
    expect((await POST(req({ ...valid, turnstileToken: 'good' }))).status).toBe(200)
  })
})
