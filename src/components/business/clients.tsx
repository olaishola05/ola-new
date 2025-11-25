"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { clients } from "./business-utils";

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
