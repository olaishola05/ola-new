import React from 'react'
import AboutMe from './about-me'
import AboutSkills from './about-skills'

export default function AboutParentComponent() {
  return (
    <section className="py-14 mb-10"
      id="about"
      data-aos="fade-up"
      data-aos-duration="3000"
      data-aos-anchor-placement="top-center"
      data-aos-easing="ease-in-out"
      data-aos-delay="200"
    >
      <p
        className="info text-[var(--textColor)] text-center text-base md:text-xl font-light"
        data-aos="zoom-in-up"
        data-aos-duration="8000"
      >
        Get to know me better and my skills
      </p>
      <h1 className="text-2xl md:text-6xl text-center">Me & My Tools</h1>
      <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-4 py-10'>
        <AboutMe />
        <AboutSkills />
      </div>
    </section>
  )
}
