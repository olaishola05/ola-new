'use client';

import React from 'react';
import Link from 'next/link';
import { Download, FileText, ArrowUpRight } from 'lucide-react';
import { EditAboutForm } from '@/components';
import AboutStory from './AboutStory';
import MiniExperienceTimeline from '@/components/resume-timelines/mini-experience';
import MiniEducationTimeline from '@/components/resume-timelines/mini-education';
import Certification from './Certification';
import { useSession } from 'next-auth/react';
import { About } from '@/app/types';

interface AboutPageProps {
  data: any;
}

const RESUME_PDF_URL =
  'https://docs.google.com/document/d/1LBdENWcDAmdAgUdT1SfbAV5SiJ8VtM54NNn6LdIbowE/export?format=pdf';
const RESUME_DOCS_URL =
  'https://docs.google.com/document/d/1LBdENWcDAmdAgUdT1SfbAV5SiJ8VtM54NNn6LdIbowE/preview';

const AboutPage = ({ data }: AboutPageProps) => {
  const { data: session }: any = useSession();
  const [isEditable, setIsEditable] = React.useState(false);
  const aboutData: About = data;

  const toggleEditable = () => {
    setIsEditable(!isEditable);
  };

  const userLoggedIn = session?.user?.email && session?.user?.role === 'admin';

  return (
    <main
      data-aos="fade-up"
      data-aos-duration="3000"
      className="w-full flex flex-col pt-10 md:pt-16 pb-20"
    >
      {isEditable && userLoggedIn ? (
        <EditAboutForm about={data} toggleEdit={toggleEditable} />
      ) : (
        <>
          {/* Brand origin narrative with inline photo — no DB dependency */}
          <div className="w-[95%] md:w-[92%] max-w-5xl mx-auto">
            <AboutStory />
          </div>

          {userLoggedIn && (
            <div className="btn-container flex justify-center items-center my-6 mx-auto w-1/2">
              <button
                type="button"
                className="editBtn px-6 py-2 bg-[var(--cta)] text-[var(--ctaText)] border-none cursor-pointer rounded-md transition-all duration-300 ease-in-out text-sm font-bold uppercase tracking-wider"
                onClick={toggleEditable}
              >
                Edit
              </button>
            </div>
          )}
        </>
      )}

      {/* Qualifications & Career Section (Replaces clunky zigzag ResumeTabs) */}
      <section id="resume" className="w-[95%] md:w-[92%] max-w-5xl mx-auto mt-16 md:mt-24">
        {/* Section Header with Resume Download CTA */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 mb-10 border-b border-softBg/60">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-cta">
              Qualifications & Trajectory
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--textColor)] tracking-tight mt-1">
              Career & Academics
            </h2>
          </div>

          {/* Quick PDF Action */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={RESUME_PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cta text-ctaText font-bold text-xs uppercase tracking-wider hover:scale-105 active:scale-95 transition-all shadow-lg shadow-cta/20"
            >
              <Download className="w-3.5 h-3.5" /> Download Resume (PDF)
            </a>
            <a
              href={RESUME_DOCS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-softBg/60 border border-softBg hover:border-cta/40 text-textColor font-bold text-xs uppercase tracking-wider hover:scale-105 active:scale-95 transition-all"
            >
              <FileText className="w-3.5 h-3.5 text-cta" /> View Online
            </a>
          </div>
        </div>

        {/* 2-Column Experience & Education Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">
          <MiniExperienceTimeline />
          <MiniEducationTimeline />
        </div>

        {/* Verified Certifications */}
        <div className="mt-8">
          <Certification />
        </div>
      </section>
    </main>
  );
};

export default AboutPage;