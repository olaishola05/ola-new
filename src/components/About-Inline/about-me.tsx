import React from 'react'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default function AboutMe() {
  return (
    <div>
      <h2
        className='text-2xl md:text-4xl font-semibold text-primary'
        data-aos="zoom-in-right"
        data-aos-duration="3000"
        data-aos-anchor-placement="top-center"
      >About Me</h2>
      <hr className='border-textColor w-1/6 my-2 mb-6'
        data-aos="zoom-in-left"
        data-aos-duration="4000"
        data-aos-anchor-placement="top-center"
      />

      <div className="w-full md:w-10/12 md:px-5">
        <p className="text-lg text-textColor mb-6">
          I&apos;m a software developer specializing in creating elegant, user-friendly web applications.
          With expertise in modern frameworks and a strong foundation in software engineering principles,
          I transform complex problems into simple, beautiful solutions.
        </p>

        <p className="text-lg text-textColor mb-6">
          I thrive on challenges and am always eager to learn new technologies and improve my skills.
          My goal is to build applications that not only meet user needs but also provide a delightful experience.
          I believe in the power of collaboration and enjoy working with cross-functional teams to bring ideas to life.
        </p>
        <div className="flex gap-4">
          <Link
            href="/about"
            className="flex items-center gap-1 text-primary hover:text-blue-800 font-medium"
          >
            More about me <ChevronRight className="h-4 w-4" />
          </Link>
          <Link
            href="#contact"
            className="flex items-center gap-1 text-primary hover:text-blue-800 font-medium"
          >
            Get in touch <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
