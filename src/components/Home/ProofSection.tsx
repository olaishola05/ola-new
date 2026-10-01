import React from "react";
import Link from "next/link";
import { Code2, GitFork, Star, CheckCircle2, ArrowRight } from "lucide-react";

export default function ProofSection() {
  const metrics = [
    {
      value: "20+",
      label: "Production APIs Shipped",
      detail: "REST endpoints, auth workflows, and database integrations.",
    },
    {
      value: "1,000+",
      label: "Pair Programming Hours",
      detail: "Collaborative engineering with international teams across 50+ countries.",
    },
    {
      value: "Top 10%",
      label: "Mentee Performance",
      detail: "Assisted software engineering students in accelerated project deliveries.",
    },
    {
      value: "4+",
      label: "Core Web Applications",
      detail: "Shipped EdTech LMS, career tools, banking backend, and product platforms.",
    },
  ];

  const featuredRepos = [
    {
      name: "Banking-services-api",
      desc: "Robust NestJS backend with JWT auth, MongoDB transactions, transfer operations, and Swagger API docs.",
      stack: ["NestJS", "TypeScript", "MongoDB", "Swagger"],
      url: "https://github.com/olaishola05",
    },
    {
      name: "Portfolio & Product Architecture",
      desc: "Full-stack personal platform built with Next.js 14 App Router, Server Components, Prisma, and Tailwind CSS.",
      stack: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma"],
      url: "https://github.com/olaishola05",
    },
  ];

  return (
    <section id="proof" className="w-full max-w-7xl mx-auto my-16 px-6 lg:px-8" data-aos="fade-up">
      {/* Metrics Section */}
      <div className="mb-14">
        <div className="flex flex-col items-center justify-center gap-2 mb-10 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-cta">Documented Impact</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--textColor)] tracking-tight">
            Proof & Track Record
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-softBg/30 border border-softBg/60 backdrop-blur-sm flex flex-col justify-between"
            >
              <div>
                <span className="text-3xl md:text-4xl font-extrabold text-cta tracking-tight block mb-2">
                  {item.value}
                </span>
                <h3 className="text-base font-bold text-[var(--textColor)] mb-1">
                  {item.label}
                </h3>
              </div>
              <p className="text-xs text-softText leading-relaxed mt-2 pt-2 border-t border-softBg/50">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Public Code */}
      <div className="p-8 rounded-3xl bg-softBg/20 border border-softBg/40">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-cta block mb-1">
              Source Code
            </span>
            <h3 className="text-xl font-bold text-[var(--textColor)]">
              Representative Open Repositories
            </h3>
          </div>
          <Link
            href="https://github.com/olaishola05"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-cta hover:gap-2.5 transition-all"
          >
            Visit GitHub Profile <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredRepos.map((repo, idx) => (
            <Link
              key={idx}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-softBg/40 border border-softBg/70 hover:border-cta/40 hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-cta" />
                    <span className="text-sm font-bold text-[var(--textColor)] group-hover:text-cta transition-colors">
                      {repo.name}
                    </span>
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-cta">Public</span>
                </div>
                <p className="text-xs text-softText leading-relaxed mb-4">
                  {repo.desc}
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {repo.stack.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-md bg-softBg/80 text-[10px] font-medium text-softText"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
