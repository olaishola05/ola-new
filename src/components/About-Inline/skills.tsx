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
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
      {skills.map((category, index) => (
        <div key={index} className="flex flex-col gap-3">
          <h3 className="text-sm font-bold text-textColor tracking-wide uppercase border-b border-softBg/60 pb-2">
            {category.name}
          </h3>
          <div className="flex flex-wrap gap-2">
            {category.skills.map((skill, idx) => (
              <SkillButton key={idx} skill={skill} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
