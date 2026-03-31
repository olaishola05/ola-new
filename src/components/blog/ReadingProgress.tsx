'use client'

import React, { useEffect, useState } from 'react'

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight <= 0) return
      const scrollPercent = (scrollTop / docHeight) * 100
      setProgress(Math.min(scrollPercent, 100))
    }

    window.addEventListener('scroll', updateProgress, { passive: true })
    updateProgress()

    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[3px] z-50 transition-none"
      style={{ background: 'transparent' }}
    >
      <div
        className="h-full bg-gradient-to-r from-[var(--cta)] to-purple-500 transition-none"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
