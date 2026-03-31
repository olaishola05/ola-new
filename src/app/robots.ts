import { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/lib/config'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'],
    },
    // Allows specific AI crawlers
    host: SITE_CONFIG.siteUrl,
    sitemap: `${SITE_CONFIG.siteUrl}/sitemap.xml`,
  }

}
