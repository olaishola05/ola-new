'use client';

import React from 'react'
import { socialLinks } from '@/app/utils'
import { Copyright, ContactForm, Icons } from '@/components'
import Image from 'next/image'
import ContactImage from '../../../public/images/contact1.png'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Quotes from '../Quotes/Quotes';
import Testimonials from '../testimonial/Testimonials';

const BottomNav = () => {
  const pathname = usePathname()
  const excludePaths = ['/admin', '/blog', '/contact', '/testimonial']
  return (
    <main data-aos="fade-up" className='w-full h-full'>
      {excludePaths.includes(pathname) ? '' : (
        <>
          <Quotes />
        </>
      )}
      {pathname === '/' && (<Testimonials />)}
      {excludePaths.includes(pathname) ? '' : (
        <>
          <div data-aos="fade-up" className='w-full h-full my-5 md:w-[85%] md:flex md:flex-col md:items-center md:mx-auto md:my-20 lg:mx-0 lg:w-full'>

            <div className='h-full md:w-full md:flex md:flex-col items-start gap-3'>
              <h1 className='text-2xl text-[var(--textColor)] md:text-5xl md:font-bold'>
                {"Let's work together."}
              </h1>

              <p className='text-base text-[var(--textColor)] md:text-lg md:font-medium'>
                {"Let's work together to build something great."}
              </p>
            </div>

            <div id='contact' className='flex-col items-center justify-center w-[96%] lg:flex lg:flex-row-reverse lg:p-5 gap-[90px] lg:justify-between mt-5'>
              <ContactForm />
              <div className='hidden lg:flex lg:flex-col lg:gap-3 p-5 bg-white rounded-xl shadow-[rgb(209, 217, 230) 5px 5px 15px 0px, rgb(255, 255, 255) -5px -5px 15px 0px] lg:bg-[var(--contactBg)]'>
                <div className='w-full p-5 flex flex-col gap-3 rounded[10px] px-2 py-3'>
                  <Image src={ContactImage} alt='contact image' width={460} height={200} className='rounded-[10px] object-cover self-center' />
                  <div className='self-center flex flex-col gap-2.5'>
                    <div className='w-full self-center flex flex-col gap-6'>
                      <h4 className='text-3xl font-bold'>
                        Ola Ishola
                        <br />
                        <p className='text-lg'>
                          Software Developer
                        </p>
                      </h4>

                      <p className='text-lg'>
                        I am available for collaboration & freelance work. Connect with me on social media or shoot me an email.
                      </p>

                      <p className='text-lg'>
                        Phone: +234 8110837448
                        <br />
                        Email: <Link href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`} className='text-[var(--primary)]'>Click here.</Link>
                      </p>
                    </div>
                    <div className='flex gap-1.5 md:items-end md:gap-2 pt-5'>
                      {socialLinks.map((link) => (
                        <div key={link.id}
                          className='flex items-center justify-center'
                        >
                          <Icons link={link} key={link.id} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
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

  )
}

export default BottomNav