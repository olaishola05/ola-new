import React from 'react'
import { Metadata } from 'next';
import Homepage from '@/components/Home/Homepage';
import prisma from './lib/prisma';

export const metadata: Metadata = {
  title: 'Ola Ishola | Software Engineer',
  description: 'Personal website built with NextJS, Prisma, MongoDB and Tailwind CSS',
}

const getProjects = async (state: boolean) => {
  // const res = await fetch(`${process.env.API_URL}/projects?published=${state}`, {
  //   cache: 'no-cache',
  // })
  // if (!res.ok) {
  //   throw new Error('Something went wrong')
  // }
  // return res.json()
  const projects = await prisma.project.findMany({
    where: {
      published: state
    }
  })

  if (!projects) {
    throw new Error('Something went wrong')
  }

  return projects
}

const getMediumPosts = async () => {
  const res = await fetch(`${process.env.MEDIUM_API_URL}`)
  if (!res.ok) {
    console.log(res, 'res')
    throw new Error('Something went wrong')
  }
  return res.json()
}

export default async function Home() {
  const projectsData = getProjects(true)
  const postsData = getMediumPosts()
  const [projects, posts] = await Promise.all([projectsData, postsData])
  return (
    <main className="mt-4">
      <Homepage projects={projects} posts={posts} />
    </main>
  )
}