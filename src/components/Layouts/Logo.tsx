'use client';

import React from 'react';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export default function Logo({ className = '', showText = true }: LogoProps) {
  return (
    <Link
      href="/"
      className={`group flex items-center gap-3 outline-none select-none ${className}`}
      aria-label="Oladipupo Ishola — Home"
    >
      {/* Animated Brand Mark */}
      <div className="relative w-10 h-10 flex items-center justify-center">
        {/* Ambient glow effect on hover */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#8257e5]/0 via-[#8257e5]/20 to-purple-400/0 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500" />

        <svg
          viewBox="0 0 100 100"
          className="w-full h-full transform transition-all duration-500 ease-out group-hover:scale-105 group-hover:rotate-[-6deg]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle gradient definition */}
          <defs>
            <linearGradient id="logo-ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#8257e5" />
            </linearGradient>
          </defs>

          {/* Outer Brand Ring "O" */}
          <circle
            cx="46"
            cy="46"
            r="32"
            stroke="currentColor"
            strokeWidth="9"
            className="text-[var(--textColor)] group-hover:stroke-[url(#logo-ring-grad)] transition-all duration-300"
          />

          {/* "ish." Typography */}
          <g className="text-[var(--textColor)] transition-colors duration-300">
            {/* 'i' stem */}
            <rect x="66" y="60" width="3" height="13" rx="1.5" fill="currentColor" />
            {/* 'i' dot — pulses subtly on hover */}
            <circle
              cx="67.5"
              cy="54"
              r="2"
              fill="#8257e5"
              className="group-hover:scale-125 transition-transform duration-300 origin-[67.5px_54px]"
            />

            {/* 's' */}
            <text
              x="72"
              y="73"
              fontSize="17"
              fontWeight="600"
              fontFamily="system-ui, -apple-system, sans-serif"
              fill="currentColor"
              letterSpacing="-0.5px"
            >
              s
            </text>

            {/* 'h' */}
            <text
              x="80"
              y="73"
              fontSize="17"
              fontWeight="600"
              fontFamily="system-ui, -apple-system, sans-serif"
              fill="currentColor"
              letterSpacing="-0.5px"
            >
              h
            </text>

            {/* '.' period accent */}
            <circle
              cx="91.5"
              cy="71.5"
              r="2"
              className="fill-cta group-hover:fill-emerald-400 transition-colors duration-300"
            />
          </g>
        </svg>
      </div>

      {/* Brand Text Lockup */}
      {showText && (
        <span className="text-xl font-extrabold tracking-tight text-[var(--textColor)] group-hover:text-cta transition-colors duration-300">
          Oladipupo Ishola
        </span>
      )}
    </Link>
  );
}