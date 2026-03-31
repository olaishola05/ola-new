import React from 'react'
import Link from 'next/link'

interface BackButtonProps {
  referrer?: string | null
}

export default function BackButton({ referrer }: BackButtonProps) {
  return (
    <Link
      href="/blog"
      className="inline-flex items-center gap-2 text-sm text-softText hover:text-cta transition-colors duration-200 mb-6"
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      Back to Blog
    </Link>
  )
}
