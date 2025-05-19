
'use client'

import { useEffect, useRef, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'

interface YouTubeVideoProps {
  videoId: string
  title?: string
  width?: number
  height?: number
  autoplay?: boolean
}

export function YouTubeVideo({
  videoId,
  title = 'YouTube Video',
  width = 560,
  height = 315,
  autoplay = false,
}: YouTubeVideoProps) {
  const videoRef = useRef<HTMLDivElement | null>(null)
  const [shouldPlay, setShouldPlay] = useState(!autoplay)

  useEffect(() => {
    if (!autoplay) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldPlay(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.5,
      }
    )

    if (videoRef.current) {
      observer.observe(videoRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [autoplay])

  const videoSrc = shouldPlay
    ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0`
    : ''

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg rounded-2xl overflow-hidden" ref={videoRef}>
      <CardContent className="p-0 aspect-video">
        {videoSrc && (
          <iframe
            width={width}
            height={height}
            className="w-full h-full"
            src={videoSrc}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
      </CardContent>
    </Card>
  )
}
