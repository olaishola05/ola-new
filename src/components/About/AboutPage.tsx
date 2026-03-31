'use client';

import React from 'react'
import { EditAboutForm } from '@/components'
import AboutImage from './AboutImage'
import CurrentWork from './CurrentWork'
import AboutContent from './AboutContent'
import ResumeTabs from './ResumeTabs'
import { useSession } from 'next-auth/react';
import { About } from '@/app/types'
import { useMediaQuery } from '@/app/hooks'
import Image from 'next/image'

interface AboutPageProps {
  data: any
}

const AboutPage = ({ data }: AboutPageProps) => {
  const { data: session }: any = useSession()
  const [isEditable, setIsEditable] = React.useState(false)
  const aboutData: About = data

  const toggleEditable = () => {
    setIsEditable(!isEditable)
  }

  const userLoggedIn = session?.user?.email && session?.user?.role === 'admin'
  const isMobile = useMediaQuery('(max-width: 600px)')

  return (
    <main data-aos="fade-up" data-aos-duration="3000"
      className='w-full flex flex-col md:mt-20'
    >
      {isEditable && userLoggedIn ? (
        <>
          <EditAboutForm about={data} toggleEdit={toggleEditable} />
        </>
      ) : (
        <>
          <div className='w-[95%] flex flex-col gap-8 md:w-[92%] md:flex-row md:items-center md:mx-auto' data-aos="fade-up">
            <AboutContent content={data} />
            {isMobile ?
              <Image src={aboutData?.profileImgUrl} alt='Ola' width={300} height={400} className='w-[150px] h-[150px] rounded-full object-cover shadow-xl self-center' /> :
              <AboutImage photo={aboutData?.profileImgUrl} />}
          </div>
          <div className='current w-[95%] my-8 mx-auto flex flex-col justify-between items-center md:w-[90%] md:my-12' data-aos="fade-up">
            <div className="flex flex-col items-center justify-center gap-3 mb-10 mt-8">
              <span className="text-xs font-bold uppercase tracking-widest text-cta">Recent Roles</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--textColor)] tracking-tight text-center">
                Work History
              </h2>
            </div>
            {aboutData?.currentWorks?.map((work, idx) => (
              <CurrentWork
                key={idx}
                appImage={work.imageUrl}
                year={work.date}
                appTitle={work.name}
                role={work.role}
                link={work.link}
                appDescription={work.description}
              />
            ))}
          </div>
          {userLoggedIn && <div className='btn-container flex justify-center items-center my-0 mx-auto w-1/2'>
            <button type='button' className='editBtn w-3/12 bg-[var(--cta)]text-[var(--ctaText)] border-none cursor-pointer rounded-md transition-all duration-300 ease-in-out text-lg' onClick={toggleEditable}>
              Edit
            </button>
          </div>}
        </>
      )}

      <div className='resume flex my-16 mx-auto md:mx-0 md:my-20 flex-col items-center' data-aos="fade-up">
        <div className="flex flex-col items-center justify-center gap-3 mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-cta">Qualifications</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--textColor)] tracking-tight text-center" id="resume">
            My Resume
          </h2>
        </div>
        <ResumeTabs />
      </div>
    </main>
  )
}

export default AboutPage