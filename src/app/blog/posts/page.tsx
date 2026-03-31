import React from 'react'
import { Metadata } from 'next'
import { getPaginatedPosts, getAllCategories, SITE_CONFIG } from '@/lib/posts'
import PostGrid from '@/components/blog/PostGrid'
import TagFilter from '@/components/blog/TagFilter'
import Pagination from '@/components/blog/Pagination'

export const revalidate = 3600

export const metadata: Metadata = {
  title: `All Posts | ${SITE_CONFIG.author}`,
  description: 'Browse all blog posts by category.',
}

interface PostsPageProps {
  searchParams: { page?: string; cat?: string; tag?: string; category?: string }
}

export default async function PostsPage({ searchParams }: PostsPageProps) {
  const page = parseInt(searchParams.page || '1', 10)
  const activeCategory = searchParams.category || searchParams.cat || undefined
  const activeTag = searchParams.tag || undefined

  const [{ posts, totalPages, currentPage }, categories] = await Promise.all([
    getPaginatedPosts(page, SITE_CONFIG.postsPerPage, { category: activeCategory, tag: activeTag }),
    getAllCategories(),
  ])

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-8 mt-8">
      <h1 className="text-3xl md:text-5xl font-bold text-textColor mb-8">
        {activeCategory || activeTag ? (
          <>
            Posts in{' '}
            <span className="text-cta capitalize">{activeCategory || activeTag}</span>
          </>
        ) : (
          'All Posts'
        )}
      </h1>

      <div className="mb-8">
        <TagFilter categories={categories} activeCategory={activeCategory} />
      </div>

      <PostGrid posts={posts} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        basePath="/blog/posts"
        tag={activeTag}
        category={activeCategory}
      />

      <div className="h-16" />
    </div>
  )
}
