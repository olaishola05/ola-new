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
            Builder. Educator. Maker.
          </h1>
          <p className="text-base md:text-lg text-softText leading-relaxed">
            Oladipupo grew up curious. The kind of kid who watched a TV repairman work and then fixed the same fault himself the next time it broke. That instinct — to figure things out, to build rather than wait — has never left him.
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
        After two degrees (Mathematics and Statistics, then Computer Networking from the UK) he returned to Africa and hit a wall. He discovered that code was the one skill where you could show your work without anyone&apos;s permission. He started building obsessively — not just to get a job, but to prove what was possible. He co-founded two startups: one killed by overhead costs, one wiped out by a bank launching the same product.
      </p>

      <p className="text-base md:text-lg text-softText leading-relaxed">
        Through all of it — students from Nigeria to Austria, a growing body of work in AI-assisted development, and a freelance practice built on real results — he has kept building. Not because it is easy. Because he cannot help it.
      </p>

      {/* Pullquote */}
      <div className="border-l-4 border-cta pl-6 py-2">
        <p className="text-base md:text-lg text-textColor font-medium leading-relaxed italic">
          &ldquo;Technology, especially AI, has made it possible for anyone with the right knowledge and the right system to build real products, make real money, and create real impact. The gap is no longer talent or tools. It is access to the right guidance.&rdquo;
        </p>
      </div>

      <p className="text-base md:text-lg text-softText leading-relaxed">
        Today, Oladipupo works as a software engineer, product builder, and educator — helping developers and founders use AI to build faster, smarter, and more profitably. His approach is simple: learn the right things, build real things, and create a system that works with or without a team.
      </p>

      {/* Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        {[
          { label: 'Builder', desc: 'Shipped real products across multiple industries and countries.' },
          { label: 'Educator', desc: 'Mentored developers from Nigeria to Austria through hands-on learning.' },
          { label: 'Maker', desc: 'Building AI-assisted workflows, edtech platforms, and systems that scale.' },
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
