import React from 'react'
import Image from 'next/image'

/**
 * Brand-anchored origin narrative for the About page.
 * Static — based on brand foundation document. No database dependency.
 */
export default function AboutStory() {
  return (
    <section className="w-full px-5 md:px-10 py-10 flex flex-col gap-8" data-aos="fade-up">
      {/* Top: Photo + Intro */}
      <div className="flex flex-col-reverse md:flex-row items-start gap-10 md:gap-16">
        {/* Text */}
        <div className="flex flex-col gap-4 flex-1">
          <span className="text-xs font-black tracking-[0.2em] uppercase text-cta">
            The Person Behind The Code
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-[var(--textColor)] tracking-tight leading-tight">
            Software Engineer & Product Builder
          </h1>
          <p className="text-base md:text-lg text-softText leading-relaxed">
            I’m a software engineer and product builder with experience building full-stack applications, backend systems, and digital products for startups and teams.
          </p>
        </div>

        {/* Photo */}
        <div className="w-40 h-40 md:w-56 md:h-56 shrink-0 rounded-2xl overflow-hidden shadow-xl border-2 border-cta/10 self-center md:self-start">
          <Image
            src="https://avatars.githubusercontent.com/u/45001916?v=4"
            alt="Oladipupo Ishola"
            width={224}
            height={224}
            priority
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>

      {/* Story paragraphs */}
      <p className="text-base md:text-lg text-softText leading-relaxed">
        I’m currently pursuing an MSc in Artificial Intelligence and Adaptive Systems at the University of Sussex, where I’m deepening my understanding of machine learning, intelligent systems, and adaptive behavior. My work sits at the intersection of software engineering, product development, and AI — building practical systems while exploring how intelligent technologies can make products more capable, useful, and scalable.
      </p>

      <p className="text-base md:text-lg text-softText leading-relaxed">
        I grew up curious — the kind of kid who watched a technician work and then repaired the device when it broke. Over the years, that instinct has driven my work across startups, edtech platforms, and contract engineering. Code has always been the medium where proof matters more than credentials: you build it, deploy it, and let the software speak for itself.
      </p>

      {/* Pullquote */}
      <div className="border-l-4 border-cta pl-6 py-2">
        <p className="text-base md:text-lg text-textColor font-medium leading-relaxed italic">
          &ldquo;Software engineering is about turning ambiguity into working, dependable systems. With AI-assisted engineering and disciplined foundations, small teams and founders can ship software that competes with much larger organizations.&rdquo;
        </p>
      </div>

      <p className="text-base md:text-lg text-softText leading-relaxed">
        Today, I partner with founders, teams, and clients across freelance projects, contract engineering, and product collaborations — focusing on reliable architecture, clean codebases, and measurable outcomes.
      </p>

      {/* Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        {[
          { label: 'Product Engineer', desc: 'Shipping performant full-stack applications with modern web technologies, clean architecture, and great UX standards.' },
          { label: 'Backend Architect', desc: 'Designing secure, scalable REST APIs, modular NestJS services, and resilient data models.' },
          { label: 'AI Specialization', desc: 'Deepening adaptive systems and machine learning workflows through MSc research at Sussex.' },
        ].map(({ label, desc }) => (
          <div key={label} className="p-4 rounded-xl bg-softBg/40 border border-softBg flex flex-col gap-2">
            <span className="text-xs font-black tracking-widest uppercase text-cta">{label}</span>
            <p className="text-sm text-softText leading-snug">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
