import { NextRequest, NextResponse } from 'next/server'
import { incrementTimeSpent, incrementInteractions } from '@/lib/redis'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { slug, type, duration, interactionType } = body

    if (!slug) {
      return NextResponse.json({ error: 'Missing slug' }, { status: 400 })
    }

    if (type === 'heartbeat' && duration) {
      await incrementTimeSpent(slug, duration)
    } else if (type === 'interaction' && interactionType) {
      await incrementInteractions(slug, interactionType)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Analytics Error]', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
