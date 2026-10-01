'use client'

import React from 'react'
import Link from 'next/link'
import type { Post } from '@/lib/posts'
import { ArrowUpRight, Clock } from 'lucide-react'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
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
      className="group flex flex-col justify-between h-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 p-6 shadow-sm hover:shadow-xl hover:border-cta/40 hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm overflow-hidden"
      aria-label={`Read article: ${title}`}
    >
      <div className="flex flex-col gap-3">
        {/* Category Pill */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-cta/10 text-cta dark:text-purple-300 font-semibold uppercase tracking-wider">
            {primaryCategory}
          </span>

          <span className="text-xs text-softText/80 inline-flex items-center gap-1">
            <Clock className="w-3 h-3 text-softText/60" />
            {post.readingTime}
          </span>
        </div>

        {/* Title — allows full 2-3 lines so it never truncates mid-word */}
        <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[var(--textColor)] group-hover:text-cta transition-colors duration-200 leading-snug line-clamp-2">
          {title}
        </h2>

        {/* Excerpt */}
        <p className="text-sm text-softText line-clamp-3 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Footer: Date & Read Action */}
      <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-200/80 dark:border-slate-800/80 text-xs">
        <time className="text-softText font-medium">{formattedDate}</time>
        <span className="inline-flex items-center gap-1 font-bold text-cta group-hover:translate-x-0.5 transition-transform duration-200">
          Read
          <ArrowUpRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
  )
}
