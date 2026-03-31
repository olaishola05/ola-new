import React from 'react'
import ProjectCarousel from './project-carousel'
import Link from 'next/link'
import { BsGithub as GitHubIcon } from 'react-icons/bs'
import { BiLinkExternal as LinkIcon } from 'react-icons/bi'

export default function ProjectDetails({ data, project }: { data: any; project: any }) {
  return (
    <>
      <ProjectCarousel data={data} />
      <div className='w-full md:max-w-4xl mx-auto p-4 md:p-8 mt-6'>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-cta">Project Overview</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--textColor)] tracking-tight">
              {project.name}
            </h2>
          </div>

          <div className='text-base md:text-lg text-softText leading-relaxed space-y-4'>
            {project.description.map((text: string, index: number) => (
              <p key={index}>{text}</p>
            ))}
          </div>

          <div className='pt-6'>
            <span className="text-xs font-bold uppercase tracking-widest text-softText mb-4 block">Tech Stack</span>
            <div className="flex flex-wrap gap-2">
              {project.stacks.map((stack: string, index: number) => (
                <span key={index} className="px-3 py-1.5 bg-cta/5 border border-cta/10 text-cta text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
                  {stack}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-4 items-center mt-6 pt-8 border-t border-softBg/30">
            {project?.liveUrl?.startsWith("https") && (
              <Link
                href={project?.liveUrl}
                target="_blank"
                className="px-6 py-3 bg-cta text-ctaText font-bold rounded-xl shadow-lg shadow-cta/20 hover:scale-105 active:scale-95 transition-all text-sm tracking-wide flex gap-3 items-center"
              >
                Live Preview <LinkIcon className="text-lg" />
              </Link>
            )}

            {project?.githubUrl?.startsWith("https") && (
              <Link
                href={project?.githubUrl}
                target="_blank"
                className="px-6 py-3 bg-[var(--contactBg)] border border-softBg text-[var(--textColor)] font-bold rounded-xl hover:bg-softBg/10 hover:scale-105 active:scale-95 transition-all text-sm tracking-wide flex gap-3 items-center shadow-md"
              >
                Source Code <GitHubIcon className="text-lg" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

