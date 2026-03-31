import { Redis } from '@upstash/redis'
import { Ratelimit } from '@upstash/ratelimit'

// ─── Redis Client ──────────────────────────────────────────────────

function getRedisClient(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN

  if (!url || !token) {
    console.warn(
      '[Redis] UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN not set. View counter disabled.'
    )
    return null
  }

  return new Redis({ url, token })
}

export const redis = getRedisClient()

// ─── Rate Limiter ──────────────────────────────────────────────────

export const ratelimit = redis
  ? new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, '1 m'), // 10 requests per minute per key
    analytics: true,
  })
  : null

// ─── View Counter Helpers ──────────────────────────────────────────

const VIEWS_PREFIX = 'views:'
const SESSION_PREFIX = 'session:'

/**
 * Increment view count for a post, deduplicating by session.
 * Returns the new total view count.
 */
export async function incrementViews(
  slug: string,
  sessionId: string
): Promise<number> {
  if (!redis) return 0

  const sessionKey = `${SESSION_PREFIX}${sessionId}`
  const viewsKey = `${VIEWS_PREFIX}${slug}`

  // Check if this session already viewed this post
  const alreadyViewed = await redis.sismember(sessionKey, slug)

  if (alreadyViewed) {
    // Return current count without incrementing
    const count = await redis.get<number>(viewsKey)
    return count ?? 0
  }

  // Increment view count and mark session
  const pipeline = redis.pipeline()
  pipeline.incr(viewsKey)
  pipeline.sadd(sessionKey, slug)
  pipeline.expire(sessionKey, 60 * 60 * 24) // 24-hour session TTL

  const results = await pipeline.exec()
  return (results[0] as number) ?? 0
}

/**
 * Get view count for a post.
 */
export async function getViews(slug: string): Promise<number> {
  if (!redis) return 0

  const count = await redis.get<number>(`${VIEWS_PREFIX}${slug}`)
  return count ?? 0
}

/**
 * Increment read count (scroll-depth tracking).
 */
export async function incrementReads(
  slug: string,
  sessionId: string
): Promise<number> {
  if (!redis) return 0

  const sessionKey = `${SESSION_PREFIX}reads:${sessionId}`
  const readsKey = `reads:${slug}`

  const alreadyRead = await redis.sismember(sessionKey, slug)
  if (alreadyRead) {
    const count = await redis.get<number>(readsKey)
    return count ?? 0
  }

  const pipeline = redis.pipeline()
  pipeline.incr(readsKey)
  pipeline.sadd(sessionKey, slug)
  pipeline.expire(sessionKey, 60 * 60 * 24)

  const results = await pipeline.exec()
  // Record slug in global set for easier analytics retrieval
  return (results[0] as number) ?? 0
}

/**
 * Record time spent on a post (incremental).
 */
export async function incrementTimeSpent(
  slug: string,
  seconds: number
): Promise<void> {
  if (!redis) return
  const timeKey = `time:${slug}`
  await redis.incrby(timeKey, seconds)
}

/**
 * Increment interaction count (e.g., code copied).
 */
export async function incrementInteractions(
  slug: string,
  type: string = 'copy'
): Promise<void> {
  if (!redis) return
  const interactionKey = `interactions:${slug}:${type}`
  await redis.incr(interactionKey)
  // Also keep a total interactions key for simplicity
  await redis.incr(`interactions:${slug}:total`)
}

/**
 * Get analytics for all posts.
 */
export async function getAllPostAnalytics(): Promise<Record<string, { views: number; reads: number; timeSpent: number; interactions: number }>> {
  if (!redis) return {}

  const slugs = await redis.smembers('all_post_slugs')
  const stats: Record<string, { views: number; reads: number; timeSpent: number; interactions: number }> = {}

  await Promise.all(
    slugs.map(async (slug) => {
      const [views, reads, timeSpent, interactions] = await Promise.all([
        getViews(slug),
        redis.get<number>(`reads:${slug}`),
        redis.get<number>(`time:${slug}`),
        redis.get<number>(`interactions:${slug}:total`)
      ])
      stats[slug] = {
        views: views ?? 0,
        reads: reads ?? 0,
        timeSpent: timeSpent ?? 0,
        interactions: interactions ?? 0
      }
    })
  )

  return stats
}

