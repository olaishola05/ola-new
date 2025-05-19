import React from 'react'
import { GraduationCap, Award, Book, Clock } from 'lucide-react'
import iconMap from '@/lib/icon-map';

export default function MiniEducationTimeline() {
  const education = [
    {
      degree: "Master's in Computer Science",
      institution: "Tech University",
      period: "2019 - 2021",
      description: "Specialized in Web Technologies and Software Engineering. Thesis on scalable architecture for web applications.",
      iconKey: "award",
    },
    {
      degree: "Bachelor's in Software Engineering",
      institution: "State University",
      period: "2015 - 2019",
      description: "Graduated with honors. Led student projects in web development and participated in coding competitions.",
      iconKey: "book",
    },
    {
      degree: "Web Development Bootcamp",
      institution: "Code Academy",
      period: "2017",
      description: "Intensive 12-week program focusing on modern JavaScript frameworks and backend technologies.",
      iconKey: "clock",
    }
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
