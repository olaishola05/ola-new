'use client';

import React from 'react';
import Link from 'next/link';

interface BlogLogoProps {
  className?: string;
  showText?: boolean;
}

export default function BlogLogo({ className = '', showText = true }: BlogLogoProps) {
  return (
    <Link
      href="/blog"
      className={`group flex items-center gap-3 outline-none select-none ${className}`}
      aria-label="Code 'n' Beyond — Blog"
    >
      {/* "Code + Horizon" Icon Mark */}
      <div className="relative w-9 h-9 flex items-center justify-center">
        {/* Subtle ambient purple glow on hover */}
        <div className="absolute inset-0 rounded-xl bg-cta/20 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300 pointer-events-none" />

        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full transform transition-all duration-300 group-hover:scale-105"
        >
          <defs>
            <linearGradient id="horizon-grad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8257e5" />
              <stop offset="100%" stopColor="#c084fc" />
            </linearGradient>
          </defs>

          {/* Squircle Background Badge */}
          <rect
            x="1.5"
            y="1.5"
            width="33"
            height="33"
            rx="9"
            className="fill-slate-100/90 dark:fill-slate-800/80 stroke-slate-200/90 dark:stroke-slate-700/80 group-hover:stroke-cta/50 transition-colors duration-300"
            strokeWidth="1.5"
          />

          {/* Code Angle Bracket (>) */}
          <path
            d="M11 12.5L17.5 18L11 23.5"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[var(--textColor)] group-hover:stroke-cta transition-colors duration-300"
          />

          {/* Horizon Arc breaking upward into the Beyond */}
          <path
            d="M16 23.5C21 23.5 24.5 19.5 25.5 13"
            stroke="url(#horizon-grad)"
            strokeWidth="2.2"
            strokeLinecap="round"
          />

          {/* Beyond Radiant Spark Dot */}
          <circle
            cx="25.5"
            cy="13"
            r="1.8"
            fill="#8257e5"
            className="group-hover:scale-125 transition-transform duration-300 origin-[25.5px_13px]"
          />
        </svg>
      </div>

      {/* Typography Lockup */}
      {showText && (
        <div className="flex items-center tracking-tight">
          <span className="text-xl font-extrabold text-[var(--textColor)]">
            Code
          </span>
          <span className="text-xs font-bold text-cta dark:text-purple-300 px-1.5 py-0.5 mx-1 rounded-md bg-cta/10 italic">
            &apos;n&apos;
          </span>
          <span className="text-xl font-extrabold text-[var(--textColor)] group-hover:text-cta transition-colors duration-200">
            Beyond
          </span>
          {/* Subtle accent dot */}
          <span className="w-1.5 h-1.5 rounded-full bg-cta ml-1 inline-block group-hover:scale-125 transition-transform duration-200" />
        </div>
      )}
    </Link>
  );
}
