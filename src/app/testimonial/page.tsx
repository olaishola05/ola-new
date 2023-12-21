import React from 'react'
import TestimonialForm from './TestimonialForm'
import { Metadata } from 'next';
import { Copyright } from '@/components';

export const metadata: Metadata = {
  title: 'Oladipupo Ishola | Testimonials',
  description: 'Leave a testimonial about your experience working with me.',
}

export default function TestimonialPage() {
  return (
    <main>
      <section className="relative my-10">
        <div className="relative z-10 max-w-screen-xl mx-auto px-4 py-28 md:px-8">
          <div className="space-y-5 max-w-4xl mx-auto text-center">
            <h2 className="text-4xl text-[var(--contactText)] font-extrabold mx-auto md:text-5xl">
              Ready to leave a testimonial? {"I'd"} be very grateful.
            </h2>
            <p className="max-w-2xl mx-auto text-[var(--contactText)] text-base md:text-lg">
              Kindly, leave a testimonial about your experience working with me.
            </p>
          </div>
        </div>
        <div className="absolute inset-0 m-auto max-w-xs blur-[40px] sm:max-w-md md:max-w-4xl bg-[var(--contact)]"></div>
      </section>
      <section className="py-8 lg:py-24 my-16">
        <div className='mx-auto text-center'>
          <h3 className='text-3xl md:text-5xl text-[var(--textColor)]'>
            Leave a testimonial
          </h3>
        </div>
        <TestimonialForm />
      </section>

      <div className='py-5'>
        <Copyright />
      </div>
    </main>
  )
}
