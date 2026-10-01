"use client";

import React from "react";
import { CustomCard } from "@/components";
import { slugify } from "@/app/utils/utilities";

type props = {
  data: {
    id: string;
    name: string;
    description: string[] | null;
    githubUrl: string | null;
    liveUrl: string | null;
    coverImgUrl: string | null;
    stacks: string[];
    images: string[];
    tag: string | null;
    authorId: string | null;
  }[];
};

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

const ProjectSection = ({ data }: props) => {
  return (
    <section
      id="selected-work"
      data-aos="fade-up"
      data-aos-anchor-placement="top-center"
      className="w-full px-4 md:px-6 lg:px-8 py-12 md:py-20 mb-10"
    >
      <div className="max-w-3xl mx-auto flex flex-col gap-10 md:gap-14">
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center gap-3 text-center">
          <span
            className="text-xs font-bold uppercase tracking-widest text-cta"
            data-aos="zoom-in-up"
          >
            Proven Engineering
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--textColor)] tracking-tight">
            Selected Work
          </h2>
          <p className="text-softText text-base md:text-lg max-w-2xl mt-1">
            Production systems, full-stack web applications, and backend APIs — engineered in collaborative cross-functional teams.
          </p>
        </div>

        {/* Curated Projects List (Text-first, no images) */}
        <div className="flex flex-col gap-5 sm:gap-6">
          {data?.map((project: any, idx: number) => {
            const slug = slugify(project.name);
            const isPortfolio = slug === "portfolio" || project.name.toLowerCase() === "portfolio";
            const effectiveLiveUrl = isPortfolio
              ? "https://portfolio-phi-seven-88.vercel.app/"
              : project.liveUrl;

            const isCaseStudy = ["ohiole-lagos", "techverse-academy"].includes(slug);
            const hasLive = isValidHttpUrl(effectiveLiveUrl);
            const hasGithub = isValidHttpUrl(project.githubUrl);

            const destinationUrl = isCaseStudy
              ? `/projects/${slug}`
              : hasLive
              ? effectiveLiveUrl!
              : hasGithub
              ? project.githubUrl!
              : `/projects/${slug}`;

            return (
              <CustomCard
                key={project.id}
                index={idx}
                stacks={project.stacks}
                name={project.name}
                role={project.tag}
                description={project.description?.[0] || ""}
                url={destinationUrl}
                liveUrl={effectiveLiveUrl}
                githubUrl={project.githubUrl}
                isCaseStudy={isCaseStudy}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
