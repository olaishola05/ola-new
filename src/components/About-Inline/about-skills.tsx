import React from 'react'
import { skillCategories } from '@/app/utils'
import Skills from './skills'

export default function AboutSkills() {
  return (
    <div className='w-full md:w-10/12 md:ml-14'>
      <h2
        className='text-2xl md:text-4xl font-semibold text-primary mt-5'
        data-aos="zoom-in-right"
        data-aos-duration="3000"
        data-aos-anchor-placement="top-center"
      >Languages & Tools</h2>
      <hr className='border-textColor w-1/5 my-2 mb-6'
        data-aos="zoom-in-left"
        data-aos-duration="4000"
        data-aos-anchor-placement="top-center"
      />

      <div className="mb-6">
        <p className="text-textColor max-w-2xl text-lg">
          My technical toolkit consists of modern frameworks and languages that help me build robust and scalable applications.
        </p>
      </div>
      <Skills skills={skillCategories} />
    </div>
  )
}
