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

const monserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://olaishola.tech/'),
  title: 'Ola - Fullstack Developer',
  description: 'I am a fullstack developer, I build web applications with React, Nextjs, Nodejs, Expressjs, MongoDB, PostgreSQL, and other technologies.',
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
    title: 'Ola - Fullstack Developer',
    description: 'I am a fullstack developer, I build web applications with React, Nextjs, Nodejs, Expressjs, MongoDB, PostgreSQL, and other technologies.',
    type: 'website',
    locale: 'en_IE',
    url: 'https://olaishola.tech',
    images: [
      {
        url: '/images/portrait-me.jpeg',
        width: 1200,
        height: 630,
        alt: 'Oladipupo Ishola - Fullstack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@olaishola05',
    title: 'Ola - Fullstack Developer',
    description: 'I am a fullstack developer, I build web applications with React, Nextjs, Nodejs, Expressjs, MongoDB, PostgreSQL, and other technologies.',
    images: [
      {
        url: '/images/portrait-me.jpeg',
        width: 1200,
        height: 630,
        alt: 'Oladipupo Ishola - Fullstack Developer',
      },
    ],
  },
  verification: {
    other: {
      'p:domain_verify':
        '861620612d1417f5d3f0043781c79dd0'
    },
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={monserrat.className}>
        <AuthProvider>
          <AnimationProvider>
            <AppThemeProvider>
              <main className='container'>
                <div className='wrapper'>
                  <App>
                    {children}
                    <Toaster />
                    <Analytics />
                    {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS && (
                      <GoogleAnalytics ga_id={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
                    )}
                  </App>
                </div>
              </main>
            </AppThemeProvider>
          </AnimationProvider>
        </AuthProvider>
      </body >
    </html >
  )
}