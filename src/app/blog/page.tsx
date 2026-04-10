import React from 'react'
import { Metadata } from 'next'
import { getPaginatedPosts, getCategoryCounts, getTagCounts, SITE_CONFIG } from '@/lib/posts'
import Link from 'next/link'
import BlogHero from '@/components/blog/BlogHero'
import PostGrid from '@/components/blog/PostGrid'
import SmartSidebar from '@/components/blog/SmartSidebar'
import Pagination from '@/components/blog/Pagination'

export const revalidate = 3600 // ISR: Revalidate every 1 hour

export const metadata: Metadata = {
  title: `Blog | ${SITE_CONFIG.author}`,
  description: SITE_CONFIG.blogDescription,
  openGraph: {
    title: `Blog | ${SITE_CONFIG.author}`,
    description: SITE_CONFIG.blogDescription,
    type: 'website',
    url: `${SITE_CONFIG.siteUrl}/blog`,
  },
}

interface BlogPageProps {
  searchParams: { page?: string; tag?: string; category?: string }
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const page = parseInt(searchParams.page || '1', 10)
  const activeTag = searchParams.tag || undefined
  const activeCategory = searchParams.category || undefined

  const [{ posts, totalPages, currentPage }, categoryCounts, tagCounts] = await Promise.all([
    getPaginatedPosts(page, SITE_CONFIG.postsPerPage, { tag: activeTag, category: activeCategory }),
    getCategoryCounts(),
    getTagCounts(),
  ])

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
      <BlogHero />

      <div className="flex flex-col lg:flex-row gap-12 mt-12">
        {/* Main Content Area */}
        <div className="flex-1 min-w-0">
          {/* Active filter indicator */}
          {(activeTag || activeCategory) && (
            <div className="mb-10 bg-softBg/30 p-6 rounded-2xl border border-softBg flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-softText uppercase tracking-widest mb-1">Filtering by</p>
                <h2 className="text-2xl font-bold text-textColor capitalize">
                  {activeCategory || activeTag}
                </h2>
              </div>
              <Link href="/blog" className="text-xs font-bold text-cta hover:underline">Clear Filter</Link>
            </div>
          )}

          {/* Post Grid */}
          <PostGrid posts={posts} />

          {/* Pagination */}
          <div className="mt-16">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              tag={activeTag}
              category={activeCategory}
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-80 shrink-0">
          <div className="sticky top-24">
            <SmartSidebar
              categories={categoryCounts}
              popularTags={tagCounts}
              activeCategory={activeCategory}
              activeTag={activeTag}
            />
          </div>
        </div>
      </div>

      <div className="h-24" />
    </div>
  )
}
