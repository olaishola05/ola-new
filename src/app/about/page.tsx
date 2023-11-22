import React from 'react'
import { AboutPage } from '@/components'
import { Metadata } from 'next'
import prisma from '../lib/prisma'

export const metadata: Metadata = {
  title: 'About | Oladipupo Ishola',
  description: 'About Oladipupo Ishola',
}

const getAbout = async () => {
  // const res = await fetch(`${process.env.API_URL}/about`, {
  //   next: {
  //     revalidate: 3600,
  //   }
  // })

  // if (!res.ok) {
  //   throw new Error(res.statusText)
  // }

  // return res.json()

  const about = await prisma.about.findMany({})

  if (!about) {
    throw new Error('Something went wrong')
  }

  return about
}

const AboutHomePage = async () => {
  const about = await getAbout()
  // console.log(about[0].currentWorks, 'about')
  return (
    <div data-aos="fade-up">
      <AboutPage data={about[0]} />
    </div>
  )
}

export default AboutHomePage