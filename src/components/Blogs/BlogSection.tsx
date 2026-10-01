"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { randomItemFromArray, readTimeInfo } from "@/app/utils";
import { slugify } from "@/app/utils/utilities";
import { motion } from "framer-motion";

interface BlogSectionProps {
  data: any;
}

const BlogSection = ({ data }: BlogSectionProps) => {
  const articles = data?.items?.slice(0, 6) || [];

  return (
    <div
      data-aos="fade-up"
      data-aos-duration="3000"
      className="w-full px-4 md:px-6 py-12 md:py-16 mb-10"
    >
      <div className="max-w-3xl mx-auto flex flex-col gap-6">
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center gap-2 mb-8 pt-4">
          <span className="text-xs font-bold uppercase tracking-widest text-cta" data-aos="fade-up">
            From The Blog
          </span>
          <h2
            className="text-3xl md:text-5xl font-extrabold text-[var(--textColor)] tracking-tight text-center"
            data-aos="fade-up"
          >
            Selected Writing
          </h2>
          <p className="text-softText text-base md:text-lg max-w-xl text-center mt-1">
            Technical articles on engineering, backend systems, and AI tooling.
          </p>
        </div>

        {/* Editorial article list */}
        <div className="flex flex-col divide-y divide-softBg/60">
          {articles.map((item: any, idx: number) => {
            const tag = item?.categories
              ? randomItemFromArray(item.categories, 5)
              : "Engineering";
            const readTime = readTimeInfo(item.content);
            const url = `/blog/medium/${slugify(item.title)}?guid=${item.guid.split("/").pop()}`;
            const year = item.pubDate
              ? new Date(item.pubDate).getFullYear()
              : "";

            return (
              <motion.div
                key={item.guid}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.06 }}
              >
                <Link
                  href={url}
                  className="group flex items-start md:items-center justify-between gap-4 py-5 hover:bg-softBg/20 rounded-xl px-3 -mx-3 transition-colors duration-200"
                >
                  {/* Left: year + title */}
                  <div className="flex items-start md:items-center gap-4 md:gap-6 flex-1 min-w-0">
                    {year && (
                      <span className="hidden md:block text-xs font-bold text-softText/40 tracking-widest shrink-0 w-10">
                        {year}
                      </span>
                    )}
                    <div className="flex flex-col gap-1 min-w-0">
                      <h3 className="text-base md:text-lg font-semibold text-textColor group-hover:text-cta transition-colors duration-200 leading-snug line-clamp-2">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-softText/60">
                        <span className="font-semibold text-cta/70 uppercase tracking-wider">
                          {tag}
                        </span>
                        <span>·</span>
                        <span>{readTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: arrow */}
                  <ArrowUpRight className="w-4 h-4 text-softText/30 group-hover:text-cta group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0 mt-1 md:mt-0" />
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* View all link */}
        <div className="mt-8 flex items-center gap-2">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-cta hover:gap-3 transition-all duration-200"
          >
            View all articles <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogSection;
