"use client";

import { TypeAnimation } from "react-type-animation";
import { useEffect, useState } from "react";
import { greetings } from "@/app/utils";

export default function HeroTitleAnimation() {
  const [greeting, setGreeting] = useState<string | null>(null);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * greetings.length);
    setGreeting(greetings[randomIndex]);

    const intervalId = setInterval(() => {
      const nextIndex = Math.floor(Math.random() * greetings.length);
      setGreeting(greetings[nextIndex]);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <h1 className="text-4xl md:text-7xl md:mt-12 flex flex-col gap-1">
      <span className="block">
        {greeting || "Hello"}!
      </span>
      <span className="block">
        {"I'm"}{" "}
        <span className="text-[var(--primary)] font-semibold">Oladipupo</span>,
      </span>
      <TypeAnimation
        cursor={true}
        sequence={[
          "Software Engineer.",
          500,
          "Product Builder.",
          500,
          "AI Educator.",
          500,
          "Technical Writer.",
          500,
        ]}
        repeat={Infinity}
        className="text-2xl md:text-5xl font-bold block"
      />
    </h1>
  );
}
