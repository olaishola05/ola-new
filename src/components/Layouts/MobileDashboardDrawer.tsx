'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogOut, Layout as LayoutIcon, FileText, Folder, MessageSquare, Plus, Home } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

interface MobileDashboardDrawerProps {
  session: any;
}

export default function MobileDashboardDrawer({ session }: MobileDashboardDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: 'Analytics', icon: LayoutIcon, path: '/admin/dashboard' },
    { name: 'All Posts', icon: FileText, path: '/admin/dashboard/posts' },
    { name: 'Projects', icon: Folder, path: '/admin/dashboard/projects' },
    { name: 'Testimonials', icon: MessageSquare, path: '/admin/dashboard/testimonials' },
    { name: 'Drafts', icon: FileText, path: '/admin/dashboard/posts/drafts' },
    { name: 'Add Project', icon: Plus, path: '/admin/dashboard/create' },
    { name: 'Back to Site', icon: Home, path: '/' },
  ];

  return (
    <>
      {/* Trigger */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden p-2 rounded-xl bg-cta/10 text-cta active:scale-95 transition-transform"
      >
        <Menu className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 left-0 bottom-0 w-[80%] max-w-sm bg-[var(--bg)] shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-softBg flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-textColor">Dashboard</h2>
                  <p className="text-xs text-softText">Management Menu</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-softBg transition-colors"
                >
                  <X className="w-6 h-6 text-softText" />
                </button>
              </div>

              {/* Navigation */}
              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {menuItems.map((item) => {
                  const active = pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all ${active
                          ? 'bg-cta text-ctaText shadow-lg shadow-cta/20'
                          : 'text-softText hover:bg-softBg hover:text-textColor'
                        }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-bold text-sm tracking-wide">{item.name}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Profile/Footer */}
              <div className="p-6 border-t border-softBg bg-softBg/20">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-cta flex items-center justify-center text-ctaText font-bold text-lg">
                    {session?.user?.name?.[0]}
                  </div>
                  <div>
                    <h3 className="font-bold text-textColor">{session?.user?.name}</h3>
                    <p className="text-xs text-softText">{session?.user?.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl border border-red-500/20 text-red-500 font-bold text-sm hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
