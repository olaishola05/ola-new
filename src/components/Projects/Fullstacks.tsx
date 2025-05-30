import React from 'react'
import { ProjectProps } from '@/app/types'
import { projectsFilter } from '@/app/utils'
import { CustomCard } from '@/components'
import ProjectsContainer from './ProjectsContainer'
import EmptyProject from './EmptyProject'
import { slugify } from '@/app/utils/utilities'

const FullstackProjects: React.FC<ProjectProps> = ({ projects }) => {
  const fullstackProjects = projectsFilter(projects, 'fullstack')

  if (fullstackProjects.length === 0) {
    return <EmptyProject />
  }

  return (
    <ProjectsContainer>
      {fullstackProjects?.map((item) => (
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

export default FullstackProjects