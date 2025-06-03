import prisma from '@/app/lib/prisma';
import React from 'react'
import Link from 'next/link';
import { ArrowBigLeft } from 'lucide-react';
import ProjectDetails from '@/components/Projects/project-details';
import ProjectsNavigations from '@/components/Projects/projects-navigation';

const slugTitle = (title: string) => {
  return title.replace(/[^a-z0-9]+/gi, '-').toLowerCase();
}

export async function generateStaticParams(): Promise<{ title: string }[]> {
  const projects = await prisma.project.findMany({
    where: {
      published: true,
    },
    select: {
      name: true,
    },
  });

  if (projects && projects.length > 0) {
    return projects.map((project) => ({
      title: slugTitle(project.name),
    }));
  }
  return [];
}

const fetchProject = async (name: string) => {
  const project = prisma.project.findUnique({
    where: {
      name: name
    },
  });
  return project;
}

const fetchProjects = async () => {
  const projects = await prisma.project.findMany({
    where: {
      published: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return projects;
}

export default async function ProjectDetailsPage({ params }: { params: { name: string } }) {
  const { name } = params;
  if (!name) {
    return <div>Project not found</div>;
  }

  const title = name.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  const projectData = fetchProject(title);
  const projectsData = fetchProjects();

  const [project, projects] = await Promise.all([projectData, projectsData]);

  if (!project) {
    return <div>{`Project with name ${title} not found`}</div>;
  }

  if (!projects || projects.length === 0) {
    return <div>No projects available</div>;
  }

  const projectIdx = projects.findIndex((project) => project.name === title)
  const nextProject = projectIdx + 1 < projects.length ? projects[projectIdx + 1] : null;
  const prevProject = projectIdx - 1 >= 0 ? projects[projectIdx - 1] : null;
  console.log('Project:', project.images);

  return (
    <div className='mt-36 mb-10'>
      <Link href='/' className='flex gap-1 absolute top-28 left-2 md:left-8 text-cta font-semibold text-base hover:text-primary transition-colors'>
        <ArrowBigLeft className='w-6 h-6' />Back to Home
      </Link>
      <h1 className='text-2xl md:text-4xl text-center text-pry font-semibold mb-5'>{title}</h1>
      <ProjectDetails data={project.images} project={project} />
      <ProjectsNavigations prevProject={prevProject} nextProject={nextProject} />
    </div>
  )
}
