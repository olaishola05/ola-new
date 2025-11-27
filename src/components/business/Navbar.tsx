"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#services", label: "Services" },
    { href: "#projects", label: "Projects" },
    { href: "#process", label: "Process" },
    { href: "#testimonials", label: "Testimonials" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    const element = document.querySelector(href);
    if (element) {
      const offset = 80; // Account for fixed navbar height
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const meetingLink = process.env.NEXT_PUBLIC_CALENDLY_URL!;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[var(--bg)]/95 backdrop-blur-md shadow-lg border-b border-[var(--border)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex items-center justify-between h-20">
          <Link
            href="/business"
            className="text-2xl font-bold text-[var(--textColor)] hover:text-[var(--primary)] transition-colors"
          >
            <Image src="/images/personal-brand.png" alt="Logo" width={100} height={100} />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-[var(--textColor)] hover:text-[var(--primary)] transition-colors font-medium text-lg"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <Button
              size="default"
              className="bg-[var(--cta)] text-[var(--ctaText)] hover:bg-[var(--cta)]/90 shadow-md hover:shadow-lg transition-all py-6 text-base"
              asChild
            >
              <Link
                href={meetingLink}
                onClick={() => setIsMobileMenuOpen(false)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book a Call
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <button
            className="md:hidden text-[var(--textColor)] hover:text-[var(--primary)] transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6 cursor-pointer" />
            )}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden min-h-[calc(100vh-80px)] animate-fade-in bg-cta rounded-sm">
            <div className="flex flex-col space-y-4 items-center justify-center px-5 py-10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-ctaText hover:text-primary transition-colors font-medium py-2 md:text-lg"
                >
                  {link.label}
                </Link>
              ))}
              <Button
                size="default"
                className="w-fit bg-cta text-ctaText hover:bg-[var(--cta)]/90 cursor-pointer py-5 border border-bg"
                asChild
              >
                <Link href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
                  Book a Call
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
