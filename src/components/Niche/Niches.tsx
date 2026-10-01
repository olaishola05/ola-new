import React from "react";
import Link from "next/link";
import { Layers, Server, Sparkles, ArrowRight, BookOpen, Users, GraduationCap } from "lucide-react";

export default function Niches() {
  const capabilities = [
    {
      icon: Layers,
      tag: "Full-Stack Development",
      title: "Product Engineering",
      description:
        "Build and ship full-stack web applications, end-to-end features, and internal tools. Focused on responsive frontends, state architecture, and maintainable, scalable foundations that grow with your team.",
      deliverables: ["Next.js & React Apps", "Design Systems & UI", "Performance & CWV", "State Architecture"],
    },
    {
      icon: Server,
      tag: "Robust Architecture",
      title: "Backend & API Engineering",
      description:
        "Design scalable REST APIs, secure authentication workflows, database schemas, and background jobs. Clean modular services with NestJS/Node.js, Python (FastAPI/Django), PostgreSQL, MongoDB, and thorough documentation.",
      deliverables: ["Modular NestJS / Node APIs", "Auth & RBAC Workflows", "Database Modeling", "API Docs & Swagger"],
    },
    {
      icon: Sparkles,
      tag: "From Zero to Shipped",
      title: "Engineering Partner for Founders",
      description:
        "Help turn early product ideas and MVPs into solid, working systems through focused contract or product collaboration. Pragmatic technical decisions, rapid execution, and production-ready code.",
      deliverables: ["MVP Scoping & Build", "Technical Architecture", "AI-assisted Workflows", "Production Deployment"],
    },
  ];

  return (
    <section
      id="what-i-do"
      className="py-16 md:py-24 my-10"
      data-aos="fade-up"
    >
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center gap-3 mb-16 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-cta">Core Capabilities</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--textColor)] tracking-tight">
            What I Do
          </h2>
          <p className="text-softText text-base md:text-lg max-w-2xl mt-2">
            Engineering real, scalable products with disciplined architecture and AI-assisted velocity.
          </p>
        </div>

        {/* 3 Core Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {capabilities.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <div
                key={idx}
                className="relative flex flex-col justify-between p-8 rounded-3xl bg-softBg/30 border border-softBg/60 backdrop-blur-sm hover:border-cta/30 hover:shadow-xl hover:shadow-cta/5 transition-all duration-300 group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-cta/10 text-cta flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-cta">
                    {cap.tag}
                  </span>
                  <h3 className="text-2xl font-bold text-[var(--textColor)] mt-2 mb-4 tracking-tight">
                    {cap.title}
                  </h3>
                  <p className="text-softText text-sm md:text-base leading-relaxed mb-6">
                    {cap.description}
                  </p>
                </div>

                <div>
                  <div className="pt-4 border-t border-softBg/60 mb-6">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-softText/70 block mb-2">
                      Key Highlights
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {cap.deliverables.map((item, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-lg bg-softBg/50 text-xs font-medium text-softText"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    href="#contact"
                    className="inline-flex items-center gap-1.5 text-cta font-semibold text-sm group-hover:gap-2.5 transition-all"
                  >
                    Discuss a project <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Supporting Proof Bar */}
        <div className="mt-12 p-6 rounded-2xl bg-softBg/20 border border-softBg/40 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-cta whitespace-nowrap">
              Supporting Proof
            </span>
            <span className="hidden md:inline text-softText/40">|</span>
            <p className="text-xs md:text-sm text-softText">
              Writing & education support my engineering identity rather than competing as separate careers.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-softText">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-softBg/60 border border-softBg">
              <BookOpen className="w-3.5 h-3.5 text-cta" /> Technical Writing
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-softBg/60 border border-softBg">
              <Users className="w-3.5 h-3.5 text-cta" /> Mentoring
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-softBg/60 border border-softBg">
              <GraduationCap className="w-3.5 h-3.5 text-cta" /> Teaching
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
