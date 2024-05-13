import React from "react";
import { Metadata } from "next";
import Homepage from "@/components/Home/Homepage";

export const metadata: Metadata = {
  title: "Oladipupo Ishola | Software Developer",
  description:
    "I am a fullstack developer, I build web applications with React, Nextjs, Nodejs, Expressjs, MongoDB, PostgreSQL, and other technologies.",
};

export default function Home() {
  return (
    <main className="mt-4">
      <Homepage />
    </main>
  );
}

