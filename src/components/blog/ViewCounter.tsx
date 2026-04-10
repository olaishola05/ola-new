'use client'

import React, { useEffect, useState } from 'react'

interface ViewCounterProps {
  slug: string
  trackView?: boolean
}

export default function ViewCounter({
  slug,
  trackView = true,
}: ViewCounterProps) {
  const [views, setViews] = useState<number | null>(null)

  useEffect(() => {
    const fetchAndTrack = async () => {
      try {
        // Track view on mount (POST)
        if (trackView) {
          const res = await fetch(`/api/views/${slug}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: 'view' }),
          })
          const data = await res.json()
          setViews(data.views)
        } else {
          // Just fetch count (GET)
          const res = await fetch(`/api/views/${slug}`)
          const data = await res.json()
          setViews(data.views)
        }
      } catch {
        // Silently fail — view counter is non-critical
        setViews(0)
      }
    }

    fetchAndTrack()
  }, [slug, trackView])

  return (
    <span className="text-sm text-softText flex items-center gap-1.5">
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
      {views === null ? (
        <span className="inline-block w-8 h-3 bg-softBg rounded animate-pulse" />
      ) : (
        <span>{views.toLocaleString()} views</span>
      )}
    </span>
  )
}
