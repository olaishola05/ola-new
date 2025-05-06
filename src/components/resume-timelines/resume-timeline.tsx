import React from 'react'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import MiniExperienceTimeline from './mini-experience'
import MiniEducationTimeline from './mini-education'

export default function ResumeTimeline() {
  return (
    <section className="py-14 mb-10"
      id="resume-timeline"
      data-aos="fade-up"
      data-aos-duration="3000"
      data-aos-anchor-placement="top-center"
      data-aos-easing="ease-in-out"
      data-aos-delay="200">
      <p
        className="info text-[var(--textColor)] text-center text-base md:text-xl font-light"
        data-aos="zoom-in-up"
        data-aos-duration="8000"
      >
        My professional journey and academic background that have shaped my skills and knowledge.
      </p>
      <h2 className="text-2xl md:text-6xl text-center">Experience & Education</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-5 py-10">
        <MiniExperienceTimeline />
        <MiniEducationTimeline />
      </div>

      <div className="flex gap-4">
        <Link
          href="/about#resume"
          className="flex items-center gap-1 text-primary hover:text-blue-800 font-medium"
        >
          More about my resume <ChevronRight className="h-4 w-4" />
        </Link>
        <Link
          href="#contact"
          className="flex items-center gap-1 text-primary hover:text-blue-800 font-medium"
        >
          Get in touch <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  )
}
