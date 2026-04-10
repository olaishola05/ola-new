import { cache } from 'react'
import path from 'path'
import fs from 'fs/promises'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { remark } from 'remark'
import { headingTree } from './toc'

// ─── Types ──────────────────────────────────────────────────────────

export interface PostFrontmatter {
  title: string
  description: string
  slug: string
  date: string
  tags: string[]
  category: string
  coverImage?: string
  draft?: boolean
}

export interface Post {
  frontmatter: PostFrontmatter
  body: string
  readingTime: string
}

// ─── Site Config (re-export for convenience) ───────────────────────

export { SITE_CONFIG } from './config'
import { SITE_CONFIG } from './config'

// ─── Content Provider ───────────────────────────────────────────────

const postsDirectory = path.join(process.cwd(), 'posts')

/**
 * Returns true if we are in production (i.e., the Vercel production deployment).
 * Preview deployments and local dev will show drafts.
 */
function isProductionEnv(): boolean {
  return process.env.VERCEL_ENV === 'production'
}

/**
 * Read and parse all markdown posts from the /posts directory.
 * Uses React cache() for request-level deduplication.
 */
export const getAllPosts = cache(async (): Promise<Post[]> => {
  const files = await fs.readdir(postsDirectory)
  const mdFiles = files.filter((file) => file.endsWith('.md'))

  const posts = await Promise.all(
    mdFiles.map(async (file) => {
      const filePath = path.join(postsDirectory, file)
      const raw = await fs.readFile(filePath, 'utf-8')
      const { data, content } = matter(raw)

      const frontmatter = data as PostFrontmatter

      // Fallback for missing slug: use filename without extension
      if (!frontmatter.slug) {
        frontmatter.slug = file.replace(/\.mdx?$/, '')
      }

      // Ensure draft defaults to false
      if (frontmatter.draft === undefined) {
        frontmatter.draft = false
      }

      // Ensure category defaults to 'General'
      if (!frontmatter.category) {
        frontmatter.category = 'General'
      }

      const stats = readingTime(content)

      return {
        frontmatter,
        body: content,
        readingTime: stats.text,
      } satisfies Post
    })
  )

  return posts
})

/**
 * Get all published posts (exclude drafts in production), sorted by date descending.
 */
export const getPublishedPosts = cache(async (): Promise<Post[]> => {
  const allPosts = await getAllPosts()
  const isProduction = isProductionEnv()

  return allPosts
    .filter((post) => {
      if (isProduction) return !post.frontmatter.draft
      return true // Show everything in dev/preview
    })
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    )
})

/**
 * Get a single post by its slug.
 */
export const getPostBySlug = cache(
  async (slug: string): Promise<Post | null> => {
    const posts = await getPublishedPosts()
    return posts.find((post) => post.frontmatter.slug === slug) ?? null
  }
)

/**
 * Get minimal post data for search indexing.
 */
export const getSearchIndex = cache(async () => {
  const posts = await getPublishedPosts()
  return posts.map(post => ({
    title: post.frontmatter.title,
    slug: post.frontmatter.slug,
    date: post.frontmatter.date,
    tags: post.frontmatter.tags,
    category: post.frontmatter.category,
    description: post.frontmatter.description,
  }))
})

/**
 * Get all unique tags from published posts.
 */
export const getAllTags = cache(async (): Promise<string[]> => {
  const posts = await getPublishedPosts()
  const tagSet = new Set<string>()
  posts.forEach((post) => {
    post.frontmatter.tags.forEach((tag) => tagSet.add(tag.toLowerCase()))
  })
  return Array.from(tagSet).sort()
})

/**
 * Get all unique categories from published posts.
 */
export const getAllCategories = cache(async (): Promise<string[]> => {
  const posts = await getPublishedPosts()
  const categorySet = new Set<string>()
  posts.forEach((post) => {
    if (post.frontmatter.category) {
      categorySet.add(post.frontmatter.category)
    }
  })
  return Array.from(categorySet).sort()
})

/**
 * Get categories with post counts.
 */
export const getCategoryCounts = cache(async () => {
  const posts = await getPublishedPosts()
  const counts: Record<string, number> = {}

  posts.forEach(post => {
    const category = post.frontmatter.category || 'General'
    counts[category] = (counts[category] || 0) + 1
  })

  return Object.entries(counts).map(([name, count]) => ({
    name,
    count,
    slug: name.toLowerCase()
  })).sort((a, b) => b.count - a.count)
})

/**
 * Get tags with post counts.
 */
export const getTagCounts = cache(async () => {
  const posts = await getPublishedPosts()
  const counts: Record<string, number> = {}

  posts.forEach(post => {
    post.frontmatter.tags.forEach(tag => {
      counts[tag] = (counts[tag] || 0) + 1
    })
  })

  return Object.entries(counts).map(([name, count]) => ({
    name,
    count,
    slug: name.toLowerCase()
  })).sort((a, b) => b.count - a.count)
})

/**
 * Get published posts filtered by tag.
 */
export const getPostsByTag = cache(
  async (tag: string): Promise<Post[]> => {
    const posts = await getPublishedPosts()
    return posts.filter((post) =>
      post.frontmatter.tags
        .map((t) => t.toLowerCase())
        .includes(tag.toLowerCase())
    )
  }
)

/**
 * Get published posts filtered by category.
 */
export const getPostsByCategory = cache(
  async (category: string): Promise<Post[]> => {
    const posts = await getPublishedPosts()
    return posts.filter((post) =>
      post.frontmatter.category.toLowerCase() === category.toLowerCase()
    )
  }
)

/**
 * Get paginated published posts.
 */
export const getPaginatedPosts = cache(
  async (
    page: number,
    postsPerPage: number = SITE_CONFIG.postsPerPage,
    filter?: { tag?: string; category?: string }
  ): Promise<{ posts: Post[]; totalPages: number; currentPage: number }> => {
    let allPosts = await getPublishedPosts()

    if (filter?.category) {
      allPosts = allPosts.filter(p => p.frontmatter.category.toLowerCase() === filter.category?.toLowerCase())
    } else if (filter?.tag) {
      allPosts = allPosts.filter(p => p.frontmatter.tags.map(t => t.toLowerCase()).includes(filter.tag!.toLowerCase()))
    }

    const totalPages = Math.ceil(allPosts.length / postsPerPage)
    const startIndex = (page - 1) * postsPerPage
    const posts = allPosts.slice(startIndex, startIndex + postsPerPage)

    return { posts, totalPages, currentPage: page }
  }
)

/**
 * Get the latest N published posts.
 */
export const getLatestPosts = cache(
  async (count: number = 3): Promise<Post[]> => {
    const posts = await getPublishedPosts()
    return posts.slice(0, count)
  }
)

/**
 * Get related posts (same tags, excluding current post).
 */
export const getRelatedPosts = cache(
  async (slug: string, count: number = 2): Promise<Post[]> => {
    const currentPost = await getPostBySlug(slug)
    if (!currentPost) return []

    const allPosts = await getPublishedPosts()
    const otherPosts = allPosts.filter((p) => p.frontmatter.slug !== slug)

    // Score posts by category (high weight) and shared tags
    const scored = otherPosts.map((post) => {
      let score = 0

      // Category match is high value
      if (post.frontmatter.category === currentPost.frontmatter.category) {
        score += 5
      }

      // Shared tags
      const sharedTags = post.frontmatter.tags.filter((tag) =>
        currentPost.frontmatter.tags
          .map((t) => t.toLowerCase())
          .includes(tag.toLowerCase())
      )

      score += sharedTags.length

      return { post, score }
    })

    // Sort by score, then by date
    scored.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score
      return (
        new Date(b.post.frontmatter.date).getTime() -
        new Date(a.post.frontmatter.date).getTime()
      )
    })

    return scored.slice(0, count).map((s) => s.post)
  }
)

/**
 * Get table of contents headings from a post's body.
 */
export const getPostHeadings = cache(async (body: string) => {
  const result = await remark().use(headingTree).process(body)
  return (result.data.headings as any[]) || []
})
