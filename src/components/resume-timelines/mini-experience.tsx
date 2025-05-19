import React from 'react'
import { Server, Code, Monitor, Briefcase } from "lucide-react";
import iconMap from '@/lib/icon-map';

export default function MiniExperienceTimeline() {

  const workExperience = [
    {
      title: "Software Developer",
      company: "Techverse Academy",
      period: "2023 - 2025",
      description: "Collaborate in a team of 5 to build an EdTech platform, using NextJS, TailwindCSS, NestJS, and PostgreSQL. Implemented RESTful APIs and optimized database queries.",
      iconKey: "server",
    },
    {
      title: "Full Stack Developer",
      company: "Automated Affairs",
      period: "2022 - 2024",
      description: "Developed an AI resume and application material builder for the African job market, implementing over 20 RESTful APIs and enhancing user experience through responsive design.",
      iconKey: "code",
    },
    {
      title: "Student Mentor",
      company: "Microverse Inc.",
      period: "Jan 2022 - July 2022",
      description: "Mentored junior developers in a full-stack program, focusing on JavaScript, React, and Ruby on Rails. Assisted students in achieving top 10% performance in their cohort.",
      iconKey: "monitor",
    }
  ];
  return (
    <div className='md:p-5 w-full md:w-11/12'>
      <div className="flex items-center mb-6">
        <Briefcase className="h-6 w-6 text-blue-600 mr-2" />
        <h3 className="text-2xl font-bold">Work Experience</h3>
      </div>

      <div className="pl-1 md:pl-4">
        {workExperience.map((job, index) => (
          <div key={index} className="relative mb-8 last:mb-0">
            <div className="absolute top-0 bottom-0 left-0 w-0.5 bg-gray-200" />
            <div className="relative pl-8">
              <div className="absolute left-0 top-1 w-8 h-8 flex items-center justify-center rounded-full bg-bg shadow-md border border-gray-200">
                {iconMap[job.iconKey]}
              </div>
              <h4 className="text-xl font-semibold">{job.title}</h4>
              <div className="flex justify-between text-softText mb-2">
                <span>{job.company}</span>
                <span className="text-sm">{job.period}</span>
              </div>
              <p className="text-textColor">{job.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div >
  )
}
