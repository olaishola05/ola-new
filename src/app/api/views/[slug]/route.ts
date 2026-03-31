import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { v4 as uuidv4 } from 'uuid'
import { incrementViews, incrementReads, getViews, ratelimit } from '@/lib/redis'

const SESSION_COOKIE = 'blog_session_id'

function getOrCreateSessionId(): string {
  const cookieStore = cookies()
  const existing = cookieStore.get(SESSION_COOKIE)
  if (existing) return existing.value
  return uuidv4()
}

/**
 * GET /api/views/[slug] — Get view count for a post
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params

  try {
    const views = await getViews(slug)
    return NextResponse.json({ views })
  } catch (error) {
    console.error('[Views API] GET error:', error)
    return NextResponse.json({ views: 0 })
  }
}

/**
 * POST /api/views/[slug] — Increment view or read count
 * Body: { type?: 'view' | 'read' }
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params

  try {
    // Rate limiting by IP
    if (ratelimit) {
      const ip = request.headers.get('x-forwarded-for') ?? '127.0.0.1'
      const { success } = await ratelimit.limit(ip)
      if (!success) {
        return NextResponse.json(
          { error: 'Rate limit exceeded' },
          { status: 429 }
        )
      }
    }

    const sessionId = getOrCreateSessionId()

    let body: { type?: string } = {}
    try {
      body = await request.json()
    } catch {
      // Default to view if no body
    }

    const type = body.type || 'view'

    let count: number

    if (type === 'read') {
      count = await incrementReads(slug, sessionId)
    } else {
      count = await incrementViews(slug, sessionId)
    }

    const response = NextResponse.json({ views: count })

    // Set session cookie if not present
    const cookieStore = cookies()
    if (!cookieStore.get(SESSION_COOKIE)) {
      response.cookies.set(SESSION_COOKIE, sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/',
      })
    }

    return response
  } catch (error) {
    console.error('[Views API] POST error:', error)
    return NextResponse.json({ views: 0 })
  }
}
