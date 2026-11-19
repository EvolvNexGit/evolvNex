/**
 * Fixed-window rate limiter.
 *
 * - With UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN set, counters live in Redis so the
 *   limit holds across serverless instances.
 * - Otherwise (or if Redis is unreachable) it falls back to per-instance memory. That still stops
 *   a single bot hammering one instance, but is NOT a hard global limit: configure Redis for that.
 */

export type RateLimitResult = { ok: boolean; retryAfter: number }

type Bucket = { count: number; resetAt: number }
const memory = new Map<string, Bucket>()
const MAX_MEMORY_KEYS = 5000

function memoryLimit(key: string, limit: number, windowSec: number): RateLimitResult {
  const now = Date.now()
  const bucket = memory.get(key)
  if (!bucket || bucket.resetAt <= now) {
    if (memory.size >= MAX_MEMORY_KEYS) {
      for (const [k, b] of memory) if (b.resetAt <= now) memory.delete(k)
      if (memory.size >= MAX_MEMORY_KEYS) memory.clear()
    }
    memory.set(key, { count: 1, resetAt: now + windowSec * 1000 })
    return { ok: true, retryAfter: 0 }
  }
  bucket.count += 1
  if (bucket.count > limit) {
    return { ok: false, retryAfter: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)) }
  }
  return { ok: true, retryAfter: 0 }
}

async function redisLimit(
  key: string,
  limit: number,
  windowSec: number,
): Promise<RateLimitResult | null> {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) return null
  try {
    const res = await fetch(`${url.replace(/\/$/, '')}/pipeline`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify([
        ['INCR', key],
        ['EXPIRE', key, windowSec, 'NX'],
        ['TTL', key],
      ]),
      signal: AbortSignal.timeout(2000),
      cache: 'no-store',
    })
    if (!res.ok) return null
    const out = (await res.json()) as { result?: number }[]
    const count = Number(out[0]?.result)
    const ttl = Number(out[2]?.result)
    if (!Number.isFinite(count)) return null
    if (count > limit) return { ok: false, retryAfter: ttl > 0 ? ttl : windowSec }
    return { ok: true, retryAfter: 0 }
  } catch {
    return null
  }
}

export async function rateLimit(
  key: string,
  limit: number,
  windowSec: number,
): Promise<RateLimitResult> {
  const fromRedis = await redisLimit(`rl:${key}`, limit, windowSec)
  return fromRedis ?? memoryLimit(key, limit, windowSec)
}
