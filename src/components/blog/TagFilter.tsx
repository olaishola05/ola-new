'use client'

import React from 'react'
import Link from 'next/link'

interface TagFilterProps {
  categories: string[]
  activeCategory?: string
}

export default function TagFilter({ categories, activeCategory }: TagFilterProps) {
  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center gap-3">
        {/* "All" button */}
        <Link
          href="/blog"
          className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 border
            ${!activeCategory
              ? 'bg-cta text-ctaText border-cta shadow-lg shadow-cta/20 scale-105'
              : 'bg-softBg/50 text-softText border-transparent hover:border-cta/30 hover:text-cta hover:bg-softBg'
            }`}
        >
          All Posts
        </Link>

        {categories.map((category) => (
          <Link
            key={category}
            href={`/blog?category=${encodeURIComponent(category.toLowerCase())}`}
            className={`px-6 py-2.5 rounded-xl text-sm font-semibold capitalize transition-all duration-300 border
              ${activeCategory?.toLowerCase() === category.toLowerCase()
                ? 'bg-cta text-ctaText border-cta shadow-lg shadow-cta/20 scale-105'
                : 'bg-softBg/50 text-softText border-transparent hover:border-cta/30 hover:text-cta hover:bg-softBg'
              }`}
          >
            {category}
          </Link>
        ))}
      </div>
    </div>
  )
}
