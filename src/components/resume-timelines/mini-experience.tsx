import React from 'react'
import { Server, Code, Monitor, Briefcase } from "lucide-react";

export default function MiniExperienceTimeline() {

  const workExperience = [
    {
      title: "Senior Full Stack Developer",
      company: "Tech Innovations Inc.",
      period: "2021 - Present",
      description: "Led development of enterprise SaaS platform, managing a team of 5 developers and implementing CI/CD workflows.",
      icon: <Server className="w-5 h-5 text-emerald-600" />
    },
    {
      title: "Web Developer",
      company: "Digital Solutions LLC",
      period: "2018 - 2021",
      description: "Developed responsive web applications using React, Node.js, and MongoDB, improving site performance by 40%.",
      icon: <Code className="w-5 h-5 text-blue-600" />
    },
    {
      title: "Frontend Developer Intern",
      company: "Web Creators Co.",
      period: "2017 - 2018",
      description: "Assisted in building UI components and implementing designs using HTML, CSS, and JavaScript.",
      icon: <Monitor className="w-5 h-5 text-indigo-600" />
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
                {job.icon}
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
