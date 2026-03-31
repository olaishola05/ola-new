"use client";

import React from 'react'
import { Project } from '@/app/types'
import { CustomCard } from '@/components'
import { slugify } from '@/app/utils/utilities'

interface ProjectDraftsProps {
  projects: Project[]
}

const ProjectDrafts = ({ projects }: ProjectDraftsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {projects.map((project) => (
        <div key={project.id} className="relative group">
          <CustomCard
            image={project.coverImgUrl}
            overlayText="View Project"
            name={project.name}
            role={project.tag}
            description={project.description?.[0] || ''}
            url={`/projects/${slugify(project.name)}`}
          />
          <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <a
              href={`/admin/dashboard/projects/edit/${project.id}`}
              className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"
              title="Edit"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
            </a>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProjectDrafts
