'use client';

import React, { useContext, useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { ThemeContext } from '@/app/config/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-xl border border-slate-200/50 dark:border-slate-800/50 bg-slate-100/50 dark:bg-slate-900/50" />
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="relative w-10 h-10 rounded-xl flex items-center justify-center border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-cta dark:hover:text-[#a78bfa] shadow-sm backdrop-blur-sm transition-all duration-300 group"
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {/* Sun Icon */}
        <Sun
          className={`w-5 h-5 absolute transition-all duration-500 transform ${
            isDark
              ? 'scale-0 rotate-90 opacity-0'
              : 'scale-100 rotate-0 opacity-100 text-amber-500'
          }`}
        />

        {/* Moon Icon */}
        <Moon
          className={`w-5 h-5 absolute transition-all duration-500 transform ${
            isDark
              ? 'scale-100 rotate-0 opacity-100 text-indigo-300 group-hover:text-indigo-200'
              : 'scale-0 -rotate-90 opacity-0'
          }`}
        />
      </div>
    </button>
  );
}
