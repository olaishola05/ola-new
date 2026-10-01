import { ContactForm, Copyright } from '@/components'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Have a product, engineering problem, or collaboration in mind? Book a discovery call or send a direct message.',
  alternates: {
    canonical: 'https://olaishola.tech/contact',
  },
  openGraph: {
    title: 'Contact | Oladipupo Ishola',
    description:
      'Have a product, engineering problem, or collaboration in mind? Book a discovery call or send a direct message.',
    url: 'https://olaishola.tech/contact',
    type: 'website',
    images: [
      {
        url: '/images/portrait-me.jpeg',
        width: 1200,
        height: 630,
        alt: 'Oladipupo Ishola — Contact',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact | Oladipupo Ishola',
    description:
      'Have a product, engineering problem, or collaboration in mind? Book a discovery call or send a direct message.',
  },
}

export default function ContactPage() {
  return (
    <div>
      <section className="relative max-w-screen-xl mx-auto py-14 px-4 md:px-8 my-10">
        <div className="absolute top-0 left-0 w-full h-full rounded-sm bg-[var(--contact)]"></div>
        <div className="relative gap-5 items-center lg:flex">
          <div className="flex-1 max-w-lg py-5 sm:mx-auto sm:text-center lg:max-w-max lg:text-left">
            <h3 className="text-3xl text-[var(--contactText)] font-semibold md:text-4xl">
              Have a product, engineering problem, or collaboration in mind?
            </h3>
            <p className="text-[var(--contactText)] leading-relaxed mt-3">
              {"Available for freelance projects, contract engineering, product collaborations, and select remote roles. Let's discuss your roadmap."}
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-5">
              <Link
                className="px-5 py-2.5 text-white font-medium bg-cta rounded-full inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
                href={process.env.NEXT_PUBLIC_CAL_URL || "https://cal.com/olaishola"}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book a 15-min discovery call
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
          <div className="flex-1 mt-5 mx-auto sm:w-9/12 lg:mt-0 lg:w-auto">
            <Image
              src="https://images.unsplash.com/photo-1586985564150-11ee04838034?q=80&w=2858&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="video call"
              className="md:max-w-lg rounded-lg shadow-xl"
              width={512} height={383.66}
            />
          </div>
        </div>
      </section>
      <section className='py-14' id='contact'>
        <div className="text-center max-w-2xl mx-auto px-4 mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-cta block mb-2">Direct Message</span>
          <h2 className='text-3xl lg:text-4xl font-extrabold text-[var(--textColor)] tracking-tight'>
            Start a Conversation
          </h2>
          <p className="text-xs md:text-sm text-softText mt-2">
            Freelance · Contract · Product Collaboration · Select Remote Opportunities
          </p>
        </div>
        <div className='py-10 lg:p-14 w-full lg:w-8/12 mx-auto'>
          <ContactForm />
        </div>
      </section>
      <hr />
      <div className='py-14'>
        <Copyright />
      </div>
    </div>
  )
}
