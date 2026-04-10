import { MetadataRoute } from 'next'
import { getPublishedPosts } from '@/lib/posts'
import { getMediumPosts } from '@/queries/queries'
import { SITE_CONFIG } from '@/lib/config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.siteUrl

  // 1. Static Routes
  const staticRoutes = ['', '/about', '/blog', '/contact', '/testimonial'].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.8,
    })
  )

  try {
    // 2. Local MDX Blog Posts
    const publishedLocalPosts = await getPublishedPosts()
    const localPostRoutes = publishedLocalPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.frontmatter.slug}`,
      lastModified: new Date(post.frontmatter.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

     // 3. Medium Posts (if applicable)
     let mediumRoutes: MetadataRoute.Sitemap = []
     try {
        const mediumData = await getMediumPosts()
        if (mediumData?.data?.items) {
          mediumRoutes = mediumData.data.items.map((post: any) => {
             // Extract slug from medium guid or link
             const slugParts = post.guid ? post.guid.split('/') : []
             const slug = slugParts.length > 0 ? slugParts[slugParts.length - 1] : ''
             return {
               url: `${baseUrl}/blog/${slug}`,
               lastModified: new Date(post.pubDate),
               changeFrequency: 'monthly' as const,
               priority: 0.6,
             }
          })
        }
     } catch (e) {
        console.log("Could not fetch medium posts for sitemap, skipping.")
     }

    return [...staticRoutes, ...localPostRoutes, ...mediumRoutes]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return staticRoutes
  }
}
