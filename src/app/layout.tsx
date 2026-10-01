import AuthProvider from '@/app/providers/AuthProvider'
import { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import 'src/app/globals.scss'
import 'src/app/prosemirror.css'
import AnimationProvider from '@/app/providers/AnimationProvider';
import AppThemeProvider from '@/app/providers/AppThemeProvider';
import App from '@/components/app/App'
import { Toaster } from 'react-hot-toast';
import { Analytics } from '@vercel/analytics/react';
import GoogleAnalytics from '@/components/Analytic/GoogleAnalytics';
import ConditionalWrapper from '@/components/Wrapper/ConditionalWrapper'

const monserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://olaishola.tech'),
  title: {
    default: 'Oladipupo Ishola — Software Engineer & Product Builder',
    template: '%s | Oladipupo Ishola',
  },
  description: 'Software engineer and product builder building web products, APIs, and backend systems for startups and teams — across TypeScript, Python, and AI-assisted engineering.',
  keywords: [
    'Oladipupo Ishola',
    'Software Engineer',
    'Full Stack Engineer',
    'Product Builder',
    'TypeScript',
    'Python',
    'Next.js',
    'React',
    'Node.js',
    'FastAPI',
    'AI-assisted Engineering',
    'Dublin',
    'Ireland',
    'Web Development',
    'SaaS Builder',
  ],
  authors: [{ name: 'Oladipupo Ishola', url: 'https://olaishola.tech' }],
  creator: 'Oladipupo Ishola',
  publisher: 'Oladipupo Ishola',
  alternates: {
    canonical: 'https://olaishola.tech',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: [
    {
      media: '(prefers-color-scheme: light)',
      url: '/images/brand-purple.png',
      href: '/images/brand-purple.png',
      type: 'image/png',
    },
    {
      media: '(prefers-color-scheme: dark)',
      url: '/images/brand-dark.png',
      href: '/images/brand-dark.png',
      type: 'image/png',
    },
  ],
  openGraph: {
    title: 'Oladipupo Ishola — Software Engineer & Product Builder',
    description: 'Software engineer and product builder building web products, APIs, and backend systems for startups and teams — across TypeScript, Python, and AI-assisted engineering.',
    type: 'website',
    locale: 'en_IE',
    url: 'https://olaishola.tech',
    siteName: 'Oladipupo Ishola',
    images: [
      {
        url: '/images/portrait-me.jpeg',
        width: 1200,
        height: 630,
        alt: 'Oladipupo Ishola — Software Engineer & Product Builder',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@_olaishola',
    creator: '@_olaishola',
    title: 'Oladipupo Ishola — Software Engineer & Product Builder',
    description: 'Software engineer and product builder building web products, APIs, and backend systems for startups and teams — across TypeScript, Python, and AI-assisted engineering.',
    images: [
      {
        url: '/images/portrait-me.jpeg',
        width: 1200,
        height: 630,
        alt: 'Oladipupo Ishola — Software Engineer & Product Builder',
      },
    ],
  },
  verification: {
    other: {
      'p:domain_verify': '861620612d1417f5d3f0043781c79dd0',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={monserrat.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": "https://olaishola.tech/#person",
                  "name": "Oladipupo Ishola",
                  "url": "https://olaishola.tech",
                  "image": "https://olaishola.tech/images/portrait-me.jpeg",
                  "description": "Software engineer, product builder, and educator helping developers and founders build, ship, and monetise with AI.",
                  "sameAs": [
                    "https://github.com/olaishola05",
                    "https://www.linkedin.com/in/oladipupoishola/",
                    "https://twitter.com/_olaishola",
                    "https://www.youtube.com/@BuildShipTeach",
                    "https://medium.com/@olaishola",
                    "https://www.instagram.com/olaishola05"
                  ],
                  "jobTitle": "Software Engineer & Product Builder"
                },
                {
                  "@type": "WebSite",
                  "@id": "https://olaishola.tech/#website",
                  "url": "https://olaishola.tech",
                  "name": "Oladipupo Ishola",
                  "description": "Software Engineer & Product Builder Portfolio and Blog",
                  "publisher": {
                    "@id": "https://olaishola.tech/#person"
                  }
                }
              ]
            })
          }}
        />
        <AuthProvider>
          <AnimationProvider>
            <AppThemeProvider>
              <main className='container'>
                <ConditionalWrapper>
                  <App>
                    {children}
                    <Toaster />
                    <Analytics />
                    {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS && (
                      <GoogleAnalytics ga_id={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
                    )}
                  </App>
                </ConditionalWrapper>
              </main>
            </AppThemeProvider>
          </AnimationProvider>
        </AuthProvider>
      </body >
    </html >
  )
}