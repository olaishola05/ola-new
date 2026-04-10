import React from 'react'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default function AboutMe() {
  const about = [
    "Oladipupo Ishola is a software engineer, product builder, and educator who helps developers and founders use AI to build faster, smarter, and more profitably. With a background spanning network engineering, two failed startups, a self-built edtech school, and years of freelance product development, he brings rare depth to a space full of surface-level advice.",
    "He has mentored developers across Nigeria, Austria, and beyond — many landing their first roles or shipping their first real products within months. He now builds AI-assisted development workflows, teaches what actually works, and documents the honest lessons from doing both.",
    "His approach is simple: learn the right things, build real things, and create a system that works with or without a team."
  ]
  return (
    <div>
      <h3
        className='text-2xl md:text-3xl font-extrabold text-[var(--textColor)] tracking-tight mb-6'
        data-aos="zoom-in-right"
        data-aos-duration="3000"
        data-aos-anchor-placement="top-center"
      >About Me</h3>

      <div className="w-full md:w-10/12 md:px-0"
        data-aos="zoom-in-up"
        data-aos-duration="3000"
        data-aos-anchor-placement="top-center"
      >
        {about.map((text, index) => (
          <p
            key={index}
            className="text-base md:text-lg text-softText leading-relaxed mb-6"
          >
            {text}
          </p>
        ))}

        <div className="flex gap-4">
          <Link
            href="/about"
            className="flex items-center gap-1 text-primary hover:text-blue-800 font-medium"
          >
            More about me <ChevronRight className="h-4 w-4" />
          </Link>
          <Link
            href="#contact"
            className="flex items-center gap-1 text-primary hover:text-blue-800 font-medium"
          >
            Get in touch <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
