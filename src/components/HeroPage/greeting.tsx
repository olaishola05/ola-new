"use client";

import { TypeAnimation } from "react-type-animation";
import { useEffect, useState } from "react";
import { greetings } from "@/app/utils";

export default function HeroTitleAnimation() {
  const [greeting, setGreeting] = useState<string | null>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * greetings.length);
      setGreeting(greetings[randomIndex]);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <h1 className="text-4xl md:text-7xl md:mt-12 lg:text-9xl">
      {greeting || "Hello"}! {}
      {"I'm"} <span className="text-[var(--primary)] font-semibold">Ola</span>,
      <br />
      <TypeAnimation
        cursor={true}
        sequence={[
          "Software Developer",
          500,
          "Frontend Developer",
          500,
          "Backend Developer",
          500,
          "Technical Writer.",
          500,
        ]}
        repeat={Infinity}
        className="text-2xl md:text-5xl lg:text-8xl font-bold"
      />
    </h1>
  );
}
