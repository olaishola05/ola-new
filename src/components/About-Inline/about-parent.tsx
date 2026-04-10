import React from 'react'
import AboutMe from './about-me'
import AboutSkills from './about-skills'
import ElevatorPitch from './elevator-pitch'

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
      <div className="flex flex-col items-center justify-center gap-3 mb-6">
        <span className="text-xs font-bold uppercase tracking-widest text-cta" data-aos="zoom-in-up">About</span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--textColor)] tracking-tight text-center">
          Me & My Tools
        </h2>
      </div>
      <div className='w-full md:w-11/12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-4 py-10 mx-auto'>
        <AboutMe />
        <AboutSkills />
        {/* <ElevatorPitch /> */}
      </div>
    </section>
  )
}
