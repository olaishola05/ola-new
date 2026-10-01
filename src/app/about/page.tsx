import React from 'react'
import { AboutPage } from '@/components'
import { Metadata } from 'next'
import prisma from '@/app/lib/prisma'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Software engineer and product builder with expertise in TypeScript, Python, Next.js, FastAPI, and AI-assisted workflows. Learn about my background, experience, and engineering philosophy.',
  alternates: {
    canonical: 'https://olaishola.tech/about',
  },
  openGraph: {
    title: 'About | Oladipupo Ishola',
    description:
      'Software engineer and product builder with expertise in TypeScript, Python, Next.js, and AI-assisted workflows.',
    url: 'https://olaishola.tech/about',
    type: 'profile',
    images: [
      {
        url: '/images/portrait-me.jpeg',
        width: 1200,
        height: 630,
        alt: 'Oladipupo Ishola',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About | Oladipupo Ishola',
    description:
      'Software engineer and product builder with expertise in TypeScript, Python, Next.js, and AI-assisted workflows.',
  },
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

