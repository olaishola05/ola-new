import React from 'react'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default function AboutMe() {
  const about = [
    "Oladipupo Ishola is a Software Developer passionate about building human-centered, scalable web applications that solve real-world problems across Africa and beyond. Currently contributing to EdTech innovation at Techverse Academy, he collaborates with cross-functional teams to build dynamic learning platforms using Next.js, NestJS, and PostgreSQL. His goal is to leverage his growing expertise to lead the development of impactful, AI-powered tools that bridge digital access gaps in emerging markets.",
    "Previously, Ola worked as a Full Stack Developer at Automated Affairs, where he co-built an AI resume builder tailored for the African job market, implementing over 20 high-accuracy RESTful APIs. He also served as a mentor at Microverse Inc., helping junior developers succeed in a rigorous full-stack program, with many finishing in the top 10% of their cohort.",
    "With an MSc in Computer Networking from the University of Bedfordshire, UK and over three years of experience in full-stack development, Ola is committed to continuous learning and using technology as a force for good."
  ]
  return (
    <div>
      <h2
        className='text-2xl md:text-4xl font-semibold text-primary'
        data-aos="zoom-in-right"
        data-aos-duration="3000"
        data-aos-anchor-placement="top-center"
      >About Me</h2>
      <hr className='border-textColor w-1/6 my-2 mb-6'
        data-aos="zoom-in-left"
        data-aos-duration="4000"
        data-aos-anchor-placement="top-center"
      />

      <div className="w-full md:w-10/12 md:px-0"
        data-aos="zoom-in-up"
        data-aos-duration="3000"
        data-aos-anchor-placement="top-center"
      >
        {about.map((text, index) => (
          <p
            key={index}
            className="text-lg text-textColor mb-6"
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
