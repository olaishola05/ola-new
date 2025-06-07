"use client";

import { slugify } from '@/app/utils/utilities'
import React from 'react'
import { ArrowLeftCircle, ArrowRightCircle } from 'lucide-react';
import Link from 'next/link';

export default function ProjectsNavigations({ prevProject, nextProject }: { prevProject: { name: string } | null, nextProject: { name: string } | null }) {
  return (
    <div className='w-full md:max-w-5xl mx-auto p-4 flex justify-between items-center gap-4'>
      {prevProject && (
        <Link href={`/projects/${slugify(prevProject.name)}`} className="text-cta hover:text-primary transition-colors flex gap-1">
          <ArrowLeftCircle className='w-6 h-6' />
          <span className='font-bold'>Previous Project</span>
        </Link>
      )}
      {nextProject && (
        <Link href={`/projects/${slugify(nextProject.name)}`} className="text-cta hover:text-primary transition-colors flex gap-1">
          <span className='font-bold'>Next Project</span>
          <ArrowRightCircle className='w-6 h-6' />
        </Link>
      )}
    </div>
  )
}
