import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  getPublishedPosts,
  getPostBySlug,
  getRelatedPosts,
  getPostHeadings,
  SITE_CONFIG,
} from '@/lib/posts'
import CustomMDX from '@/components/MDX/custom-mdx'
import PostHeader from '@/components/blog/PostHeader'
import ReadingProgress from '@/components/blog/ReadingProgress'
import ReadTracker from '@/components/blog/ReadTracker'
import RelatedPosts from '@/components/blog/RelatedPosts'
import BackButton from '@/components/blog/BackButton'
import TableOfContents from '@/components/MDX/toc-component'
import EngagementTracker from '@/components/Analytic/EngagementTracker'
import SharePost from '@/components/blog/SharePost'
import Link from 'next/link'

export const revalidate = 3600 // ISR: Revalidate every 1 hour

// ─── Static Params (ISR) ───────────────────────────────────────────

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = await getPublishedPosts()
  return posts.map((post) => ({ slug: post.frontmatter.slug }))
}

// ─── Dynamic Metadata (SEO + OG) ──────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return { title: 'Post Not Found' }
  }

  const { title, description, date, tags, coverImage, slug } =
    post.frontmatter

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_CONFIG.siteUrl}/blog/posts/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: date,
      authors: [SITE_CONFIG.author],
      tags,
      url: `${SITE_CONFIG.siteUrl}/blog/posts/${slug}`,
      images: coverImage
        ? [{ url: coverImage, width: 1200, height: 630, alt: title }]
        : [
          {
            url: SITE_CONFIG.authorAvatar,
            width: 400,
            height: 400,
            alt: SITE_CONFIG.author,
          },
        ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: coverImage ? [coverImage] : [SITE_CONFIG.authorAvatar],
    },
  }
}

// ─── Page Component ────────────────────────────────────────────────

export default async function SinglePostPage({
  params,
}: {
  params: { slug: string }
}) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const [relatedPosts, headings] = await Promise.all([
    getRelatedPosts(params.slug, 2),
    getPostHeadings(post.body),
  ])

  const postUrl = `${SITE_CONFIG.siteUrl}/blog/posts/${post.frontmatter.slug}`

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": postUrl
            },
            "headline": post.frontmatter.title,
            "description": post.frontmatter.description || '',
            "image": post.frontmatter.coverImage ? [post.frontmatter.coverImage] : [SITE_CONFIG.authorAvatar],
            "datePublished": post.frontmatter.date,
            "dateModified": post.frontmatter.date,
            "author": [{
              "@type": "Person",
              "name": SITE_CONFIG.author,
              "url": SITE_CONFIG.siteUrl
            }],
            "publisher": {
              "@type": "Person",
              "name": SITE_CONFIG.author,
              "url": SITE_CONFIG.siteUrl
            }
          })
        }}
      />
      
      <ReadingProgress />

      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 mt-4 md:mt-8">
        <BackButton />

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 relative justify-between">
          {/* Main Content — constrained to max-w-3xl for optimal typographical measure */}
          <article className="w-full lg:max-w-3xl min-w-0 flex-1">
            <PostHeader post={post} />

            <div id="post-content" className="prose prose-lg dark:prose-invert max-w-none
              prose-headings:text-[var(--textColor)] prose-headings:font-extrabold prose-headings:tracking-tight
              prose-h1:text-3xl sm:prose-h1:text-4xl prose-h1:mt-12 prose-h1:mb-6
              prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:font-extrabold prose-h2:mt-14 prose-h2:mb-5 prose-h2:scroll-mt-24
              prose-h3:text-xl sm:prose-h3:text-2xl prose-h3:font-bold prose-h3:mt-10 prose-h3:mb-4 prose-h3:scroll-mt-24
              prose-h4:text-lg sm:prose-h4:text-xl prose-h4:font-bold prose-h4:mt-8 prose-h4:mb-3 prose-h4:scroll-mt-24
              prose-p:text-[17px] sm:prose-p:text-[18px] prose-p:leading-[1.8] prose-p:text-[var(--textColor)]/90 prose-p:mb-6
              prose-a:text-[#8257e5] dark:prose-a:text-[#a78bfa] prose-a:font-semibold prose-a:underline prose-a:underline-offset-4 prose-a:decoration-[#8257e5]/30 hover:prose-a:decoration-[#8257e5] transition-all
              prose-strong:text-[var(--textColor)] prose-strong:font-bold
              prose-code:text-[#8257e5] dark:prose-code:text-[#c4b5fd] prose-code:bg-purple-500/10 dark:prose-code:bg-purple-500/15 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-[0.875em] prose-code:font-mono prose-code:font-medium prose-code:border prose-code:border-[#8257e5]/20 dark:prose-code:border-[#8257e5]/30 prose-code:before:content-none prose-code:after:content-none
              prose-blockquote:border-l-4 prose-blockquote:border-cta prose-blockquote:bg-cta/5 prose-blockquote:py-3 prose-blockquote:px-6 prose-blockquote:rounded-r-2xl prose-blockquote:text-[1.05em] prose-blockquote:leading-relaxed prose-blockquote:italic prose-blockquote:my-8 prose-blockquote:border-y-0 prose-blockquote:border-r-0
              prose-ul:my-6 prose-ol:my-6 prose-li:text-[17px] sm:prose-li:text-[18px] prose-li:leading-[1.8] prose-li:text-[var(--textColor)]/90 prose-li:my-2
              mt-8">
              <CustomMDX source={post.body} />
            </div>

            {/* Clickable Tags at bottom */}
            <div className="flex items-center gap-2.5 flex-wrap mt-14 pt-8 border-t border-slate-200/80 dark:border-slate-800/80">
              <span className="text-xs font-bold uppercase tracking-wider text-softText mr-1">
                Tagged in:
              </span>
              {post.frontmatter.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${encodeURIComponent(tag.toLowerCase())}`}
                  className="text-xs px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 border border-slate-300 dark:border-slate-700 hover:border-cta/50 hover:text-cta dark:hover:text-purple-300 transition-all font-semibold capitalize shadow-sm"
                >
                  #{tag}
                </Link>
              ))}
            </div>

            {/* Share Post */}
            <SharePost title={post.frontmatter.title} slug={params.slug} />

            {/* Related Posts */}
            <RelatedPosts posts={relatedPosts} currentCategory={post.frontmatter.category} />

            {/* Read Tracker & Engagement */}
            <ReadTracker slug={params.slug} />
            <EngagementTracker slug={params.slug} />
          </article>

          {/* Sidebar: Table of Contents */}
          <aside className="hidden lg:block w-72 shrink-0 self-start sticky top-24">
            {headings.length > 0 && (
              <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 backdrop-blur-sm max-h-[calc(100vh-8rem)] overflow-y-auto">
                <TableOfContents nodes={headings} />
              </div>
            )}
          </aside>
        </div>
      </div>

      <div className="h-16" />
    </>
  )
}
