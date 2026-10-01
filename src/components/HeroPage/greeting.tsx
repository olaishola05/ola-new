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
    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl md:mt-12 flex flex-col gap-2 tracking-tight">
      <span className="text-xl md:text-2xl font-medium text-cta">
        {greeting || "Hello"}!
      </span>
      <span className="block font-extrabold text-[var(--textColor)]">
        {"I'm"}{" "}
        <span className="text-[var(--primary)] font-semibold">Oladipupo</span> —
      </span>
      <span className="text-2xl sm:text-3xl md:text-5xl font-bold text-softText block">
        Software Engineer & Product Builder.
      </span>
    </h1>
  );
}
