import React from 'react'
import { skillCategories } from '@/app/utils'
import Skills from './skills'

export default function AboutSkills() {
  return (
    <div className='w-full'>
      <h3
        className='text-2xl md:text-3xl font-extrabold text-[var(--textColor)] tracking-tight mb-6'
        data-aos="zoom-in-right"
        data-aos-duration="3000"
        data-aos-anchor-placement="top-center"
      >Languages & Tools</h3>
      <Skills skills={skillCategories} />
    </div>
  )
}

