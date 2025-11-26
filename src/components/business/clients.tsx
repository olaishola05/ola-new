"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Rocket, Users, Layout, Globe, Terminal } from "lucide-react";

const clients = [
  {
    icon: Rocket,
    title: "SaaS Founders",
    desc: "Building subscription-based platforms that need to scale from day one",
  },
  {
    icon: Zap,
    title: "AI Tool Creators",
    desc: "Developing intelligent applications with modern AI integrations",
  },
  {
    icon: Users,
    title: "Productivity Product Teams",
    desc: "Creating tools that help teamwork smarter and faster",
  },
  {
    icon: Layout,
    title: "Dashboard Builders",
    desc: "Building data-driven dashboards and analytics platforms",
  },
  {
    icon: Globe,
    title: "Edtech & Fintech Startups",
    desc: "Launching secure, compliant platforms in regulated industries",
  },
  {
    icon: Terminal,
    title: "Internal Tool Developers",
    desc: "Streamlining operations withcustom business applications",
  },
];

export default function IdealClientsProfile() {
  return (
    <section className="md:px-6">
      <div className="pb-5 mx-auto max-w-7xl rounded-sm">
        <div className="text-center mb-16 animate-fade-in p-5">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Who I Partner With</h2>
          <p className="text-lg text-[var(--softTextColor)] max-w-3xl mx-auto">
            I work best with founders and technical PMs who value speed, scalability, and strategic
            execution
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto animate-stagger px-4 md:px-0">
          {clients.map((item, idx) => (
            <Card
              key={idx}
              className="border hover:border-[var(--primary)] transition-all hover:shadow-lg bg-[var(--bg)]"
            >
              <CardHeader>
                <item.icon className="h-10 w-10 mb-4 text-[var(--primary)]" />
                <CardTitle className="text-xl">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[var(--softTextColor)]">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
