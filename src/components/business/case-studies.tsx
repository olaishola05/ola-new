"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

const caseStudies = [
  {
    title: "AI-Powered Analytics Dashboard",
    problem:
      "Fintech startup needed real-time analytics dashboard to process millions of transactions with sub-second latency",
    solution:
      "Built scalable microservices architecture with React dashboard, Node.js backend, and Redis caching",
    outcome:
      "Reduced query time by 85%, handled 10M+ daily transactions, and improved user retention by 40%",
    stack: ["React", "Node.js", "PostgreSQL", "Redis", "Docker"],
    metric: "85% faster queries",
  },
  {
    title: "EdTech Learning Platform",
    problem:
      "Education company struggled with slow course delivery and poor mobile experience affecting student engagement",
    solution:
      "Redesigned frontend with Next.js, optimized API endpoints, and implemented progressive web app features",
    outcome:
      "Achieved 95+ Lighthouse score, 3x faster load times, and 60% increase in mobile engagement",
    stack: ["Next.js", "TypeScript", "Tailwind", "PWA", "Vercel"],
    metric: "3x faster performance",
  },
  {
    title: "SaaS Productivity Platform",
    problem:
      "Startup needed MVP built in 6 weeks to secure Series A funding with limited technical resources",
    solution:
      "Delivered full-stack SaaS platform with authentication, payment integration, and admin dashboard",
    outcome: "Launched on time, secured $2M Series A, and onboarded 500+ users in first month",
    stack: ["Next.js", "NestJS", "Stripe", "PostgreSQL", "AWS"],
    metric: "6 weeks to Series A",
  },
];

export default function CaseStudies() {
  return (
    <section id="projects" className="py-20 px-4 md:px-6" style={{ scrollMarginTop: "80px" }}>
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Featured Projects</h2>
          <p className="text-lg text-[var(--softTextColor)] max-w-3xl mx-auto">
            Real solutions that delivered measurable business impact
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto animate-stagger">
          {caseStudies.map((study, idx) => (
            <Card
              key={idx}
              className="border hover:border-[var(--primary)] transition-all hover:shadow-xl bg-[var(--bg)] flex flex-col"
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-3">
                  <Badge className="bg-[var(--primary)] text-white">{study.metric}</Badge>
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                </div>
                <CardTitle className="text-2xl mb-4">{study.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow space-y-4">
                <div>
                  <h4 className="font-semibold text-sm text-[var(--primary)] mb-2">PROBLEM</h4>
                  <p className="text-sm text-[var(--softTextColor)]">{study.problem}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-[var(--primary)] mb-2">SOLUTION</h4>
                  <p className="text-sm text-[var(--softTextColor)]">{study.solution}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-[var(--primary)] mb-2">OUTCOME</h4>
                  <p className="text-sm text-[var(--softTextColor)]">{study.outcome}</p>
                </div>
                <div className="pt-4 border-t border-[var(--border)]">
                  <h4 className="font-semibold text-xs text-[var(--textColor)] mb-3">TECH STACK</h4>
                  <div className="flex flex-wrap gap-2">
                    {study.stack.map((tech, techIdx) => (
                      <Badge
                        key={techIdx}
                        variant="outline"
                        className="text-xs border-[var(--primary)]/30"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
