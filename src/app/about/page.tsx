import React from 'react'
import { AboutPage } from '@/components'
import { Metadata } from 'next'
import prisma from '@/app/lib/prisma'

export const metadata: Metadata = {
  title: 'About | Oladipupo Ishola',
  description: 'I am a fullstack developer, I build web applications with React, Nextjs, Nodejs, Expressjs, MongoDB, PostgreSQL, and other technologies.',
}

export const revalidate = 3600

async function getAbout() {
  try {
    const about = await prisma.about.findMany()
    return { data: about }
  } catch (error) {
    console.error("Error fetching about:", error)
    return { data: null }
  }
}

export default async function AboutHomePage() {
  const about = await getAbout()
  return (
    <div data-aos="fade-up">
      <AboutPage data={about?.data?.[0]} />
    </div>
  )
}

