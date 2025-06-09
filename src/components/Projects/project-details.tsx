import React from 'react'
import ProjectCarousel from './project-carousel'
import { CustomButton } from '@/components'
import Link from 'next/link'
import { BsGithub as GitHubIcon } from 'react-icons/bs'
import { BiLinkExternal as LinkIcon } from 'react-icons/bi'

export default function ProjectDetails({ data, project }: { data: any; project: any }) {
  return (
    <>
      <ProjectCarousel data={data} />
      <div className='w-full md:max-w-5xl mx-auto p-4'>
        <div className='text-textColor text-base md:text-lg font-light'>
          {project.description.map((text: string, index: number) => (
            <p key={index} className='mb-4'>{text}</p>
          ))}
          <p className='mb-4 italic text-textColor font-light'>Tech Stacks: {project.stacks.join(', ')}</p>
        </div>
        <div className="flex items-center justify-between w-full gap-5">
          <div className="flex gap-4 items-center my-5">
            {project?.liveUrl.startsWith("https") && (
              <CustomButton variant="contained" color="primary" width="180px">
                <Link
                  className="flex gap-3 items-center"
                  href={project?.liveUrl}
                  target="_blank"
                >
                  Live here <LinkIcon />
                </Link>
              </CustomButton>
            )}

            {project?.githubUrl.startsWith("https") && (
              <CustomButton variant="outlined" color="primary" width="180px">
                <Link
                  className="flex gap-3 items-center"
                  href={project?.githubUrl}
                  target="_black"
                >
                  Source <GitHubIcon />
                </Link>
              </CustomButton>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
