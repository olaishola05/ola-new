import React from 'react';
import Link from 'next/link';
import { Award, ArrowUpRight, CheckCircle2 } from 'lucide-react';

const certifications = [
  {
    title: 'ProDev (Advanced) Backend Engineering Program (Python, Django, DRF, Docker, K8s)',
    issuer: 'ALX Africa',
    url: 'https://alxafrica.com',
    date: 'Certified',
  },
  {
    title: 'Google Africa Developer Training Program on Google Cloud Platform',
    issuer: 'Google Developers & Andela',
    url: 'https://adscerts.com/scholar/8FE477CD48800ECF',
    date: 'Certified',
  },
  {
    title: 'Remote Full Stack Web Development Program',
    issuer: 'Microverse Inc. (1,300+ hrs of Full-Stack & Systems)',
    url: 'https://www.credential.net/535b9041-ea31-4b61-aa42-960bebc001f6#gs.wdx1dk',
    date: 'Verified',
  },
];

export default function Certification() {
  return (
    <section className="w-full max-w-5xl mx-auto my-12 px-4 sm:px-6" data-aos="fade-up">
      <div className="flex items-center gap-2.5 pb-3 mb-6 border-b border-softBg/60">
        <Award className="h-5 w-5 text-cta" />
        <h3 className="text-xl sm:text-2xl font-extrabold text-[var(--textColor)] tracking-tight">
          Verified Certifications & Technical Training
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {certifications.map((cert, idx) => (
          <Link
            key={idx}
            href={cert.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-5 rounded-2xl bg-[var(--contactBg)] border border-softBg/60 hover:border-cta/40 hover:shadow-lg hover:shadow-cta/5 transition-all duration-300 flex items-start justify-between gap-4"
          >
            <div className="space-y-1.5 flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-cta px-2 py-0.5 rounded-full bg-cta/10 border border-cta/20">
                  {cert.date}
                </span>
                <span className="text-xs text-softText/80 font-medium">{cert.issuer}</span>
              </div>
              <h4 className="text-sm sm:text-base font-bold text-textColor tracking-tight group-hover:text-cta transition-colors">
                {cert.title}
              </h4>
            </div>

            <ArrowUpRight className="w-4 h-4 text-softText/40 group-hover:text-cta group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-1" />
          </Link>
        ))}
      </div>
    </section>
  );
}