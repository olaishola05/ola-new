import React from 'react'
import { Drafts } from '@/components'
import CreateButton from '@/components/Button/CreateProjectBtn';
import Noprojects from '@/components/Projects/NoProject';
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Project Drafts - Dashboard',
  description: 'Project drafts page',
}

const getProjects = async () => {
  const res = await fetch(`${process.env.API_URL}/projects`, {
    next: {
      revalidate: 1,
      tags: ['projects'],
    }
  })
  if (!res.ok) {
    throw new Error('Something went wrong')
  }
  return res.json()
}

async function Projects() {
  const res = await getProjects()
  const projects = res?.data
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