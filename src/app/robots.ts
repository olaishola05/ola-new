import { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/lib/config'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/auths/', '/test/'],
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'Google-Extended', 'PerplexityBot', 'ClaudeBot', 'AnthropicAI', 'Applebot'],
        allow: ['/', '/blog/', '/about', '/business'],
        disallow: ['/admin/', '/api/', '/auths/'],
      },
    ],
    host: SITE_CONFIG.siteUrl,
    sitemap: `${SITE_CONFIG.siteUrl}/sitemap.xml`,
  }
}
