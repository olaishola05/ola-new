import prisma from '@/app/lib/prisma';
import React from 'react'
import Link from 'next/link';
import { ArrowBigLeft } from 'lucide-react';
import ProjectDetails from '@/components/Projects/project-details';
import ProjectsNavigations from '@/components/Projects/projects-navigation';
import { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/config';

const slugTitle = (title: string) => {
  return title.replace(/[^a-z0-9]+/gi, '-').toLowerCase();
}

export async function generateStaticParams(): Promise<{ name: string }[]> {
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
      name: slugTitle(project.name),
    }));
  }
  return [];
}

const fetchProject = async (name: string) => {
  const project = await prisma.project.findUnique({
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

export async function generateMetadata({ params }: { params: { name: string } }): Promise<Metadata> {
  const title = params.name
    .replace(/-/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const project = await fetchProject(title);

  if (!project) {
    return {
      title: 'Project Case Study',
      description: 'Engineering case study and architecture breakdown.',
    };
  }

  const descriptionText = Array.isArray(project.description)
    ? project.description[0] || `Case study and technical architecture for ${project.name}, engineered by Oladipupo Ishola.`
    : (project.description as unknown as string) || `Case study and technical architecture for ${project.name}, engineered by Oladipupo Ishola.`;
  const primaryImage = (project.images as any)?.[0]?.url || `${SITE_CONFIG.siteUrl}/images/portrait-me.jpeg`;

  return {
    title: `${project.name} — Case Study`,
    description: descriptionText,
    alternates: {
      canonical: `${SITE_CONFIG.siteUrl}/projects/${params.name}`,
    },
    openGraph: {
      title: `${project.name} | Technical Case Study | Oladipupo Ishola`,
      description: descriptionText,
      url: `${SITE_CONFIG.siteUrl}/projects/${params.name}`,
      type: 'article',
      images: [
        {
          url: primaryImage,
          width: 1200,
          height: 630,
          alt: project.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.name} — Technical Case Study`,
      description: descriptionText,
      images: [primaryImage],
    },
  };
}

export default async function ProjectDetailsPage({ params }: { params: { name: string } }) {
  const { name } = params;
  if (!name) {
    return <div>Project not found</div>;
  }

  const title = name.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  const [project, projects] = await Promise.all([fetchProject(title), fetchProjects()]);

  if (!project) {
    return <div>{`Project with name ${title} not found`}</div>;
  }

  if (project.name.toLowerCase() === 'portfolio' || name === 'portfolio') {
    project.liveUrl = 'https://olaishola.tech';
  }

  if (!projects || projects.length === 0) {
    return <div>No projects available</div>;
  }

  const projectIdx = projects.findIndex((p) => p.name === title)
  const nextProject = projectIdx + 1 < projects.length ? projects[projectIdx + 1] : null;
  const prevProject = projectIdx - 1 >= 0 ? projects[projectIdx - 1] : null;

  const projectUrl = `${SITE_CONFIG.siteUrl}/projects/${name}`;
  const schemaDescription = Array.isArray(project.description) ? project.description.join(' ') : (project.description || '');

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareSourceCode',
            name: project.name,
            description: schemaDescription,
            url: projectUrl,
            author: {
              '@type': 'Person',
              name: SITE_CONFIG.author,
              url: SITE_CONFIG.siteUrl,
            },
          }),
        }}
      />
      <div className='min-h-screen pt-28 pb-16'>
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 mb-6">
          <Link
            href='/#selected-work'
            className='inline-flex items-center gap-2 text-cta font-bold text-xs uppercase tracking-wider hover:gap-3 transition-all'
          >
            <ArrowBigLeft className='w-4 h-4' /> Back to Selected Work
          </Link>
        </div>
        <ProjectDetails data={project.images} project={project} />
        <ProjectsNavigations prevProject={prevProject} nextProject={nextProject} />
      </div>
    </>
  )
}
