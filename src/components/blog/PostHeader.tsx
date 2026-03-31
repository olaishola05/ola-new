import React from 'react'
import Image from 'next/image'
import type { Post } from '@/lib/posts'
import { SITE_CONFIG } from '@/lib/posts'
import ViewCounter from './ViewCounter'

interface PostHeaderProps {
  post: Post
}

export default function PostHeader({ post }: PostHeaderProps) {
  const { title, description, date, tags, coverImage, slug } =
    post.frontmatter

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const hasCoverImage = coverImage && coverImage.trim() !== ''

  return (
    <header className="mb-12 md:mb-20 text-center relative pt-8">
      {/* Date at the Top */}
      <div className="mb-6">
        <span className="text-sm font-medium tracking-[0.2em] uppercase text-softText/60">
          {formattedDate}
        </span>
      </div>

      {/* Title */}
      <h1 className="text-4xl md:text-7xl font-bold text-textColor tracking-tight leading-[1.1] mb-8 max-w-4xl mx-auto">
        {title}
      </h1>

      {/* Subtitle/Description */}
      {description && (
        <p className="text-lg md:text-xl text-softText max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
          {description}
        </p>
      )}

      {/* Author Section */}
      <div className="flex items-center justify-center gap-3">
        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-softBg shadow-sm">
          <Image
            src={SITE_CONFIG.authorAvatar}
            alt={SITE_CONFIG.author}
            fill
            className="object-cover"
            sizes="40px"
          />
        </div>
        <span className="text-lg font-semibold text-textColor">
          {SITE_CONFIG.author}
        </span>
      </div>

      {/* Cover image (Optional, but if present make it huge) */}
      {hasCoverImage && (
        <div className="relative w-full h-[300px] md:h-[600px] rounded-3xl overflow-hidden mt-16 group">
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      )}

      <div className="mt-12 max-w-xs mx-auto">
        <hr className="border-softBg" />
      </div>
    </header>
  )
}
