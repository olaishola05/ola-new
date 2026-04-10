import React from 'react'
import Link from 'next/link'

const Certification = () => {
  return (
    <div className='w-full lg:w-[90%] flex flex-col items-center justify-center my-12 mx-auto' data-aos="zoom-in-up">
      <h3 className='text-center text-2xl md:text-3xl font-extrabold text-[var(--textColor)] tracking-tight mb-3'>Certification & Trainings</h3>
      <p className='text-base md:text-lg text-softText leading-relaxed text-center mb-8'>Here are some of the certifications and trainings I have completed.</p>

      <ul className='w-full lg:w-[70%] mx-auto p-6 md:p-8 flex flex-col gap-5 rounded-2xl bg-[var(--contactBg)] border border-softBg/30 shadow-xl'>
        <li className='text-base md:text-lg text-[var(--textColor)] transition-all duration-300 ease-in-out'>
          <span className="font-semibold block md:inline mb-1 md:mb-0">Remote Full Stack Web Development Course</span>
          <span className="hidden md:inline mx-2 text-softText">-</span>
          <Link className='text-cta font-bold hover:underline underline-offset-4 tracking-wide' href="https://www.credential.net/535b9041-ea31-4b61-aa42-960bebc001f6#gs.wdx1dk" target="_blank" rel="noopener noreferrer">View Certificate</Link>
        </li>
        <li className='text-base md:text-lg text-[var(--textColor)] transition-all duration-300 ease-in-out'>
          <span className="font-semibold block md:inline mb-1 md:mb-0">Google Africa Developer Training Program on Google Cloud Platform</span>
          <span className="hidden md:inline mx-2 text-softText">-</span>
          <Link className='text-cta font-bold hover:underline underline-offset-4 tracking-wide' href="https://adscerts.com/scholar/8FE477CD48800ECF" target="_blank" rel="noopener noreferrer">View Certificate</Link>
        </li>
      </ul>
    </div>
  )
}

export default Certification