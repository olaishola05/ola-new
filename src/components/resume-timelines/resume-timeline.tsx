import React from 'react';
import { ChevronRight, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import MiniExperienceTimeline from './mini-experience';
import MiniEducationTimeline from './mini-education';

export default function ResumeTimeline() {
  return (
    <section
      id="resume-timeline"
      className="py-12 md:py-20 mb-10 max-w-5xl mx-auto px-4 sm:px-6"
      data-aos="fade-up"
      data-aos-duration="2000"
    >
      <div className="flex flex-col items-center justify-center gap-2 mb-10 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-cta">
          Career & Academics
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--textColor)] tracking-tight">
          Experience & Education
        </h2>
        <p className="text-softText text-base max-w-xl mt-1">
          A track record spanning commercial full-stack production, startup engineering, and postgraduate AI research.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 py-6 items-start">
        <MiniExperienceTimeline />
        <MiniEducationTimeline />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-6 mt-8 pt-6 border-t border-softBg/50 text-sm">
        <Link
          href="/about#resume"
          className="inline-flex items-center gap-1.5 font-bold text-cta hover:gap-2.5 transition-all"
        >
          View Full Resume & Credentials <ChevronRight className="h-4 w-4" />
        </Link>
        <span className="text-softText/30 hidden sm:inline">·</span>
        <Link
          href="#contact"
          className="inline-flex items-center gap-1.5 font-semibold text-softText hover:text-textColor transition-colors"
        >
          Get in Touch <ArrowUpRight className="h-4 w-4 text-cta" />
        </Link>
      </div>
    </section>
  );
}
