import React from 'react'
import { CustomCard } from '@/components'
import { ProjectProps } from '@/app/types'
import { projectsFilter } from '@/app/utils'
import ProjectsContainer from './ProjectsContainer'
import EmptyProject from './EmptyProject'
import { slugify } from '@/app/utils/utilities'

const FrontendProjects = ({ projects }: ProjectProps) => {
  const frontendProjects = projectsFilter(projects, 'frontend')

  if (frontendProjects.length === 0) {
    return <EmptyProject />
  }

  return (
    <ProjectsContainer>
      {frontendProjects?.map((item) => (
        <CustomCard
          key={item.id}
          image={item.coverImgUrl}
          overlayText='View Project'
          name={item.name}
          role={item.tag}
          description={item.description}
          url={`/projects/${slugify(item.name)}`}
        />
      ))}
    </ProjectsContainer>
  )
}

export default FrontendProjects