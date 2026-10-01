import React from 'react';
import { Briefcase, ArrowUpRight } from "lucide-react";

export default function MiniExperienceTimeline() {
  const workExperience = [
    {
      title: "Fullstack Developer",
      company: "Ohiole",
      scope: "Cross-Functional Team",
      period: "2026 – 2026",
      highlight: "Collaborated on delivering a production e-commerce platform migrating business from Instagram DMs to standalone web storefront with multi-currency (USD/NGN). Client won $5,000 business competition grant.",
      stack: ["Next.js 14", "Prisma", "PostgreSQL", "Redis", "Tailwind CSS"],
    },
    {
      title: "Software Developer",
      company: "Techverse Academy",
      scope: "Team of 4",
      period: "2023 – 2025",
      highlight: "Engineered EdTech LMS platform and dynamic course delivery. Built modular NestJS REST APIs, contributed to ERD schema design, and maintained 0% post-release bug rate across first two releases.",
      stack: ["NestJS", "PostgreSQL", "Next.js", "REST APIs", "Git Flow"],
    },
    {
      title: "Full Stack Developer",
      company: "Automated Affairs",
      scope: "Team of 6",
      period: "2022 – 2024",
      highlight: "Co-developed JobHunter — an AI career & resume platform for African professionals. Shipped 20+ RESTful APIs with strict Zod validation and optimized MongoDB queries with Prisma.",
      stack: ["Node.js", "Zod", "MongoDB", "Prisma", "Next.js"],
    },
    {
      title: "Technical Mentor",
      company: "Microverse Inc.",
      scope: "International Mentorship",
      period: "2022",
      highlight: "Mentored international junior developers through rigorous full-stack projects, pair programming, and code reviews, helping mentees achieve top 10% cohort completions.",
      stack: ["Code Reviews", "Pair Programming", "React", "Rails"],
    },
  ];

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex items-center gap-2.5 pb-2 border-b border-softBg/60">
        <Briefcase className="h-5 w-5 text-cta" />
        <h3 className="text-xl sm:text-2xl font-extrabold text-[var(--textColor)] tracking-tight">
          Work Experience
        </h3>
      </div>

      <div className="flex flex-col gap-4">
        {workExperience.map((job, index) => (
          <div
            key={index}
            className="group p-5 rounded-2xl bg-[var(--contactBg)] border border-softBg/60 hover:border-cta/40 hover:shadow-lg hover:shadow-cta/5 transition-all duration-300 flex flex-col justify-between gap-3"
          >
            {/* Header: Title + Period Pill */}
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h4 className="text-base sm:text-lg font-bold text-textColor tracking-tight group-hover:text-cta transition-colors">
                {job.title}
              </h4>
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-softBg/60 text-softText/80 border border-softBg/80 shrink-0">
                {job.period}
              </span>
            </div>

            {/* Company + Scope */}
            <div className="flex items-center gap-2 text-xs font-semibold text-cta">
              <span>{job.company}</span>
              <span className="text-softText/40">·</span>
              <span className="text-softText/80 font-medium">{job.scope}</span>
            </div>

            {/* Key Highlight */}
            <p className="text-xs sm:text-sm text-softText leading-relaxed">
              {job.highlight}
            </p>

            {/* Stack Pills */}
            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-softBg/40">
              {job.stack.map((tech, i) => (
                <span
                  key={i}
                  className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-softBg/40 text-softText/70"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
