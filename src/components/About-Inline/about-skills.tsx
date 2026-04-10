import React from 'react'
import { skillCategories } from '@/app/utils'
import Skills from './skills'

export default function AboutSkills() {
  return (
    <div className='w-full md:w-10/12 md:ml-14'>
      <h3
        className='text-2xl md:text-3xl font-extrabold text-[var(--textColor)] tracking-tight mb-6 mt-5 md:mt-0'
        data-aos="zoom-in-right"
        data-aos-duration="3000"
        data-aos-anchor-placement="top-center"
      >Languages & Tools</h3>

      <div className="mb-6">
        <p className="text-base md:text-lg text-softText leading-relaxed max-w-2xl">
          My technical toolkit consists of modern frameworks and languages that help me build robust and scalable applications.
        </p>
      </div>
      <Skills skills={skillCategories} />
    </div>
  )
}
