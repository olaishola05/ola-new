import React from 'react'
import { Drafts } from '@/components'
import CreateButton from '@/components/Button/CreateProjectBtn';
import Noprojects from '@/components/Projects/NoProject';
import prisma from '@/app/lib/prisma';

const getProjects = async () => {
  // const res = await fetch(`${process.env.API_URL}/projects`, {
  //   next: {
  //     revalidate: 1,
  //     tags: ['projects'],
  //   }
  // })
  // if (!res.ok) {
  //   throw new Error('Something went wrong')
  // }
  // return res.json()
  const projects = await prisma.project.findMany({})

  if (!projects) {
    throw new Error('Something went wrong')
  }

  return projects
}

async function Projects() {
  const projects = await getProjects()
  return (
    <>
      <div
        className='my-0 mx-auto'
      >
        {projects?.length > 0 && (
          <div
            className='flex justify-end mt-5'
          >
            <CreateButton />
          </div>
        )}
        <h1
          className='text-4xl font-bold text-center text-[var(--textColor)] mt-5'
        >Project Drafts</h1>
        {projects?.length === 0 && <Noprojects />}
        {projects?.length > 0 && <Drafts projects={projects} />}
      </div>
    </>
  )
}

export default Projects