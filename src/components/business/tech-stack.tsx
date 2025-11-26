"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

const stacks = [
  {
    category: "Frontend",
    tools: ["React", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
  },
  {
    category: "Backend",
    tools: ["Node.js", "NestJS", "Python", "Django", "Express.js", "FastAPI"],
  },
  {
    category: "Database",
    tools: ["PostgreSQL", "MongoDB", "Redis", "Prisma", "TypeORM"],
  },
  {
    category: "DevOps",
    tools: [
      "Docker",
      "AWS",
      "CI/CD",
      "GitHub Actions",
      "Vercel",
      "DigitalOcean",
      "Netlify",
      "Render",
    ],
  },
];

export default function TechStack() {
  return (
    <section className="py-20 px-4 md:px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Tech Stack & Tools</h2>
          <p className="text-lg text-[var(--softTextColor)] max-w-3xl mx-auto">
            Modern technologies I use to build scalable, production-ready applications
          </p>
        </div>
        <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto animate-stagger">
          {stacks.map((stack, idx) => (
            <Card
              key={idx}
              className="bg-[var(--bg)] border hover:border-[var(--primary)] transition-all"
            >
              <CardHeader>
                <CardTitle className="text-xl text-[var(--primary)]">{stack.category}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 md:space-y-3 grid grid-cols-2 md:block">
                  {stack.tools.map((tool, toolIdx) => (
                    <li key={toolIdx} className="flex items-center space-x-2">
                      <CheckCircle2 className="h-4 w-4 text-[var(--primary)] flex-shrink-0" />
                      <span className="text-sm md:text-base">{tool}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
