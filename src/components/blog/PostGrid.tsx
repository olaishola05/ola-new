import React from 'react'
import type { Post } from '@/lib/posts'
import PostCard from './PostCard'
import FeaturedPostCard from './FeaturedPostCard'

interface PostGridProps {
  posts: Post[]
  showFeatured?: boolean
}

export default function PostGrid({ posts, showFeatured = true }: PostGridProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-20 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 p-8">
        <div className="text-5xl mb-4">📝</div>
        <h3 className="text-xl font-bold text-[var(--textColor)] mb-2">
          No articles found
        </h3>
        <p className="text-softText text-sm max-w-sm mx-auto">
          Try clearing your filter or checking back soon for new publications.
        </p>
      </div>
    )
  }

  const featuredPost = showFeatured && posts.length > 0 ? posts[0] : null
  const gridPosts = featuredPost ? posts.slice(1) : posts

  return (
    <div>
      {/* Flagship Featured Article */}
      {featuredPost && <FeaturedPostCard post={featuredPost} />}

      {/* Spacious 2-Column Supporting Grid — ensures zero title truncation */}
      {gridPosts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {gridPosts.map((post) => (
            <PostCard key={post.frontmatter.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
