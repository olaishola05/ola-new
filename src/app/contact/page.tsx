import { ContactForm, Copyright } from '@/components'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact | Oladipupo Ishola',
  description: 'Let\'s hop on a call and discuss how we can work together to build something great.',
}

export default function ContactPage() {
  return (
    <div>
      <section className="relative max-w-screen-xl mx-auto py-14 px-4 md:px-8 my-10">
        <div className="absolute top-0 left-0 w-full h-full rounded-sm bg-[var(--contact)]"></div>
        <div className="relative gap-5 items-center lg:flex">
          <div className="flex-1 max-w-lg py-5 sm:mx-auto sm:text-center lg:max-w-max lg:text-left">
            <h3 className="text-3xl text-[var(--contactText)] font-semibold md:text-4xl">
              Looking to collaborate and build something great?
            </h3>
            <p className="text-[var(--contactText)] leading-relaxed mt-3">
              {"Let's hop on a call and discuss how we can work together to build something great."}
            </p>
            <Link
              className="mt-5 px-4 py-2 text-indigo-600 font-medium bg-indigo-50 rounded-full inline-flex items-center"
              href="#contact">
              {"Let's talk"}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-1 duration-150" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
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
        <h2 className='text-center text-3xl lg:text-4xl text-[var(--textColor)]'>
          Start a conversation today
        </h2>
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
