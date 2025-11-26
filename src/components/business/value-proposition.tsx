"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

const solutions = [
  { icon: CheckCircle2, text: "Technical roadmaps that align with business goals" },
  { icon: CheckCircle2, text: "Architecture designed for scale from the start" },
  {
    icon: CheckCircle2,
    text: "Clean, maintainable code with comprehensive documentation",
  },
  { icon: CheckCircle2, text: "Seamless API integrations and reliable backends" },
  { icon: CheckCircle2, text: "DevOps automation for faster, safer deployments" },
  { icon: CheckCircle2, text: "Responsive, intuitive frontends users love" },
];

export default function ValueProposition() {
  return (
    <section className="px-4 md:px-6">
      <div className="">
        <div className="grid md:grid-cols-2 gap-14 items-center max-w-7xl mx-auto">
          <div>
            <Badge className="mb-6 bg-[var(--primary)]/10 text-[var(--primary)] border-[var(--primary)]/20">
              My Unique Approach
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              From Complex Ideas to Simple, Scalable Solutions
            </h2>
            <p className="text-lg text-[var(--softTextColor)] mb-6 leading-relaxed">
              I help founders and small businesses turn ideas into scalable, production-ready web
              applications — combining solid backend engineering with intuitive, responsive
              frontends. From MVP development to DevOps automation, I deliver end-to-end solutions
              that grow with your business.
            </p>
            <p className="text-lg text-[var(--softTextColor)] leading-relaxed">
              My mission: turning complex ideas into simple, scalable, and impactful digital
              products that drive real business value.
            </p>
          </div>
          <div className="space-y-4">
            {solutions.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start space-x-3 p-4 rounded-lg bg-[var(--softBg)] hover:bg-[var(--primary)]/5 transition-colors"
              >
                <item.icon className="h-6 w-6 text-[var(--primary)] flex-shrink-0 mt-0.5" />
                <p className="text-base">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
