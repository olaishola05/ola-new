'use client'

import React from 'react'
import { SITE_CONFIG } from '@/lib/config'

export default function BlogHero() {
  return (
    <section className="relative w-full pt-10 pb-12 md:pt-16 md:pb-16">
      {/* Decorative gradient accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--cta)] via-purple-400 to-[var(--cta)] opacity-60" />

      <div className="max-w-3xl mx-auto text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
          <span className="text-cta">{SITE_CONFIG.blogTitle}</span>
        </h1>
        <p className="text-textColor text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
          {SITE_CONFIG.blogDescription}
        </p>
      </div>
    </section>
  )
}
