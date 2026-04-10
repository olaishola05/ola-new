'use client';

import React from "react";
import Link from "next/link";
import Companies from "./Companies";
import HeroTitleAnimation from "./greeting";
import Image from "next/image";
import HeroSocialIcons from "./hero-social";
import ResumeModal from "../Modal/resume-modal";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <div className="relative isolate overflow-hidden">
      {/* Mesh Background */}
      <div className="absolute inset-0 -z-10 bg-[var(--bg)]">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cta/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cta/10 blur-[120px]" />
      </div>

      <main
        className="flex flex-col-reverse lg:flex-row items-center justify-between p-6 md:p-12 lg:p-24 min-h-[80vh] gap-16"
        data-aos="fade-up"
        data-aos-duration="1500"
      >
        <div className="w-full lg:flex-1 space-y-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cta/5 border border-cta/10 text-cta text-xs font-bold tracking-widest uppercase"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cta opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cta"></span>
            </span>
            Available for new projects
          </motion.div>

          <HeroTitleAnimation />

          <p
            className="text-lg md:text-xl text-softText leading-relaxed max-w-2xl"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            I help developers and founders{" "}
            <span className="text-textColor font-bold">build real products faster</span>{" "}
            using AI, engineering principles, and systems that scale. Builder first. Educator always.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/#my-works"
              className="px-8 py-4 bg-cta text-ctaText font-bold rounded-2xl shadow-2xl shadow-cta/20 hover:scale-105 active:scale-95 transition-all text-sm tracking-wide"
            >
              See What I&apos;ve Built
            </Link>
            <ResumeModal />
          </div>

          <div className="pt-4 border-t border-softBg/50 flex flex-col gap-4">
            <span className="text-[10px] font-black tracking-[0.2em] uppercase text-softText/60">Connect & Socials</span>
            <HeroSocialIcons />
          </div>
        </div>

        <div className="relative w-full lg:flex-1 max-w-lg mx-auto">
          <motion.div
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative z-10 w-full aspect-square rounded-[2rem] bg-cta/10 overflow-hidden shadow-2xl rotate-3"
          >
            <Image
              src="https://avatars.githubusercontent.com/u/45001916?v=4"
              alt="Oladipupo Ishola"
              fill
              priority
              className="object-cover -rotate-3 scale-110 grayscale-[30%] hover:grayscale-0 transition-all duration-700"
            />
          </motion.div>
          {/* Decorative Ring */}
          <div className="absolute -inset-4 border border-cta/10 rounded-[2.5rem] -rotate-6 -z-10" />
        </div>
      </main>
    </div>
  );
}
