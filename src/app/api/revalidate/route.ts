import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

/**
 * POST /api/revalidate — On-demand ISR revalidation webhook
 * 
 * Usage: POST /api/revalidate
 * Headers: { Authorization: Bearer <REVALIDATION_SECRET> }
 * Body: { paths?: string[] }
 * 
 * If no paths provided, revalidates the entire blog section.
 */
export async function POST(request: NextRequest) {
  const secret = process.env.REVALIDATION_SECRET

  if (!secret) {
    return NextResponse.json(
      { error: 'REVALIDATION_SECRET not configured' },
      { status: 500 }
    )
  }

  // Validate authorization
  const authHeader = request.headers.get('authorization')
  const token = authHeader?.replace('Bearer ', '')

  if (token !== secret) {
    return NextResponse.json(
      { error: 'Invalid token' },
      { status: 401 }
    )
  }

  try {
    let body: { paths?: string[] } = {}
    try {
      body = await request.json()
    } catch {
      // Default: revalidate all blog paths
    }

    const pathsToRevalidate = body.paths || [
      '/blog',
      '/blog/posts',
    ]

    for (const path of pathsToRevalidate) {
      revalidatePath(path)
    }

    return NextResponse.json({
      revalidated: true,
      paths: pathsToRevalidate,
      timestamp: Date.now(),
    })
  } catch (error) {
    console.error('[Revalidate] Error:', error)
    return NextResponse.json(
      { error: 'Revalidation failed' },
      { status: 500 }
    )
  }
}
