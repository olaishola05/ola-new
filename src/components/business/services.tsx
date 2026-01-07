"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database, Layout, Code2, Cloud, Globe, FileText } from "lucide-react";

const services = [
  {
    icon: Database,
    title: "Backend Engineering",
    desc: "Robust APIs and backend systems built with Node.js, Python, NestJS, and Django. Complete with CI / CD pipelines and Docker containerization.",
    tags: ["Node.js", "Python", "NestJS", "Django", "REST APIs", "GraphQL"],
  },
  {
    icon: Layout,
    title: "Frontend Development",
    desc: "Modern, responsive user interfaces using React, Next.js, and Tailwind CSS that provide exceptional user experiences.",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    icon: Code2,
    title: "Full-Stack Web Apps",
    desc: "End-to-end application development for SaaS platforms, dashboards, and MVPs with scalable architecture.",
    tags: ["SaaS", "Dashboards", "MVPs", "Admin Panels"],
  },
  {
    icon: Cloud,
    title: "DevOps & Automation",
    desc: "Streamlined deployment pipelines, CI/CD automation, and infrastructure as code for reliable, scalable systems.",
    tags: ["Docker", "CI/CD", "AWS", "Deployment Automation"],
  },
  {
    icon: Globe,
    title: "API Integration",
    desc: "Seamless third-party API integrations, webhook implementations, and custom API development.",
    tags: ["REST APIs", "Webhooks", "OAuth", "Payment Gateways"],
  },
  {
    icon: FileText,
    title: "Technical Writing",
    desc: "Clear, comprehensive documentation for your codebase, APIs, and internal processes.",
    tags: ["API Docs", "Code Documentation", "Technical Guides"],
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="pt-20 md:pt-60 pb-20 px-4 md:px-6"
      style={{ scrollMarginTop: "80px" }}
    >
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Services</h2>
          <p className="text-lg text-[var(--softTextColor)] max-w-3xl mx-auto">
            Full-stack solutions from backend to frontend, delivered with precision
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto animate-stagger">
          {services.map((service, idx) => (
            <Card
              key={idx}
              className="bg-[var(--bg)] border hover:border-[var(--primary)] transition-all hover:shadow-xl group"
            >
              <CardHeader>
                <div className="h-14 w-14 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center mb-4 group-hover:bg-[var(--primary)]/20 transition-colors">
                  <service.icon className="h-7 w-7 text-[var(--primary)]" />
                </div>
                <CardTitle className="text-2xl mb-3">{service.title}</CardTitle>
                <CardDescription className="text-base text-[var(--softTextColor)] leading-relaxed">
                  {service.desc}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag, tagIdx) => (
                    <Badge
                      key={tagIdx}
                      variant="outline"
                      className="text-xs border-[var(--primary)]/30 text-[var(--softTextColor)]"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
