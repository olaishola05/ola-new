import React from "react";
import { Metadata } from "next";
import Homepage from "@/components/Home/Homepage";

export const metadata: Metadata = {
  title: {
    absolute: "Oladipupo Ishola — Software Engineer & Product Builder",
  },
  description:
    "Software Engineer & Product Builder. I build and ship web products, APIs, and backend systems for startups and teams — across TypeScript, Python, and AI-assisted engineering.",
  alternates: {
    canonical: "https://olaishola.tech",
  },
};

export default function Home() {
  return (
    <main className="mt-4">
      <Homepage />
    </main>
  );
}
