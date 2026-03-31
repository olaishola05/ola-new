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
import Subscribe from '@/components/Subscribe/Subscribe'
import EngagementTracker from '@/components/Analytic/EngagementTracker'
import SharePost from '@/components/blog/SharePost'

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
    title: `${title} | ${SITE_CONFIG.author}`,
    description,
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.frontmatter.title,
            "image": post.frontmatter.coverImage ? [post.frontmatter.coverImage] : [SITE_CONFIG.authorAvatar],
            "datePublished": post.frontmatter.date,
            "author": [{
              "@type": "Person",
              "name": SITE_CONFIG.author,
              "url": SITE_CONFIG.siteUrl
            }]
          })
        }}
      />
      
      <ReadingProgress />

      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 mt-4 md:mt-12">
        <BackButton />

        <div className="flex flex-col md:flex-row gap-10 lg:gap-16 relative">
          {/* Main Content */}
          <article className="w-full md:w-[65%] lg:w-[70%] xl:w-[75%] min-w-0">
            <PostHeader post={post} />

            <div id="post-content" className="prose prose-lg dark:prose-invert max-w-none
              prose-headings:text-textColor prose-headings:font-bold prose-headings:tracking-tight
              prose-h1:text-3xl md:prose-h1:text-4xl prose-h1:mb-8
              prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-b prose-h2:border-softBg prose-h2:pb-2
              prose-h3:text-xl md:prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
              prose-p:text-textColor/90 prose-p:leading-relaxed prose-p:mb-6
              prose-a:text-cta prose-a:no-underline hover:prose-a:underline font-medium
              prose-strong:text-textColor prose-strong:font-bold
              prose-code:text-cta prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
              prose-blockquote:border-l-4 prose-blockquote:border-cta prose-blockquote:bg-softBg/30 prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:italic
              prose-li:text-textColor/90 prose-li:my-1
              prose-img:rounded-2xl prose-img:shadow-lg
              mt-10">
              <CustomMDX source={post.body} />
            </div>

            {/* Tags at bottom */}
            <div className="flex gap-2 flex-wrap mt-16 pt-8 border-t border-softBg">
              {post.frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm px-4 py-2 rounded-full bg-softBg text-textColor border border-cta/20 hover:border-cta/50 transition-colors font-medium capitalize cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Share Post */}
            <SharePost title={post.frontmatter.title} slug={params.slug} />

            {/* Related Posts */}
            <RelatedPosts posts={relatedPosts} currentCategory={post.frontmatter.category} />

            {/* Subscribe */}
            <div className="mt-12 pt-8 border-t border-softBg">
              <Subscribe />
            </div>

            {/* Read Tracker & Engagement */}
            <ReadTracker slug={params.slug} />
            <EngagementTracker slug={params.slug} />
          </article>

          {/* Sidebar: Table of Contents */}
          <aside className="hidden md:block w-[35%] lg:w-[30%] xl:w-[25%] self-start sticky top-24 h-fit">
            {headings.length > 0 && (
              <div className="p-6 rounded-2xl bg-softBg/30 border border-softBg backdrop-blur-sm">
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
