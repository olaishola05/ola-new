import React from 'react'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default function AboutMe() {
  const about = [
    "I’m a software engineer and product builder with experience building full-stack applications, robust backend systems, and digital products for startups and teams.",
    "I’m currently pursuing an MSc in Artificial Intelligence and Adaptive Systems at the University of Sussex, where I’m deepening my understanding of machine learning, intelligent systems, and adaptive behavior.",
    "My work sits at the intersection of software engineering, product development, and AI — building practical systems while exploring how intelligent technologies can make products more capable, useful, and scalable."
  ];
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
