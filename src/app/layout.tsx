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
  metadataBase: new URL('https://olaishola.tech/'),
  title: 'Oladipupo Ishola — Builder. Educator. Maker.',
  description: 'Software engineer, product builder, and educator helping developers and founders use AI to build faster, smarter, and more profitably. Real products. Real results.',
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
    title: 'Oladipupo Ishola — Builder. Educator. Maker.',
    description: 'Software engineer, product builder, and educator helping developers and founders use AI to build faster, smarter, and more profitably. Real products. Real results.',
    type: 'website',
    locale: 'en_IE',
    url: 'https://olaishola.tech',
    images: [
      {
        url: '/images/portrait-me.jpeg',
        width: 1200,
        height: 630,
        alt: 'Oladipupo Ishola — Builder. Educator. Maker.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@_olaishola',
    title: 'Oladipupo Ishola — Builder. Educator. Maker.',
    description: 'Software engineer, product builder, and educator helping developers and founders use AI to build faster, smarter, and more profitably. Real products. Real results.',
    images: [
      {
        url: '/images/portrait-me.jpeg',
        width: 1200,
        height: 630,
        alt: 'Oladipupo Ishola — Builder. Educator. Maker.',
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
              "@type": "Person",
              "name": "Oladipupo Ishola",
              "url": "https://olaishola.tech",
              "image": "https://olaishola.tech/images/portrait-me.jpeg",
              "description": "Software engineer, product builder, and educator helping developers and founders use AI to build faster, smarter, and more profitably.",
              "sameAs": [
                "https://github.com/olaishola05",
                "https://www.linkedin.com/in/oladipupoishola/",
                "https://twitter.com/_olaishola",
                "https://www.youtube.com/@BuildShipTeach",
                "https://medium.com/@olaishola",
                "https://www.instagram.com/_olaishola"
              ],
              "jobTitle": "Software Engineer, Product Builder & Educator",
              "worksFor": {
                "@type": "Organization",
                "name": "Self-Employed"
              }
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