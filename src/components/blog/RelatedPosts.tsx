import React from 'react'
import Link from 'next/link'
import type { Post } from '@/lib/posts'

interface RelatedPostsProps {
  posts: Post[]
  currentCategory?: string
}

export default function RelatedPosts({ posts, currentCategory }: RelatedPostsProps) {
  if (posts.length === 0) return null

  return (
    <section className="mt-20 pt-12 border-t border-softBg">
      <div className="flex flex-col gap-2 mb-10">
        <div className="flex items-center gap-2">
          <div className="h-px w-8 bg-cta" />
          <span className="text-xs font-bold uppercase tracking-widest text-cta">Next Up</span>
        </div>
        <h2 className="text-3xl font-extrabold text-textColor tracking-tight">
          {currentCategory
            ? `More on ${currentCategory}`
            : 'Continue Reading'
          }
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post) => {
          const { title, slug, description, date, tags } = post.frontmatter
          const formattedDate = new Date(date).toLocaleDateString('en-US', {
            month: 'short', day: 'numeric', year: 'numeric'
          })

          return (
            <Link
              key={slug}
              href={`/blog/posts/${slug}`}
              className="group block"
            >
              <div className="mb-4 overflow-hidden rounded-2xl bg-softBg aspect-[16/9] relative border border-softBg transition-all duration-500 group-hover:border-cta/20 group-hover:shadow-2xl group-hover:shadow-cta/10">
                {/* Placeholder for future thumbnail integration */}
                <div className="absolute inset-0 bg-gradient-to-br from-cta/5 to-softBg flex items-center justify-center">
                  <span className="text-cta opacity-20 font-black text-4xl transform -rotate-12 group-hover:scale-110 transition-transform duration-500">
                    {tags[0] || 'Article'}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-softText">
                  <span>{formattedDate}</span>
                  <span className="w-1 h-1 rounded-full bg-softBg" />
                  <span className="text-cta">{post.readingTime}</span>
                </div>

                <h3 className="text-xl font-bold text-textColor group-hover:text-cta transition-colors line-clamp-2 leading-snug">
                  {title}
                </h3>

                <p className="text-sm text-softText line-clamp-2 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                  {description}
                </p>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
