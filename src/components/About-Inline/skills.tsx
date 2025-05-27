'use client'

import React from 'react'
import SkillButton from './skills-btn';

type Skill = {
  name: string;
  icon: string;
  description: string;
  experience: string;
}
type SkillCategory = {
  name: string;
  skills: Skill[];
}

export default function Skills({ skills }: { skills: SkillCategory[] }) {
  return (
    <ul className='flex flex-col gap-5'>
      {skills.map((category, index) => (
        <li key={index} className="flex gap-4">
          <h3 className="hidden md:block text-xl font-semibold text-textColor mb-2">{category.name}:</h3>
          <div className="flex flex-wrap gap-2 w-full md:w-10/12">
            {category.skills.map((skill, index) => (
              <SkillButton key={index} skill={skill} />
            ))}
          </div>
        </li>
      ))}
    </ul>
  )
}
