import { Project } from '@/app/types'
import React from 'react'
import Draft from './Draft'

interface Props {
  projects: any
}

const Drafts = ({ projects }: Props) => {
  return (
    <main className='w-full grid gap-5 p-5 grid-cols-3'>
      {projects.map((project: Project) => (
        <Draft key={project?.id} project={project} />
      ))}
    </main>
  )
}

export default Drafts