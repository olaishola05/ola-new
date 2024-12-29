'use client';

import React from 'react'
import { socialLinks } from '@/app/utils'
import { ContactForm, Copyright, Icons } from '@/components'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Quotes from '../Quotes/Quotes';
import Testimonials from '../testimonial/Testimonials';
import { PhoneCallIcon } from 'lucide-react';
import { MailIcon } from 'lucide-react';

const BottomNav = () => {
  const pathname = usePathname()
  const excludePaths = ['/admin', '/contact', '/testimonial', '/blog']
  const isStartsWith = excludePaths.some((path) => pathname.startsWith(path))
  return (
    <React.Fragment>
      {/*{pathname.startsWith('/blog') && (<BlogFooter />)}*/}
      <main data-aos="fade-up" className='w-full h-full'>
        {isStartsWith ? '' : (
          <>
            <Quotes />
          </>
        )}
        {pathname === '/' && (<Testimonials />)}
        {isStartsWith ? '' : (
          <>
            <div data-aos="fade-up" className='w-full h-full my-5 md:w-[85%] md:flex md:flex-col md:items-center md:mx-auto md:my-20 lg:mx-0 lg:w-full'>

              <div className='h-full md:w-full md:flex md:flex-col items-center gap-3 mb-5'>
                <h1 className='text-2xl text-[var(--textColor)] md:text-5xl md:font-bold'>
                  {"Let's work together."}
                </h1>

                <p className='text-base text-[var(--textColor)] md:text-lg md:font-medium'>
                  {"Let's work together to build something great."}
                </p>
              </div>

              <div id='contact' className='w-full md:w-10/12 flex flex-col-reverse items-center justify-center md:flex-row-reverse p-4 md:p-6 gap-8 lg:justify-between mt-5 shadow-md rounded-xl'>
                <ContactForm />
                <div className='w-full flex-1 flex flex-col gap-3 p-4 md:p-6 bg-softBg rounded-xl h-[500px]'>
                  <div className='w-full self-center flex flex-col gap-8 md:p-6'>
                    <div className='w-full flex flex-col gap-3'>
                      <h2 className='text-2xl md:5xl font-semibold'>Contact Information</h2>
                      <p className='text-base text-softText'>
                        I am available for collaboration & work. Connect with me on social media or shoot me an email and I will get back to you within 24hrs.
                      </p>
                    </div>

                    <div>
                      <p className='text-base font-semibold flex gap-3'>
                        <PhoneCallIcon /> (+234) 8110837448</p>

                      <Link href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`} className='flex gap-3 font-semibold text-base'><MailIcon /> Click here.</Link>

                    </div>
                  </div>
                  {/* <div className='flex gap-1.5 md:items-end md:gap-2 pt-5'>
                    {socialLinks.map((link) => (
                      <div key={link.id}
                        className='flex items-center justify-center'
                      >
                        <Icons link={link} key={link.id} />
                      </div>
                    ))}
                  </div> */}
                </div>
              </div>
            </div>
            <div className='pb-4'>
              <Copyright />
            </div>
          </>
        )
        }
      </main>
    </React.Fragment>
  )
}

export default BottomNav