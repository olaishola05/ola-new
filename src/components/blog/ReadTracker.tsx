'use client'

import { useEffect, useRef } from 'react'
import { track } from '@vercel/analytics'

interface ReadTrackerProps {
  slug: string
}

/**
 * Improved scroll-depth tracker:
 * 1. Uses sessionStorage to fire only once per session per post
 * 2. Places marker at 80% of post content height
 * 3. Fires both Vercel Analytics event and API call
 * 4. Disconnects observer after firing
 */
export default function ReadTracker({ slug }: ReadTrackerProps) {
  const hasFired = useRef(false)

  useEffect(() => {
    // Check if already tracked in this session
    const sessionKey = `read:${slug}`
    if (sessionStorage.getItem(sessionKey)) {
      return
    }

    const handleRead = async () => {
      if (hasFired.current) return
      hasFired.current = true

      // Mark as read in session
      sessionStorage.setItem(sessionKey, 'true')

      // Track via Vercel Analytics
      try {
        track('post_read', { slug, depth: 80 })
      } catch {
        // Vercel Analytics may not be available in dev
      }

      // Track via API (Redis counter)
      try {
        await fetch(`/api/views/${slug}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'read' }),
        })
      } catch {
        // Non-critical — silently fail
      }
    }

    // Create a marker at 80% of the post content
    const postContent = document.getElementById('post-content')
    if (!postContent) return

    const marker = document.createElement('div')
    marker.style.position = 'absolute'
    marker.style.width = '1px'
    marker.style.height = '1px'
    marker.style.opacity = '0'
    marker.style.pointerEvents = 'none'

    // Position marker at 80% of content height
    const updateMarkerPosition = () => {
      const contentHeight = postContent.scrollHeight
      marker.style.top = `${contentHeight * 0.8}px`
    }

    postContent.style.position = 'relative'
    postContent.appendChild(marker)
    updateMarkerPosition()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            handleRead()
            observer.disconnect()
          }
        })
      },
      { threshold: 0 }
    )

    observer.observe(marker)

    return () => {
      observer.disconnect()
      if (marker.parentNode) {
        marker.parentNode.removeChild(marker)
      }
    }
  }, [slug])

  return null
}
