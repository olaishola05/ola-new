'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Post } from '@/lib/posts'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  const { title, description, slug, date, tags, coverImage } =
    post.frontmatter

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const hasCoverImage = coverImage && coverImage.trim() !== ''

  return (
    <Link
      href={`/blog/posts/${slug}`}
      className="group block rounded-xl overflow-hidden bg-softBg hover:shadow-xl 
        transition-all duration-300 ease-out hover:-translate-y-1 border border-transparent
        hover:border-[var(--cta)]/20"
    >
      {/* Cover Image or Gradient Placeholder */}
      <div className="hidden relative w-full h-48 md:h-52 overflow-hidden">
        {hasCoverImage ? (
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="hidden w-full h-full bg-gradient-to-br from-[var(--cta)] via-purple-500 to-indigo-600 flexs items-center justify-center">
            <span className="text-5xl font-bold text-white/20 select-none">
              {title.charAt(0).toUpperCase()}
            </span>
          </div>
        )}

        {/* Reading time pill */}
        <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full">
          {post.readingTime}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3">
        {/* Tags */}
        <div className="flex gap-1.5 flex-wrap">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full bg-[var(--cta)]/10 text-cta font-medium capitalize"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h2 className="text-lg md:text-xl font-semibold text-textColor line-clamp-2 group-hover:text-cta transition-colors duration-200">
          {title}
        </h2>

        {/* Description */}
        <p className="text-sm text-softText line-clamp-3 leading-relaxed">
          {description}
        </p>

        {/* Footer: Date */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-[var(--softBg)]">
          <time className="text-xs text-softText">{formattedDate}</time>
          <span className="text-xs text-cta font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Read →
          </span>
        </div>
      </div>
    </Link>
  )
}
