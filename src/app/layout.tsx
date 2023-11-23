import AuthProvider from '@/app/providers/AuthProvider'
import { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import 'src/app/globals.scss'
import AnimationProvider from '@/app/providers/AnimationProvider';
import AppThemeProvider from '@/app/providers/AppThemeProvider';
import App from '@/components/app/App'
import { Toaster } from 'react-hot-toast';

const monserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Developer Portfolio with Personal Blog',
  description: 'I am a fullstack developer, I build web applications with React, Nextjs, Nodejs, Expressjs, MongoDB, PostgreSQL, and other technologies.',
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