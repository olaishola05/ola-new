import React from 'react'
import { About } from '@/app/types'

interface Props {
  content: About
}

const AboutContent = ({ content }: Props) => {
  const { intro, transitionOne, transitionTwo, focused, hobbies } = content
  return (
    <main className='w-full md:w-[60%] p-5'>
      <h2 className='text-2xl md:text-5xl font-semibold text-textColor'>About Me</h2>
      <hr className='border-textColor w-1/4 my-2 mb-6' />
      <div>
        <p className='text-base md:text-lg mb-4 data-aos="zoom-in-up"'>
          {intro}
        </p>

        <p className='text-base md:text-lg mb-4 data-aos="zoom-in-up"'>
          {focused}
        </p>

        <p className='text-base md:text-lg mb-4 data-aos="zoom-in-up"'>
          {transitionOne}
        </p>

        <p className='text-base md:text-lg mb-4' data-aos="zoom-in-up">
          {transitionTwo}
        </p>

        <p className='text-base md:text-lg mb-4' data-aos="zoom-in-up">
          {hobbies}
        </p>
      </div>

    </main>
  )
}

export default AboutContent