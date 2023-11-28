import React from 'react'
import { AboutPage } from '@/components'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About | Oladipupo Ishola',
  description: 'I am a fullstack developer, I build web applications with React, Nextjs, Nodejs, Expressjs, MongoDB, PostgreSQL, and other technologies.',
}

const getAbout = async () => {
  const res = await fetch(`${process.env.API_URL}/about`, {
    next: {
      revalidate: 3600,
    }
  })

  if (!res.ok) {
    throw new Error(res.statusText)
  }
  return res.json()
}

const AboutHomePage = async () => {
  const about = await getAbout()
  return (
    <div data-aos="fade-up">
      <AboutPage data={about?.data[0]} />
    </div>
  )
}

export default AboutHomePage