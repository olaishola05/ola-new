import React from 'react'
import Link from 'next/link'
import SubscribeForm from '@/components/Subscribe/SubscribeForm'
import Tags from './Tags'
import FooterSocialMedia from './footer-social-media'

export default function BlogFooter() {
  return (
    <footer className="w-full max-w-7xl mx-auto px-6 py-16 mt-20 border-t border-softBg/50 relative">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
        <div className="flex flex-col gap-6 lg:col-span-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold tracking-tight text-[var(--textColor)]">Code &apos;n&apos; Beyond</h1>
          </div>
          <p className="text-base text-softText leading-relaxed">
            Be the first to read my posts, join the conversation,
            and let&apos;s learn together in this exciting journey through code and beyond by subscribing to my newsletter.
          </p>
          <div className="w-full">
            <SubscribeForm />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <span className="text-xs font-bold uppercase tracking-widest text-cta">Links</span>
          <div className="flex flex-col gap-4">
            <Link href='/' className="text-base font-medium text-softText hover:text-cta transition-colors">Homepage</Link>
            <Link href='/about' className="text-base font-medium text-softText hover:text-cta transition-colors">About</Link>
            <Link href='/contact' className="text-base font-medium text-softText hover:text-cta transition-colors">Contact</Link>
            <Link href='/blog' className="text-base font-medium text-softText hover:text-cta transition-colors">Blog</Link>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <span className="text-xs font-bold uppercase tracking-widest text-cta">Tags</span>
          <div className="flex flex-col gap-4">
            <Tags />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <span className="text-xs font-bold uppercase tracking-widest text-cta">Social</span>
          <div className="flex flex-col gap-4">
            <Link href='https://www.linkedin.com/in/olaishola05/' target='_blank' className="text-base font-medium text-softText hover:text-cta transition-colors">LinkedIn</Link>
            <Link href='https://www.instagram.com/olaishola05/' target='_blank' className="text-base font-medium text-softText hover:text-cta transition-colors">Instagram</Link>
            <Link href='https://github.com/olaishola05' target='_blank' className="text-base font-medium text-softText hover:text-cta transition-colors">GitHub</Link>
            <Link href='https://x.com/olaishola05' target='_blank' className="text-base font-medium text-softText hover:text-cta transition-colors">X</Link>
          </div>
        </div>
      </div>

      <div className="w-full mt-16 pt-8 border-t border-softBg/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className='text-sm text-softText font-medium'>
          {'© '}
          <Link href="https://www.linkedin.com/in/olaishola05/"
            className="text-[var(--textColor)] font-bold hover:text-cta transition-colors mx-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            Oladipupo Ishola
          </Link>— {new Date().getFullYear()}
        </p>
        <FooterSocialMedia />
      </div>
    </footer>
  )
}
