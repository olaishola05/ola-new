import React from 'react'
import { Metadata } from 'next'
import { getAllPosts } from '@/lib/posts'
import { getAllPostAnalytics } from '@/lib/redis'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/utils/auth'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Blog Analytics - Admin',
  description: 'Detailed performance metrics for your blog posts.',
}

export const revalidate = 0 // No caching for analytics

export default async function AnalyticsPage() {
  const session = await getServerSession(authOptions) as any

  if (!session?.user?.role?.includes('admin') && !session?.user?.role?.includes('author')) {
    redirect('/')
  }

  const [posts, analytics] = await Promise.all([
    getAllPosts(),
    getAllPostAnalytics()
  ])

  // Combine data
  const postStats = posts.map(post => {
    const defaultStats = { views: 0, reads: 0, timeSpent: 0, interactions: 0 }
    const stats = analytics[post.frontmatter.slug] || defaultStats
    const readRatio = stats.views > 0 ? (stats.reads / stats.views) * 100 : 0
    const avgTimeSpent = stats.reads > 0 ? Math.round(stats.timeSpent / stats.reads) : 0

    return {
      title: post.frontmatter.title,
      slug: post.frontmatter.slug,
      date: post.frontmatter.date,
      views: stats.views,
      reads: stats.reads,
      timeSpent: stats.timeSpent,
      avgTimeSpent,
      interactions: stats.interactions,
      readRatio: Math.round(readRatio),
      published: !post.frontmatter.draft
    }
  }).sort((a, b) => b.views - a.views)

  // Totals
  const totalViews = postStats.reduce((acc, curr) => acc + curr.views, 0)
  const totalReads = postStats.reduce((acc, curr) => acc + curr.reads, 0)
  const totalInteractions = postStats.reduce((acc, curr) => acc + curr.interactions, 0)
  const avgReadRatio = postStats.length > 0
    ? Math.round(postStats.reduce((acc, curr) => acc + curr.readRatio, 0) / postStats.length)
    : 0

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto min-h-screen">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-textColor mb-2">Stats</h1>
        <p className="text-softText">Detailed overview of how your stories are performing.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="p-6 rounded-2xl bg-softBg/30 border border-softBg shadow-sm">
          <p className="text-xs font-bold text-softText uppercase tracking-widest mb-2">Total Views</p>
          <p className="text-4xl font-bold text-textColor">{totalViews.toLocaleString()}</p>
        </div>
        <div className="p-6 rounded-2xl bg-softBg/30 border border-softBg shadow-sm">
          <p className="text-xs font-bold text-softText uppercase tracking-widest mb-2">Total Reads</p>
          <p className="text-4xl font-bold text-textColor">{totalReads.toLocaleString()}</p>
        </div>
        <div className="p-6 rounded-2xl bg-softBg/30 border border-softBg shadow-sm">
          <p className="text-xs font-bold text-softText uppercase tracking-widest mb-2">Avg. Ratio</p>
          <p className="text-4xl font-bold text-textColor">{avgReadRatio}%</p>
        </div>
        <div className="p-6 rounded-2xl bg-softBg/30 border border-softBg shadow-sm">
          <p className="text-xs font-bold text-softText uppercase tracking-widest mb-2">Interactions</p>
          <p className="text-4xl font-bold text-textColor">{totalInteractions.toLocaleString()}</p>
        </div>
      </div>

      {/* Posts Table */}
      <div className="bg-softBg/20 rounded-2xl border border-softBg shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-softBg/50 border-b border-softBg">
                <th className="px-6 py-4 text-xs font-bold text-softText uppercase tracking-wider">Story</th>
                <th className="px-6 py-4 text-xs font-bold text-softText uppercase tracking-wider text-center w-32">Views</th>
                <th className="px-6 py-4 text-xs font-bold text-softText uppercase tracking-wider text-center w-32">Avg. Time</th>
                <th className="px-6 py-4 text-xs font-bold text-softText uppercase tracking-wider text-center w-32">Copies</th>
                <th className="px-6 py-4 text-xs font-bold text-softText uppercase tracking-wider text-center w-48">Read Ratio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-softBg">
              {postStats.map((post) => (
                <tr key={post.slug} className="hover:bg-softBg/30 transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <Link
                        href={`/blog/posts/${post.slug}`}
                        className="text-lg font-semibold text-textColor hover:text-cta transition-colors line-clamp-1"
                      >
                        {post.title}
                      </Link>
                      <div className="flex items-center gap-2 mt-1">
                        {!post.published && (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-yellow-100 text-yellow-700 font-bold uppercase">Draft</span>
                        )}
                        <span className="text-xs text-softText">
                          {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center font-medium text-textColor whitespace-nowrap">
                    <div className="flex items-center justify-center gap-1.5 font-bold">
                      <span className="text-softText/40 text-sm">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </span>
                      {post.views.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center font-medium text-textColor whitespace-nowrap">
                    <div className="flex flex-col items-center justify-center">
                      <span className="text-lg font-bold">{formatTime(post.avgTimeSpent)}</span>
                      <span className="text-[10px] text-softText uppercase font-bold tracking-tighter">m:ss / read</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center font-medium text-textColor whitespace-nowrap">
                    <div className="flex items-center justify-center gap-1.5 font-bold text-emerald-500">
                      <svg className="w-4 h-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {post.interactions.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-sm font-bold text-textColor">{post.readRatio}%</span>
                      <div className="w-32 h-2 bg-softBg dark:bg-white/10 rounded-full overflow-hidden shadow-inner">
                        <div
                          className="h-full bg-cta rounded-full shadow-sm transition-all duration-1000"
                          style={{ width: `${post.readRatio}%` }}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {postStats.length === 0 && (
        <div className="text-center py-20">
          <p className="text-softText text-lg italic">No stories published yet.</p>
        </div>
      )}
    </div>
  )
}
