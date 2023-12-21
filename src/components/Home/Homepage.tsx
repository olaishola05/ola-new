'use client';

import React from 'react'
import Hero from '../HeroPage/Hero'
import ProjectSection from '../Projects/ProjectSection'
import { Project } from '@/app/types'
import BlogSection from '../Blogs/BlogSection'
import { useToggle } from '@/app/hooks';
import ProjectModal from '../Modal/ProjectModal';
import { BlogModal } from '..';
import { socialLinks } from '@/app/utils';
import { Icons } from '..'
import Niches from '../Niche/Niches';


type props = {
  projects: any
  posts: any
}

export default function Homepage({ projects, posts }: props) {
  const { isOpen: openModal, toggleOpen: setOpenModal } = useToggle(false)
  const { isOpen: openBlogModal, toggleOpen: setOpenBlogModal } = useToggle(false)
  const [project, setProject] = React.useState({})
  const [blog, setBlog] = React.useState({})

  const handleOpenModal = (id: string) => {
    setOpenModal()
    const project = projects?.find((item: Project) => item.id === id)
    setProject(project || {})
  }

  const handleOpenBlogModal = (guid: string) => {
    setOpenBlogModal()
    const item = posts?.items?.find((item: any) => item.guid === guid)
    setBlog(item)
  }

  return (
    <div className='relative'>
      {openModal && <ProjectModal open={openModal} handleClose={handleOpenModal} project={project} />}
      {openBlogModal && <BlogModal blogItem={blog} open={openBlogModal} handleClose={handleOpenBlogModal} />}
      <Hero />
      <Niches />
      <ProjectSection data={projects} handleOpenModal={handleOpenModal} />
      <BlogSection data={posts} handleOpenBlogModal={handleOpenBlogModal} />

      <div
        data-aos="fade-up"
        data-aos-duration="3000"
        className='hidden right-2 bottom-60 p-0 gap-2 my-0 text-3xl lg:flex lg:flex-col md:gap-3 lg:my-0 lg:mx-0 lg:mb-60 lg:fixed lg:right-10 lg:bottom-0 z-10'
      >
        {socialLinks.map((link) => (
          <div
            key={link.id}
            data-aos="zoom-in-up" data-aos-duration="8000"
          >
            <Icons link={link} />
          </div>
        ))}
      </div>
    </div>
  )
}
