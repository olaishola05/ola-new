import React from 'react'
import ProjectCarousel from './project-carousel'

export default function ProjectDetails({ data, project }: { data: any; project: any }) {
  return (
    <>
      <ProjectCarousel data={data} />
      <div className='w-full md:max-w-5xl mx-auto p-4'>
        <div className='text-textColor text-base md:text-lg font-light'>
          <p className='mb-4'>{project.description}</p>
          <p className='mb-4'>The project was powered using multiple technologies such as, {project.stacks.join(', ')}</p>
          <p className='mb-4'>Role: {project.tag}</p>
          <p className='mb-4'>GitHub: <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className='text-cta hover:text-primary'>{project.githubUrl}</a></p>
        </div>
      </div></>
  )
}
