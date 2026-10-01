import { MetadataRoute } from 'next'
import { getPublishedPosts } from '@/lib/posts'
import { getMediumPosts } from '@/queries/queries'
import { SITE_CONFIG } from '@/lib/config'
import prisma from '@/app/lib/prisma'

const slugTitle = (title: string) => {
  return title.replace(/[^a-z0-9]+/gi, '-').toLowerCase()
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.siteUrl

  // 1. Core Static Routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/business`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/testimonial`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/links`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]

  // 2. Published Projects (Case Studies)
  let projectRoutes: MetadataRoute.Sitemap = []
  try {
    const publishedProjects = await prisma.project.findMany({
      where: { published: true },
      select: { name: true, updatedAt: true },
    })
    projectRoutes = publishedProjects.map((project) => ({
      url: `${baseUrl}/projects/${slugTitle(project.name)}`,
      lastModified: project.updatedAt ? new Date(project.updatedAt) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))
  } catch (error) {
    console.error('Could not fetch projects for sitemap, skipping:', error)
  }

  // 3. Local MDX Blog Posts (Correct /blog/posts/[slug] route)
  let localPostRoutes: MetadataRoute.Sitemap = []
  try {
    const publishedLocalPosts = await getPublishedPosts()
    localPostRoutes = publishedLocalPosts.map((post) => ({
      url: `${baseUrl}/blog/posts/${post.frontmatter.slug}`,
      lastModified: new Date(post.frontmatter.date),
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    }))
  } catch (error) {
    console.error('Could not fetch local posts for sitemap:', error)
  }

  // 4. Medium Posts (if applicable)
  let mediumRoutes: MetadataRoute.Sitemap = []
  try {
    const mediumData = await getMediumPosts()
    if (mediumData?.data?.items) {
      mediumRoutes = mediumData.data.items.map((post: any) => {
        const slug = slugTitle(post.title || '')
        const guidParam = post.guid ? post.guid.split('/').pop() : ''
        return {
          url: `${baseUrl}/blog/medium/${slug}?guid=${guidParam}`,
          lastModified: new Date(post.pubDate || Date.now()),
          changeFrequency: 'monthly' as const,
          priority: 0.6,
        }
      })
    }
  } catch (e) {
    console.log('Could not fetch medium posts for sitemap, skipping.')
  }

  return [...staticRoutes, ...projectRoutes, ...localPostRoutes, ...mediumRoutes]
}
