'use client';

import React from 'react';
import Link from 'next/link';
import { Hash, Folder, TrendingUp, Mail } from 'lucide-react';

interface SidebarItem {
  name: string;
  count: number;
  slug: string;
}

interface SmartSidebarProps {
  categories: SidebarItem[];
  popularTags: SidebarItem[];
  activeCategory?: string;
  activeTag?: string;
}

export default function SmartSidebar({
  categories,
  popularTags,
  activeCategory,
  activeTag
}: SmartSidebarProps) {
  return (
    <aside className="w-full space-y-10">
      {/* Categories Section */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Folder className="w-4 h-4 text-cta" />
          <h3 className="text-xs font-bold text-softText uppercase tracking-[0.2em]">Categories</h3>
        </div>
        <div className="flex flex-col gap-1.5">
          <Link
            href="/blog"
            className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border
              ${!activeCategory && !activeTag
                ? 'bg-cta text-ctaText border-cta shadow-md'
                : 'bg-white/60 dark:bg-slate-900/40 text-textColor border-slate-200/80 dark:border-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
          >
            <span>All Stories</span>
            <span className={`text-[11px] px-2 py-0.5 rounded-md font-bold ${!activeCategory && !activeTag ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-softText'}`}>
              {categories.reduce((acc, curr) => acc + curr.count, 0)}
            </span>
          </Link>

          {categories.map((cat) => {
            const isActive = activeCategory?.toLowerCase() === cat.slug;
            return (
              <Link
                key={cat.slug}
                href={`/blog?category=${cat.slug}`}
                className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border
                  ${isActive
                    ? 'bg-cta text-ctaText border-cta shadow-md'
                    : 'bg-white/60 dark:bg-slate-900/40 text-textColor border-slate-200/80 dark:border-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
              >
                <span className="capitalize">{cat.name}</span>
                <span className={`text-[11px] px-2 py-0.5 rounded-md font-bold ${isActive ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-softText'}`}>
                  {cat.count}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Popular Tags Section — clean hashtag discovery chips without distracting "1" badges */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-4 h-4 text-cta" />
          <h3 className="text-xs font-bold text-softText uppercase tracking-[0.2em]">Popular Tags</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {popularTags.slice(0, 16).map((tag) => {
            const isActive = activeTag?.toLowerCase() === tag.slug;
            return (
              <Link
                key={tag.slug}
                href={`/blog?tag=${tag.slug}`}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 border
                  ${isActive
                    ? 'bg-cta text-ctaText border-cta shadow-sm'
                    : 'bg-white/60 dark:bg-slate-900/40 text-softText border-slate-200/80 dark:border-slate-800/80 hover:border-cta/40 hover:text-cta'
                  }`}
              >
                <Hash className="w-3 h-3 text-cta/70" />
                <span className="capitalize">{tag.name}</span>
                {tag.count > 1 && (
                  <span className="text-[10px] opacity-60">({tag.count})</span>
                )}
              </Link>
            );
          })}
        </div>
      </section>

      {/* Newsletter Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-cta/10 via-purple-500/5 to-transparent border border-cta/15">
        <div className="flex items-center gap-2 text-cta font-bold text-xs uppercase tracking-wider mb-2">
          <Mail className="w-4 h-4" />
          Newsletter
        </div>
        <h4 className="font-extrabold text-[var(--textColor)] text-sm mb-1.5">
          Engineering in your inbox
        </h4>
        <p className="text-xs text-softText leading-relaxed mb-4">
          Practical notes on AI engineering, real-world systems, and product lessons.
        </p>
        <Link
          href="#newsletter"
          className="inline-flex items-center justify-center w-full py-2.5 rounded-xl bg-cta text-ctaText text-xs font-bold hover:scale-[1.02] active:scale-95 transition-all shadow-md shadow-cta/20"
        >
          Subscribe Below ↓
        </Link>
      </div>
    </aside>
  );
}
