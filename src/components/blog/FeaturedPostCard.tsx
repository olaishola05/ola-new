'use client'

import React from 'react'
import Link from 'next/link'
import type { Post } from '@/lib/posts'
import { ArrowUpRight, Clock, Calendar, Sparkles } from 'lucide-react'

interface FeaturedPostCardProps {
  post: Post
}

export default function FeaturedPostCard({ post }: FeaturedPostCardProps) {
  const { title, description, slug, date, category, tags } = post.frontmatter

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  const primaryCategory = category || tags[0] || 'Article'

  return (
    <Link
      href={`/blog/posts/${slug}`}
      className="group relative block rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 p-6 sm:p-8 md:p-10 shadow-sm hover:shadow-2xl hover:border-cta/40 hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm overflow-hidden mb-8"
      aria-label={`Read featured article: ${title}`}
    >
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-cta/10 via-purple-500/5 to-transparent rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-500" />

      <div className="relative z-10 flex flex-col gap-4">
        {/* Top Badges */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cta text-ctaText text-xs font-bold uppercase tracking-wider shadow-sm shadow-cta/20">
            <Sparkles className="w-3 h-3" />
            Featured Story
          </span>

          <span className="px-3 py-1 rounded-full bg-cta/10 text-cta dark:text-purple-300 text-xs font-semibold uppercase tracking-wider">
            {primaryCategory}
          </span>
        </div>

        {/* Title — large, unclipped, elegant */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--textColor)] group-hover:text-cta transition-colors duration-200 leading-tight">
          {title}
        </h2>

        {/* Description */}
        <p className="text-base sm:text-lg text-softText leading-relaxed max-w-3xl line-clamp-3">
          {description}
        </p>

        {/* Footer Meta Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 mt-2 border-t border-slate-200/80 dark:border-slate-800/80">
          <div className="flex items-center gap-3 text-xs sm:text-sm text-softText">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-softText/70" />
              {formattedDate}
            </span>
            <span>·</span>
            <span className="inline-flex items-center gap-1.5 font-medium">
              <Clock className="w-3.5 h-3.5 text-softText/70" />
              {post.readingTime}
            </span>
          </div>

          <span className="inline-flex items-center gap-1.5 text-sm font-bold text-cta group-hover:translate-x-1 transition-transform duration-200">
            Read Article
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  )
}
