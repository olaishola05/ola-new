import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface CurrentWorkProps {
  appImage: string
  appTitle: string
  appDescription: string
  link: string
  role: string
  year: string
}

const CurrentWork: React.FC<CurrentWorkProps> = ({ appImage, role, appTitle, appDescription, year, link }) => {
  return (
    <div data-aos="fade-up" className='flex flex-col gap-6 w-[95%] my-4 mx-auto p-4 lg:w-[90%] rounded-2xl lg:flex-row md:items-center md:justify-between md:gap-5 shadow-xl md:p-6 bg-[var(--contactBg)] border border-softBg transition-all duration-300 hover:shadow-2xl'>
      <div className='flex flex-col gap-4 lg:gap-6 lg:flex-row lg:items-center'>
        <div className="relative w-full h-[200px] lg:w-[280px] lg:h-[160px] rounded-xl overflow-hidden shrink-0">
          <Image src={appImage} alt={appTitle} fill className='object-cover' />
        </div>
        <div className='flex flex-col gap-2'>
          <p className='text-xs font-bold uppercase tracking-widest text-cta'>{year}</p>
          <h4 className='text-2xl md:text-3xl font-bold tracking-tight text-[var(--textColor)]'>{appTitle}</h4>
          <h5 className='text-sm md:text-base font-semibold text-[var(--textColor)]'>{role}</h5>
          <p className='lg:w-[400px] text-base text-softText leading-relaxed mt-2'>
            {appDescription}
          </p>
        </div>
      </div>
      <Link href={link} target='_blank'
        rel='noopener noreferrer'
        className='px-8 py-3 bg-cta text-ctaText font-bold rounded-xl shadow-lg shadow-cta/20 hover:scale-105 active:scale-95 transition-all text-sm tracking-wide text-center shrink-0'>
        View Work
      </Link>
    </div>
  )
}


export default CurrentWork