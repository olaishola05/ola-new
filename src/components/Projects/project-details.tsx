'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BsGithub as GitHubIcon } from 'react-icons/bs';
import { BiLinkExternal as LinkIcon } from 'react-icons/bi';
import { CheckCircle2, ShieldCheck, Zap, Award, Users, Layers, Server } from 'lucide-react';
import { slugify } from '@/app/utils/utilities';

interface ProjectDetailsProps {
  data: string[];
  project: {
    id: string;
    name: string;
    description: string[];
    githubUrl: string | null;
    liveUrl: string | null;
    coverImgUrl: string | null;
    stacks: string[];
    images: string[];
    tag: string | null;
  };
}

// Case study enrichment data for flagship systems
const CASE_STUDY_METADATA: Record<
  string,
  {
    role: string;
    impact: string;
    domain: string;
    challenge: string;
    architectureNotes: string[];
  }
> = {
  'ohiole-lagos': {
    role: 'Fullstack Engineer (Team Collaboration)',
    impact: '$5,000 Business Award Winner',
    domain: 'E-Commerce & Digital Storefront',
    challenge:
      'The client was operating purely through manual Instagram DM sales, causing severe bottlenecks in order processing, customer drop-off, and inability to handle international payments.',
    architectureNotes: [
      'Collaborated on engineering an automated web storefront using Next.js 14 App Router, Zustand, and Tailwind CSS.',
      'Developed performant backend architecture using Prisma ORM, PostgreSQL, and Redis for catalog caching.',
      'Implemented dual-currency payment flows (USD and NGN) with automated checkout and order fulfillment notifications.',
      'Delivered mobile-responsive UX with sub-second page loads, leading to the client winning a $5,000 competition award.',
    ],
  },
  'techverse-academy': {
    role: 'Full-stack Developer (Team of 4)',
    impact: '0% Post-release Bug Rate across first 2 updates',
    domain: 'EdTech & Learning Management System',
    challenge:
      'Needed a performant, remote-first coding academy platform supporting dynamic course deliveries, interactive learning materials, and scalable student record management.',
    architectureNotes: [
      'Collaborated within a cross-functional team of 4 to design system architecture and relational ERD schemas.',
      'Designed and deployed modular NestJS RESTful APIs integrated with PostgreSQL.',
      'Implemented robust input validation, role-based authentication, and search engine optimization using Next.js metadata.',
      'Maintained distributed Git workflows, conducting strict code reviews that resulted in a 0% post-release bug rate.',
    ],
  },
};

const isValidHttpUrl = (val?: string | null): val is string => {
  if (!val) return false;
  const trimmed = val.trim();
  return (
    trimmed.length > 0 &&
    trimmed !== "#" &&
    trimmed !== "/" &&
    (trimmed.startsWith("http://") || trimmed.startsWith("https://"))
  );
};

export default function ProjectDetails({ data, project }: ProjectDetailsProps) {
  const slug = slugify(project.name);
  const metadata = CASE_STUDY_METADATA[slug];
  const isCaseStudy = Boolean(metadata);
  const hasLive = isValidHttpUrl(project.liveUrl);
  // Flagship client projects are proprietary/private
  const hasGithub = isValidHttpUrl(project.githubUrl) && !isCaseStudy;
  const images = data && data.length > 0 ? data : project.coverImgUrl ? [project.coverImgUrl] : [];
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <article className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* Header section */}
      <header className="space-y-6 pb-8 border-b border-softBg/60">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-widest text-cta">
            Engineering Case Study
          </span>
          <span className="h-1 w-1 rounded-full bg-softText/40" />
          <span className="text-xs font-semibold uppercase tracking-wider text-softText/80">
            {metadata?.domain || project.tag || 'Fullstack System'}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-textColor tracking-tight">
          {project.name}
        </h1>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          {hasLive && (
            <Link
              href={project.liveUrl!}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cta text-ctaText font-bold text-xs uppercase tracking-wider hover:scale-105 active:scale-95 transition-all shadow-lg shadow-cta/20"
            >
              Live Application <LinkIcon className="w-4 h-4" />
            </Link>
          )}

          {hasGithub ? (
            <Link
              href={project.githubUrl!}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-softBg/60 border border-softBg hover:border-cta/40 text-textColor font-bold text-xs uppercase tracking-wider hover:scale-105 active:scale-95 transition-all"
            >
              Source Code <GitHubIcon className="w-4 h-4" />
            </Link>
          ) : isCaseStudy ? (
            <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-softBg/30 border border-softBg/60 text-softText/70 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-cta" /> Client / Proprietary Repository
            </span>
          ) : null}
        </div>

        {/* 4-Card Meta Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-4">
          <div className="p-4 rounded-xl bg-softBg/30 border border-softBg/50 flex flex-col justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-softText/70 flex items-center gap-1.5 mb-1">
              <Users className="w-3.5 h-3.5 text-cta" /> Role & Collaboration
            </span>
            <span className="text-xs sm:text-sm font-semibold text-textColor">
              {metadata?.role || (project.tag ? `${project.tag} Engineer` : 'Fullstack Engineer')}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-softBg/30 border border-softBg/50 flex flex-col justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-softText/70 flex items-center gap-1.5 mb-1">
              <Award className="w-3.5 h-3.5 text-cta" /> Key Metric / Impact
            </span>
            <span className="text-xs sm:text-sm font-semibold text-textColor">
              {metadata?.impact || 'Production Deployment'}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-softBg/30 border border-softBg/50 flex flex-col justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-softText/70 flex items-center gap-1.5 mb-1">
              <Layers className="w-3.5 h-3.5 text-cta" /> Architecture
            </span>
            <span className="text-xs sm:text-sm font-semibold text-textColor">
              {project.stacks[0] || 'Modular Web Stack'}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-softBg/30 border border-softBg/50 flex flex-col justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-softText/70 flex items-center gap-1.5 mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-cta" /> Status
            </span>
            <span className="text-xs sm:text-sm font-semibold text-emerald-400">
              Active / Shipped
            </span>
          </div>
        </div>
      </header>

      {/* Visual Preview Window (Clean, Tasteful Mockup - No Clunky Autoplay) */}
      {images.length > 0 && (
        <section className="my-10 space-y-4">
          <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-softBg/70 bg-softBg/20 shadow-xl">
            <Image
              src={images[activeImageIndex]}
              alt={`${project.name} preview`}
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 896px"
              priority
            />
          </div>

          {images.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 aspect-video rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                    activeImageIndex === idx ? 'border-cta scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Deep-dive Content */}
      <div className="space-y-10 my-8">
        {/* The Challenge */}
        {metadata?.challenge && (
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-textColor tracking-tight flex items-center gap-2">
              <Zap className="w-5 h-5 text-cta" /> The Business Challenge
            </h2>
            <p className="text-base text-softText leading-relaxed">
              {metadata.challenge}
            </p>
          </section>
        )}

        {/* Project Description */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-textColor tracking-tight">
            System Overview & Implementation
          </h2>
          <div className="text-base text-softText leading-relaxed space-y-4">
            {project.description.map((paragraph: string, idx: number) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </section>

        {/* Key Engineering Highlights */}
        {metadata?.architectureNotes && metadata.architectureNotes.length > 0 && (
          <section className="space-y-4 p-6 rounded-2xl bg-softBg/20 border border-softBg/50">
            <h2 className="text-lg font-bold text-textColor tracking-tight flex items-center gap-2">
              <Server className="w-4 h-4 text-cta" /> Key Engineering Deliverables
            </h2>
            <ul className="space-y-2.5">
              {metadata.architectureNotes.map((note, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm sm:text-base text-softText">
                  <CheckCircle2 className="w-4 h-4 text-cta shrink-0 mt-1" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Tech Stack Breakdown */}
        <section className="space-y-3 pt-6 border-t border-softBg/60">
          <h2 className="text-xs font-bold uppercase tracking-widest text-softText">
            Technologies & Tools Used
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.stacks.map((stack: string, idx: number) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-lg bg-softBg/60 border border-softBg text-softText text-xs font-semibold"
              >
                {stack}
              </span>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
