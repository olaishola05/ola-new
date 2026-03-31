'use client';

import React from 'react';
import Link from 'next/link';
import { Hash, Folder, TrendingUp } from 'lucide-react';

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
    <aside className="w-full space-y-12">
      {/* Categories Section */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <Folder className="w-4 h-4 text-cta" />
          <h3 className="text-xs font-bold text-softText uppercase tracking-[0.2em]">Categories</h3>
        </div>
        <div className="flex flex-col gap-2">
          <Link
            href="/blog"
            className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border
              ${!activeCategory && !activeTag
                ? 'bg-cta text-ctaText border-cta shadow-md'
                : 'bg-softBg/30 text-textColor border-transparent hover:bg-softBg hover:border-softBg'
              }`}
          >
            <span>All Stories</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-md ${!activeCategory && !activeTag ? 'bg-white/20' : 'bg-softBg'}`}>
              {categories.reduce((acc, curr) => acc + curr.count, 0)}
            </span>
          </Link>

          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/blog?category=${cat.slug}`}
              className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border
                ${activeCategory?.toLowerCase() === cat.slug
                  ? 'bg-cta text-ctaText border-cta shadow-md'
                  : 'bg-softBg/30 text-textColor border-transparent hover:bg-softBg hover:border-softBg'
                }`}
            >
              <span className="capitalize">{cat.name}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-md ${activeCategory?.toLowerCase() === cat.slug ? 'bg-white/20' : 'bg-softBg'}`}>
                {cat.count}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Tags Section */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-4 h-4 text-cta" />
          <h3 className="text-xs font-bold text-softText uppercase tracking-[0.2em]">Popular Tags</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {popularTags.slice(0, 15).map((tag) => (
            <Link
              key={tag.slug}
              href={`/blog?tag=${tag.slug}`}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 border
                ${activeTag?.toLowerCase() === tag.slug
                  ? 'bg-white dark:bg-cta text-cta dark:text-ctaText border-cta shadow-sm'
                  : 'bg-softBg/50 text-softText border-transparent hover:border-cta/30 hover:text-cta'
                }`}
            >
              <Hash className="w-3 h-3 opacity-50" />
              <span className="capitalize">{tag.name}</span>
              <span className="opacity-40">{tag.count}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter / CTA (Optional Sidebar addition for premium look) */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-cta/10 to-transparent border border-cta/10">
        <h4 className="font-bold text-textColor mb-2 italic">Want more code?</h4>
        <p className="text-xs text-softText leading-relaxed mb-4">
          Join 2,000+ developers getting technical deep-dives every week.
        </p>
        <button className="w-full py-2.5 rounded-xl bg-cta text-ctaText text-xs font-bold hover:scale-[1.02] transition-transform">
          Subscribe Now
        </button>
      </div>
    </aside>
  );
}
