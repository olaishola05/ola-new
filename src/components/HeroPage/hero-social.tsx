'use client';

import React from 'react'
import Link from 'next/link'
import { socialLinks } from "@/app/utils";
import CustomIcon from "../IconsComponent/CustomIcon";

// Per-platform accent colours (used on hover only)
const platformColors: Record<string, string> = {
  github: 'hover:bg-[#24292f] hover:text-white dark:hover:bg-white dark:hover:text-[#24292f]',
  linkedin: 'hover:bg-[#0A66C2] hover:text-white',
  twitter: 'hover:bg-[#000] hover:text-white dark:hover:bg-white dark:hover:text-black',
  medium: 'hover:bg-[#000] hover:text-white dark:hover:bg-white dark:hover:text-black',
  instagram: 'hover:bg-gradient-to-br hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] hover:text-white',
  hashnode: 'hover:bg-[#2563EB] hover:text-white',
  threads: 'hover:bg-[#000] hover:text-white dark:hover:bg-white dark:hover:text-black',
  youtube: 'hover:bg-[#FF0000] hover:text-white',
};

export default function HeroSocialIcons() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {socialLinks.map((link) => {
        const key = link.title.toLowerCase();
        const colorClass = platformColors[key] ?? 'hover:bg-cta hover:text-ctaText';

        return (
          <Link
            key={link.id}
            href={link.path}
            target="_blank"
            rel="noopener noreferrer"
            title={link.title}
            className={`
              group flex items-center gap-2 px-3.5 py-2 rounded-xl
              bg-slate-100 dark:bg-slate-800/60
              border border-slate-200 dark:border-slate-700/60
              text-slate-600 dark:text-slate-300
              text-[13px] font-medium
              transition-all duration-200 ease-out
              hover:-translate-y-0.5 hover:shadow-md
              ${colorClass}
            `}
          >
            <span className="w-[15px] h-[15px] flex items-center justify-center shrink-0">
              <CustomIcon icon={link.icon} className="w-full h-full" />
            </span>
            <span className="capitalize leading-none">{link.title}</span>
          </Link>
        );
      })}
    </div>
  );
}
