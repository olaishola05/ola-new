'use client';

import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import BlogLogo from './BlogLogo';
import { usePathname } from 'next/navigation';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import Link from 'next/link';
import AdminRoutes from './AdminRoutes';
import { useSession } from 'next-auth/react';
import SearchPalette from '../Search/SearchPalette';
import { Menu, X, ArrowUpRight, Calendar } from 'lucide-react';

interface NavLinkItem {
  id: string;
  title: string;
  path: string;
  isExternal?: boolean;
}

const MAIN_NAV_ITEMS: NavLinkItem[] = [
  { id: 'work', title: 'Selected Work', path: '/#selected-work' },
  { id: 'about', title: 'About', path: '/about' },
  { id: 'writing', title: 'Writing', path: '/blog' },
  { id: 'contact', title: 'Contact', path: '/#contact' },
];

const BLOG_NAV_ITEMS: NavLinkItem[] = [
  { id: 'home', title: 'Portfolio', path: '/' },
  { id: 'blog', title: 'All Articles', path: '/blog' },
  { id: 'about', title: 'About', path: '/about' },
  { id: 'contact', title: 'Contact', path: '/contact' },
];

export default function TopNav() {
  const { status }: any = useSession();
  const routePath = usePathname();
  const isBlogPath = routePath.startsWith('/blog');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [routePath]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = isBlogPath ? BLOG_NAV_ITEMS : MAIN_NAV_ITEMS;

  const isActive = (path: string) => {
    if (path === '/') return routePath === '/';
    if (path.startsWith('/#')) return false;
    return routePath === path || routePath.startsWith(`${path}/`);
  };

  const discoveryCallUrl =
    process.env.NEXT_PUBLIC_CAL_URL || 'https://cal.com/olaishola';

  return (
    <header className="sticky top-0 z-50 w-full bg-[var(--bg)]/85 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Lockup */}
        <div className="flex items-center gap-3">
          {isBlogPath ? (
            <BlogLogo showText={true} />
          ) : (
            <Logo showText={true} />
          )}
        </div>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-1.5 p-1 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.05] dark:border-white/[0.05]"
          aria-label="Main Navigation"
        >
          {navLinks.map(({ id, title, path }) => {
            const active = isActive(path);
            return (
              <Link
                key={id}
                href={path}
                className={`px-3.5 py-1.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  active
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-sm'
                    : 'text-softText hover:text-[var(--textColor)] hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                {title}
              </Link>
            );
          })}
        </nav>

        {/* Controls & Actions */}
        <div className="flex items-center gap-3">
          <SearchPalette />
          <ThemeToggle />

          {/* Quick CTA on desktop */}
          <Link
            href={discoveryCallUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cta text-ctaText text-xs font-bold shadow-md shadow-cta/15 hover:scale-105 active:scale-95 transition-all tracking-wide"
          >
            <span>Book Call</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>

          <AdminRoutes isActive={isActive} pathname={routePath} />

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 text-slate-700 dark:text-slate-300 hover:text-cta transition-colors"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay / Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-20 bottom-0 bg-[var(--bg)]/95 backdrop-blur-2xl z-40 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col justify-between p-6 overflow-y-auto animate-fade-in">
          <nav className="flex flex-col gap-2 pt-4">
            <span className="text-[11px] font-bold uppercase tracking-widest text-softText px-3 mb-2">
              Menu
            </span>
            {navLinks.map(({ id, title, path }) => {
              const active = isActive(path);
              return (
                <Link
                  key={id}
                  href={path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between p-4 rounded-2xl text-base font-semibold transition-all ${
                    active
                      ? 'bg-cta/10 text-cta dark:text-purple-300'
                      : 'text-[var(--textColor)] hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  <span>{title}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-50" />
                </Link>
              );
            })}
          </nav>

          {/* Mobile Action Bar */}
          <div className="pt-8 pb-6 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-col gap-3">
            <Link
              href={discoveryCallUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-cta text-ctaText font-bold text-sm shadow-xl shadow-cta/20 active:scale-95 transition-all"
            >
              <Calendar className="w-4 h-4" />
              Book a 15-min discovery call
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <p className="text-xs text-softText text-center mt-2">
              Product Engineer &amp; Postgraduate AI Researcher
            </p>
          </div>
        </div>
      )}
    </header>
  );
}