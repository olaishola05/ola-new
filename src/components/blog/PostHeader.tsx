'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Post } from '@/lib/posts'
import { SITE_CONFIG } from '@/lib/config'
import { Calendar, Clock, Check, Link as LinkIcon } from 'lucide-react'

interface PostHeaderProps {
  post: Post
}

export default function PostHeader({ post }: PostHeaderProps) {
  const { title, description, date, tags, category, coverImage } = post.frontmatter
  const [copied, setCopied] = useState(false)

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  const primaryCategory = category || tags[0] || 'Article'
  const hasCoverImage = coverImage && coverImage.trim() !== ''

  const handleCopyLink = async () => {
    if (typeof window === 'undefined') return
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy', err)
    }
  }

  return (
    <header className="mb-10 text-left relative pt-2">
      {/* Top Meta Bar: Category + Date + Reading Time */}
      <div className="flex flex-wrap items-center gap-2.5 mb-5">
        <Link
          href={`/blog?category=${encodeURIComponent(primaryCategory.toLowerCase())}`}
          className="px-3 py-1 rounded-full bg-cta text-ctaText text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
        >
          {primaryCategory}
        </Link>

        <span className="text-softText/40 font-bold">·</span>

        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-softText">
          <Calendar className="w-3.5 h-3.5 text-softText/70" />
          {formattedDate}
        </span>

        <span className="text-softText/40 font-bold">·</span>

        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-softText">
          <Clock className="w-3.5 h-3.5 text-softText/70" />
          {post.readingTime}
        </span>
      </div>

      {/* Headline: Clean, left-aligned, right-sized for editorial readability */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--textColor)] tracking-tight leading-[1.15] mb-5">
        {title}
      </h1>

      {/* Subtitle / Excerpt */}
      {description && (
        <p className="text-lg md:text-xl text-softText leading-relaxed mb-8 font-normal">
          {description}
        </p>
      )}

      {/* Author & Quick Copy Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-slate-200/80 dark:border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="relative w-11 h-11 rounded-full overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm shrink-0">
            <Image
              src={SITE_CONFIG.authorAvatar}
              alt={SITE_CONFIG.author}
              fill
              className="object-cover"
              sizes="44px"
            />
          </div>
          <div>
            <span className="block text-sm font-bold text-[var(--textColor)]">
              {SITE_CONFIG.author}
            </span>
            <span className="block text-xs text-softText">
              Product Engineer &amp; AI Researcher
            </span>
          </div>
        </div>

        {/* Quick copy link action */}
        <button
          type="button"
          onClick={handleCopyLink}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-softText hover:text-cta transition-all"
          aria-label="Copy article link"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-emerald-500">Copied!</span>
            </>
          ) : (
            <>
              <LinkIcon className="w-3.5 h-3.5" />
              <span>Copy Link</span>
            </>
          )}
        </button>
      </div>

      {/* Cover Image (if present) */}
      {hasCoverImage && (
        <div className="relative w-full h-[280px] sm:h-[400px] md:h-[480px] rounded-3xl overflow-hidden mt-8 border border-slate-200 dark:border-slate-800 shadow-lg">
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 768px"
            priority
          />
        </div>
      )}
    </header>
  )
}
