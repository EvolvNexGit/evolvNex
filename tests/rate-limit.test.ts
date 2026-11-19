import { describe, it, expect, vi, afterEach } from 'vitest'
import { rateLimit } from '@/lib/rate-limit'

afterEach(() => vi.useRealTimers())

describe('rateLimit (in-memory fallback)', () => {
  it('allows up to the limit then blocks with a retry time', async () => {
    const key = `t:${Math.random()}`
    for (let i = 0; i < 3; i++) expect((await rateLimit(key, 3, 60)).ok).toBe(true)
    const blocked = await rateLimit(key, 3, 60)
    expect(blocked.ok).toBe(false)
    expect(blocked.retryAfter).toBeGreaterThan(0)
    expect(blocked.retryAfter).toBeLessThanOrEqual(60)
  })

  it('keeps separate counters per key', async () => {
    const a = `a:${Math.random()}`
    const b = `b:${Math.random()}`
    await rateLimit(a, 1, 60)
    expect((await rateLimit(a, 1, 60)).ok).toBe(false)
    expect((await rateLimit(b, 1, 60)).ok).toBe(true)
  })

  it('resets after the window passes', async () => {
    vi.useFakeTimers()
    const key = `w:${Math.random()}`
    await rateLimit(key, 1, 10)
    expect((await rateLimit(key, 1, 10)).ok).toBe(false)
    vi.advanceTimersByTime(11_000)
    expect((await rateLimit(key, 1, 10)).ok).toBe(true)
  })
})
