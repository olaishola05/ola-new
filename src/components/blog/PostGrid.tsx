import React from 'react'
import type { Post } from '@/lib/posts'
import PostCard from './PostCard'

interface PostGridProps {
  posts: Post[]
}

export default function PostGrid({ posts }: PostGridProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">📝</div>
        <h3 className="text-xl font-semibold text-textColor mb-2">
          No posts yet
        </h3>
        <p className="text-softText">
          Check back soon — new articles are on the way!
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {posts.map((post) => (
        <PostCard key={post.frontmatter.slug} post={post} />
      ))}
    </div>
  )
}
