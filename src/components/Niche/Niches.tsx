import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Niches() {

  return (
    <section className="py-14 mb-10" data-aos="fade-up"
      data-aos-duration="3000">
      <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
        <div className="max-w-2xl mx-auto flex flex-col gap-2 mb-8 lg:mb-5">
          <p className="mt-3 info text-[var(--textColor)] text-center text-base md:text-xl font-light">
            Below are some of the things I do
          </p>
          <h1 className="text-2xl md:text-6xl sm:text-4xl text-[var(--textColor)] text-center">
            What I do
          </h1>
        </div>

        <div className='flex flex-col gap-20 lg:gap-32'>
          <div className="max-w-screen-xl mx-auto md:px-8 md:py-14">
            <div className="items-center gap-x-12 sm:px-0 md:px-0 lg:flex">
              <div className="flex-1 sm:hidden lg:block">
                <Image width={512} height={383.66} src="https://images.unsplash.com/photo-1605379399642-870262d3d051?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c29mdHdhcmUlMjBkZXZlbG9wbWVudHxlbnwwfHwwfHx8MA%3D%3D" className="md:max-w-lg rounded-lg" alt="coding screen" />
              </div>
              <div className="max-w-xl px-0 space-y-3 mt-6 sm:px-0 md:mt-0 lg:max-w-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="hidden md:block w-10 h-10 mx-auto">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
                </svg>

                <h3 className="text-[var(--cta)] font-semibold">
                  Software development
                </h3>
                <p className="text-[var(--textColor)] text-2xl md:text-3xl font-semibold sm:text-4xl">
                  Build your App solution with help from an expert
                </p>
                <p className="mt-3 text-[var(--textColor)] text-base">
                  I create high-end software solutions tailored to your specific needs across multiple web platforms, using React, Nextjs, Tailwindcss, MUI, Nodejs, Express, MongoDB, PostgreSQL, and other technologies that align with business objectives.
                </p>
                <Link href={`${process.env.NEXT_PUBLIC_RESUME_URL}`} target='_blank' className="inline-flex gap-x-1 items-center text-[var(--cta)] hover:text-indigo-500 duration-150 font-medium">
                  {"Let's work together"}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          <div className="max-w-screen-xl mx-auto md:px-8 md:py-14">
            <div className="items-center gap-x-12 sm:px-4 md:px-0 lg:flex lg:flex-row-reverse">
              <div className="flex-1 sm:hidden lg:block">
                <Image width={512} height={383.66} src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dGVjaG5pY2FsJTIwd3JpdGVyfGVufDB8fDB8fHww" className="md:max-w-lg rounded-lg" alt="content writing" />
              </div>
              <div className="max-w-xl px-0 space-y-3 mt-6 sm:px-0 md:mt-0 lg:max-w-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="hidden md:block w-10 h-10 mx-auto">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>

                <h3 className="text-[var(--cta)] font-semibold">
                  Technical writing
                </h3>
                <p className="text-[var(--textColor)] text-2xl md:text-3xl font-semibold sm:text-4xl">
                  Write technical articles and documentation for your software projects
                </p>
                <p className="mt-3 text-[var(--textColor)]">
                  I write technical articles about web development, software development, possible solutions to technical problems, and other related topics. In addition, I produce technical documentation for software projects.
                </p>
                <Link href={`${process.env.NEXT_PUBLIC_ADMIN_MEDIUM_URL}`} target='_blank' className="inline-flex gap-x-1 items-center text-[var(--cta)] hover:text-indigo-500 duration-150 font-medium">
                  Visit my blog
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          <div className="max-w-screen-xl mx-auto md:px-8 md:py-14">
            <div className="items-center gap-x-12 sm:px-4 md:px-0 lg:flex">
              <div className="flex-1 sm:hidden lg:block">
                <Image width={512} height={383.66} src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTh8fHdlYnNpdGV8ZW58MHx8MHx8fDA%3D" className="md:max-w-lg rounded-lg" alt="coding instructor" />
              </div>
              <div className="max-w-xl px-0 space-y-3 mt-6 sm:px-0 md:mt-0 lg:max-w-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="hidden md:block w-10 h-10 mx-auto">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                <h3 className="text-[var(--cta)] font-semibold">
                  Coding Instructor
                </h3>
                <p className="text-[var(--textColor)] text-2xl md:text-3xl font-semibold sm:text-4xl">
                  Learn to code with help from an expert
                </p>
                <p className="mt-3 text-[var(--textColor)]">
                  I teach people how to code using project-based approach and build software solutions. I Provide one-on-one mentorship, guidance to aspiring developers and also an access to communities of likeminds.
                </p>
                <Link href="https://www.techverseacademy.com/" target='_blank' className="inline-flex gap-x-1 items-center text-[var(--cta)] hover:text-indigo-500 duration-150 font-medium">
                  Join here
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
