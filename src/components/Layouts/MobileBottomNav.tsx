'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { BarChart2, BookOpen, Home, PlusCircle, Settings, User } from 'lucide-react';

export default function MobileBottomNav() {
  const pathname = usePathname();
  const isAdminPath = pathname.startsWith('/admin/dashboard');
  const isBlogPath = pathname.startsWith('/blog');

  // If not in dashboard or blog, we might not want the app-style nav
  if (!isAdminPath && !isBlogPath) return null;

  const navItems = isAdminPath ? [
    { name: 'Home', icon: Home, path: '/' },
    { name: 'Stats', icon: BarChart2, path: '/admin/dashboard' },
    { name: 'Posts', icon: BookOpen, path: '/admin/dashboard/posts' },
    { name: 'New', icon: PlusCircle, path: '/admin/dashboard/projects' },
  ] : [
    { name: 'Home', icon: Home, path: '/' },
    { name: 'Blog', icon: BookOpen, path: '/blog' },
    { name: 'Profile', icon: User, path: '/about' },
  ];

  return (
    <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] w-[90%] max-w-md">
      <motion.nav
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center justify-around px-2 py-3 bg-[var(--bg)]/80 backdrop-blur-xl border border-softBg rounded-2xl shadow-2xl"
      >
        {navItems.map((item) => {
          const active = pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path));
          return (
            <Link key={item.name} href={item.path} className="relative group flex flex-col items-center">
              <div className={`p-2 rounded-xl transition-all duration-300 ${active ? 'bg-cta text-ctaText' : 'text-softText hover:bg-softBg'
                }`}>
                <item.icon className="w-5 h-5" />
              </div>
              {active && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -bottom-1.5 w-1 h-1 rounded-full bg-cta"
                />
              )}
            </Link>
          );
        })}
      </motion.nav>
    </div>
  );
}
