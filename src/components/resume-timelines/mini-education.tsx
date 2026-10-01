import React from 'react';
import { GraduationCap } from 'lucide-react';

export default function MiniEducationTimeline() {
  const education = [
    {
      degree: "MSc in Artificial Intelligence and Adaptive Systems",
      institution: "University of Sussex",
      type: "Postgraduate Degree",
      period: "2026 – Present",
      highlight: "Specialization in machine learning, computational adaptive behavior, neural modeling, and algorithmic foundations.",
      badge: "In Progress",
    },
    {
      degree: "ProDev (Advanced) Backend Engineering Program",
      institution: "ALX Africa",
      type: "Specialized Backend Training",
      period: "2025",
      highlight: "Advanced Python, SQL, scalable system architecture, and distributed systems. Built and deployed production services using Django, DRF, Docker, and Kubernetes.",
      badge: "Python & DRF",
    },
    {
      degree: "Accelerated Software Engineering Program",
      institution: "Microverse Inc.",
      type: "Full-Stack Development",
      period: "2021 – 2022",
      highlight: "1,300+ hours of full-stack engineering, data structures, algorithms, and distributed git-flow collaboration with international peers.",
      badge: "Full-Stack",
    },
    {
      degree: "Master's in Computer Networking",
      institution: "University of Bedfordshire",
      type: "Postgraduate Degree",
      period: "2013 – 2015",
      highlight: "Master's Thesis evaluating security architectures and threat models for open-source cloud computing platforms (OpenStack & Eucalyptus).",
      badge: "MSc",
    },
    {
      degree: "Bachelor's in Computer Networking",
      institution: "University of Bedfordshire",
      type: "Undergraduate Degree",
      period: "2010 – 2013",
      highlight: "Bachelor's Thesis analyzing virtualization performance benchmarks and resource optimization across distributed environments.",
      badge: "BSc (Hons)",
    },
  ];

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex items-center gap-2.5 pb-2 border-b border-softBg/60">
        <GraduationCap className="h-5 w-5 text-cta" />
        <h3 className="text-xl sm:text-2xl font-extrabold text-[var(--textColor)] tracking-tight">
          Education & Training
        </h3>
      </div>

      <div className="flex flex-col gap-4">
        {education.map((edu, index) => (
          <div
            key={index}
            className="group p-5 rounded-2xl bg-[var(--contactBg)] border border-softBg/60 hover:border-cta/40 hover:shadow-lg hover:shadow-cta/5 transition-all duration-300 flex flex-col justify-between gap-3"
          >
            {/* Header: Degree + Period Pill */}
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h4 className="text-base sm:text-lg font-bold text-textColor tracking-tight group-hover:text-cta transition-colors">
                {edu.degree}
              </h4>
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-softBg/60 text-softText/80 border border-softBg/80 shrink-0">
                {edu.period}
              </span>
            </div>

            {/* Institution + Type */}
            <div className="flex items-center gap-2 text-xs font-semibold text-cta">
              <span>{edu.institution}</span>
              <span className="text-softText/40">·</span>
              <span className="text-softText/80 font-medium">{edu.type}</span>
            </div>

            {/* Research / Training Focus */}
            <p className="text-xs sm:text-sm text-softText leading-relaxed">
              {edu.highlight}
            </p>

            {/* Academic Credential Badge */}
            <div className="flex items-center gap-2 pt-2 border-t border-softBg/40">
              <span className="text-[10px] font-bold uppercase tracking-wider text-cta/80 px-2 py-0.5 rounded-md bg-cta/10 border border-cta/20">
                {edu.badge}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
