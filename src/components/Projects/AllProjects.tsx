import React from 'react'
import { CustomCard } from '..'
import { Project } from '@/app/types'
import ProjectsContainer from './ProjectsContainer'
import EmptyProject from './EmptyProject';
import { slugify } from '@/app/utils/utilities';

type props = {
  data: any[];
};

const AllProjects = ({ data }: props) => {

  if (data.length === 0) {
    return <EmptyProject />
  }
  return (
    <div className='h-full'>
      <ProjectsContainer>
        {data?.map((item: Project) => (
          <CustomCard
            key={item.id}
            image={item.coverImgUrl}
            overlayText='View Project'
            name={item.name}
            role={item.tag}
            description={item.description?.[0] || ''}
            url={`/projects/${slugify(item.name)}`}
          />
        ))}
      </ProjectsContainer>
    </div>
  )
}

export default AllProjects