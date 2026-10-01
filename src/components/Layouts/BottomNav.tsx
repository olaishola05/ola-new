'use client';

import React from "react";
import { Copyright } from "@/components";
import { usePathname } from "next/navigation";
import Link from "next/link";

const navLinks = [
  { label: "Selected Work", href: "/#selected-work" },
  { label: "About", href: "/about" },
  { label: "Writing", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const BottomNav = () => {
  const pathname = usePathname();
  const excludePaths = ["/admin", "/testimonial", "/blog", "/contact"];
  const isExcluded = excludePaths.some((path) => pathname.startsWith(path));

  if (isExcluded) return null;

  return (
    <footer className="w-full border-t border-softBg/30 mt-16">
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col items-center gap-8">
        {/* Brand */}
        <div className="text-center">
          <p className="text-base font-bold text-[var(--textColor)] tracking-tight">
            Oladipupo Ishola
          </p>
          <p className="text-xs text-softText mt-1 tracking-wide">
            Product Engineer &amp; Postgraduate AI Researcher
          </p>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-wrap items-center justify-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-softText hover:text-cta transition-colors tracking-wide"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Copyright + Socials */}
        <Copyright />
      </div>
    </footer>
  );
};

export default BottomNav;
