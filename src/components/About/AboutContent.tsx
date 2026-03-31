import React from 'react'
import { About } from '@/app/types'

interface Props {
  content: About
}

const AboutContent = ({ content }: Props) => {
  const { intro, transitionOne, transitionTwo, focused, hobbies } = content
  return (
    <main className='w-full lg:w-[60%] p-5 md:p-10'>
      <div className="flex flex-col gap-3 mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-cta" data-aos="zoom-in-up">The Person Behind The Code</span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--textColor)] tracking-tight">
          About Me
        </h2>
      </div>

      <div className='flex flex-col gap-6'>
        <p className='text-base md:text-lg text-softText leading-relaxed' data-aos="zoom-in-up">
          {intro}
        </p>

        <p className='text-base md:text-lg text-softText leading-relaxed' data-aos="zoom-in-up">
          {focused}
        </p>

        <p className='text-base md:text-lg text-softText leading-relaxed' data-aos="zoom-in-up">
          {transitionOne}
        </p>

        <p className='text-base md:text-lg text-softText leading-relaxed' data-aos="zoom-in-up">
          {transitionTwo}
        </p>

        <p className='text-base md:text-lg text-softText leading-relaxed' data-aos="zoom-in-up">
          {hobbies}
        </p>
      </div>

    </main>
  )
}

export default AboutContent