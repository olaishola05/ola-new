import React from 'react'
import { GraduationCap, Award, Book, Clock } from 'lucide-react'
import iconMap from '@/lib/icon-map';

export default function MiniEducationTimeline() {
  const education = [
    {
      degree: "Full Stack Web Development",
      institution: "Microverse Inc.",
      period: "2021 - 2022",
      description: "Spent 1300+ hours mastering algorithms, data structures, and full-stack development while simultaneously developing projects with Ruby on Rails, JavaScript, React, Redux, collaboration, remote working, peer programming, and Git & GitHub.",
      iconKey: "graduation",
    },
    {
      degree: "Master's in Computer Computer Networking",
      institution: "University of Bedfordshire",
      period: "2013 - 2015",
      description: "A thesis evaluating open-source cloud computing platforms' security model using OpenStack and Eucalyptus cloud platforms.",
      iconKey: "award",
    },
    {
      degree: "Bachelor's in Computer Networking",
      institution: "University of Bedfordshire",
      period: "2010 - 2013",
      description: "A thesis on the performance evaluation of virtualization in computing environments.",
      iconKey: "book",
    },
  ];

  return (
    <div className='md:p-5 w-full md:w-11/12'>
      <div className="flex items-center mb-6">
        <GraduationCap className="h-6 w-6 text-blue-600 mr-2" />
        <h3 className="text-2xl font-bold">Education</h3>
      </div>

      <div className="pl-1 md:pl-4">
        {education.map((edu, index) => (
          <div key={index} className="relative mb-8 last:mb-0">
            <div className="absolute top-0 bottom-0 left-0 w-0.5 bg-gray-200" />
            <div className="relative pl-8">
              <div className="absolute left-0 top-1 w-8 h-8 flex items-center justify-center rounded-full bg-bg shadow-md border border-gray-200">
                {iconMap[edu.iconKey]}
              </div>
              <h4 className="text-xl font-semibold">{edu.degree}</h4>
              <div className="flex justify-between text-softText mb-2">
                <span>{edu.institution}</span>
                <span className="text-sm">{edu.period}</span>
              </div>
              <p className="text-textColor">{edu.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
