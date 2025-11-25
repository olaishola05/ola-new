"use client";

import React from "react";
import { ChevronRight } from "lucide-react";
import { workflow } from "./business-utils";

export default function Workflow() {
  return (
    <section id="process" className="py-20 px-4 md:px-6" style={{ scrollMarginTop: "80px" }}>
      <div className="containers mx-auto max-w-7xl">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">My Workflow & Communication</h2>
          <p className="text-lg text-[var(--softTextColor)] max-w-3xl mx-auto">
            Transparent, collaborative process that keeps you in the loop
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {workflow.map((phase, idx) => (
            <div key={idx} className="relative">
              <div className="text-6xl font-bold text-[var(--primary)]/10 mb-4">{phase.step}</div>
              <h3 className="text-xl font-bold mb-3">{phase.title}</h3>
              <p className="text-[var(--softTextColor)]">{phase.desc}</p>
              {idx < 2 && (
                <div className="hidden lg:block absolute top-12 -right-3 text-[var(--primary)]/30">
                  <ChevronRight className="h-6 w-6" />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-16 p-8 bg-gradient-to-br from-[var(--primary)]/5 to-[var(--primary)]/10">
          <h3 className="text-2xl font-bold mb-4 text-center">Communication Principles</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {[
              {
                title: "Daily Updates",
                desc: "Regular Slack/email updates on progress, blockers, and next steps",
              },
              {
                title: "Code Transparency",
                desc: "All code in GitHub with detailed commit messages and PR descriptions",
              },
              {
                title: "Bi-weekly Demos",
                desc: "Live demos every 2 weeks to review features and gather feedback",
              },
            ].map((principle, idx) => (
              <div key={idx} className="text-center">
                <h4 className="font-semibold text-lg mb-2">{principle.title}</h4>
                <p className="text-sm text-[var(--softTextColor)]">{principle.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
