'use client';

import React from 'react'
import Link from 'next/link'

export default function FooterTags({ cats }: { cats: string[] }) {
  return (
    <>
      {cats.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-1">
          {cats?.slice(0, 6).map((title: string, index: number) => (
            <Link
              href={`/blog/posts?cat=${title}`}
              passHref={true}
              key={index}
              className="text-xs px-3 py-1.5 rounded-full bg-softBg text-textColor border border-cta/20 hover:border-cta/50 hover:bg-cta hover:text-ctaText transition-colors font-medium capitalize"
            >
              {title}
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
