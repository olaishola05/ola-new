'use client';

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Github, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

interface CustomCardProps {
  image?: string | null;
  name: string;
  description?: string | null;
  role?: string | null;
  url: string;
  liveUrl?: string | null;
  githubUrl?: string | null;
  isCaseStudy?: boolean;
  stacks?: string[];
  index?: number;
  overlayText?: string;
  duration?: string;
}

const isValidHttpUrl = (val?: string | null): val is string => {
  if (!val) return false;
  const trimmed = val.trim();
  return (
    trimmed.length > 0 &&
    trimmed !== "#" &&
    trimmed !== "/" &&
    (trimmed.startsWith("http://") || trimmed.startsWith("https://"))
  );
};

const CustomCard = ({
  name,
  description,
  role,
  url,
  liveUrl,
  githubUrl,
  isCaseStudy = false,
  stacks,
  index = 0,
}: CustomCardProps) => {
  const num = String(index + 1).padStart(2, "0");

  const hasLive = isValidHttpUrl(liveUrl);
  // Do NOT render GitHub link for private client/company case studies
  const hasGithub = isValidHttpUrl(githubUrl) && !isCaseStudy;

  const isExternalUrl = url.startsWith("http://") || url.startsWith("https://");
  const externalProps = isExternalUrl
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group w-full"
    >
      <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-6 sm:p-8 rounded-2xl border border-softBg/60 bg-[var(--contactBg)] hover:border-cta/40 hover:shadow-xl hover:shadow-cta/5 transition-all duration-300">
        
        {/* Left section: Number + Content */}
        <div className="flex items-start gap-6 sm:gap-8 flex-1 min-w-0">
          {/* Big Editorial Number */}
          <span className="text-4xl sm:text-5xl font-black text-cta/30 group-hover:text-cta transition-colors tracking-tight shrink-0 select-none pt-1">
            {num}
          </span>

          {/* Project Details */}
          <div className="space-y-3 flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <Link href={url} {...externalProps} className="hover:text-cta transition-colors">
                <h3 className="text-xl sm:text-2xl font-extrabold text-textColor tracking-tight">
                  {name}
                </h3>
              </Link>
              <span className="text-[10px] font-bold tracking-widest uppercase py-0.5 px-2.5 rounded-full bg-cta/10 text-cta border border-cta/20">
                {role || "Fullstack"}
              </span>
              {isCaseStudy && (
                <span className="text-[10px] font-bold tracking-widest uppercase py-0.5 px-2.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  Case Study
                </span>
              )}
            </div>

            <p className="text-sm sm:text-base text-softText leading-relaxed line-clamp-2 max-w-2xl">
              {description}
            </p>

            {/* Stack Pills */}
            {stacks && stacks.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {stacks.slice(0, 6).map((stack, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-softBg/60 text-softText border border-softBg"
                  >
                    {stack}
                  </span>
                ))}
                {stacks.length > 6 && (
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-softBg/40 text-softText/60 border border-softBg">
                    +{stacks.length - 6}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right section: Action Buttons with Strict Validation */}
        <div className="shrink-0 flex items-center gap-3 self-end md:self-center pt-2 md:pt-0">
          {/* Direct GitHub Link (Only for public projects with valid http URL, never for proprietary case studies) */}
          {hasGithub && (
            <Link
              href={githubUrl!}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl border border-softBg/80 text-softText hover:text-textColor hover:border-cta/40 hover:bg-softBg/40 transition-all"
              title="View Source on GitHub"
            >
              <Github className="w-4 h-4" />
            </Link>
          )}

          {/* Direct Live App Link (if not a case study) */}
          {hasLive && !isCaseStudy && (
            <Link
              href={liveUrl!}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-cta text-ctaText font-bold text-xs uppercase tracking-wider hover:scale-105 active:scale-95 transition-all shadow-md shadow-cta/10"
            >
              Live App <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          )}

          {/* Primary Action for Case Studies */}
          {isCaseStudy ? (
            <Link
              href={url}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-cta text-ctaText font-bold text-xs uppercase tracking-wider hover:scale-105 active:scale-95 transition-all shadow-md shadow-cta/10"
            >
              <BookOpen className="w-3.5 h-3.5" /> Read Case Study
            </Link>
          ) : !hasLive ? (
            <Link
              href={url}
              {...externalProps}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-cta hover:gap-2.5 transition-all"
            >
              Explore <ArrowUpRight className="w-4 h-4" />
            </Link>
          ) : null}
        </div>

      </div>
    </motion.div>
  );
};

export default CustomCard;
