import React from "react";
import Link from "next/link";
import { Briefcase, Code2, Users2, Globe, ArrowRight } from "lucide-react";

export default function EngagementModes() {
  const modes = [
    {
      icon: Briefcase,
      title: "Freelance Projects",
      badge: "Targeted Builds",
      description:
        "Full-cycle development for specific initiatives, MVPs, feature rollouts, or design-system implementations with clear scopes and milestones.",
    },
    {
      icon: Code2,
      title: "Contract Engineering",
      badge: "Embedded Talent",
      description:
        "Join your engineering team on a fixed contract to accelerate sprints, tackle complex backend architectures, or ship high-priority product roadmaps.",
    },
    {
      icon: Users2,
      title: "Product Collaboration",
      badge: "Founders & Co-builders",
      description:
        "Partner with visionary founders to translate concepts into validated, scalable software systems, making pragmatic technical decisions early.",
    },
    {
      icon: Globe,
      title: "Select Remote Roles",
      badge: "Full-Time Opportunities",
      description:
        "Open to select senior full-stack and backend roles with mission-driven remote teams working on ambitious products.",
    },
  ];

  return (
    <section
      id="engagement-modes"
      className="py-16 md:py-20 my-10"
      data-aos="fade-up"
    >
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-3 mb-12 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-cta">Collaboration</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--textColor)] tracking-tight">
            How We Can Work Together
          </h2>
          <p className="text-softText text-base md:text-lg max-w-2xl">
            Flexible engagement models tailored to the needs of startups, founders, and established teams.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {modes.map((mode, idx) => {
            const Icon = mode.icon;
            return (
              <div
                key={idx}
                className="flex flex-col justify-between p-6 rounded-2xl bg-softBg/30 border border-softBg/60 hover:border-cta/30 hover:shadow-lg transition-all duration-300"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-cta/10 text-cta flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-cta block mb-1">
                    {mode.badge}
                  </span>
                  <h3 className="text-xl font-bold text-[var(--textColor)] mb-2">
                    {mode.title}
                  </h3>
                  <p className="text-softText text-xs md:text-sm leading-relaxed mb-6">
                    {mode.description}
                  </p>
                </div>

                <Link
                  href="#contact"
                  className="inline-flex items-center gap-1 text-cta font-semibold text-xs hover:gap-2 transition-all mt-auto"
                >
                  Inquire now <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
