'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ArrowUp } from 'lucide-react';

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct = total > 0 ? Math.min((scrolled / total) * 100, 100) : 0;
      setScrollPct(pct);
      setVisible(scrolled > 400);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // SVG progress ring
  const size = 48;
  const strokeWidth = 2.5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (scrollPct / 100) * circumference;

  return (
    <div
      className={`fixed bottom-6 right-4 lg:right-8 z-50 transition-all duration-300 ease-out ${
        visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <button
        onClick={handleClick}
        aria-label="Scroll back to top"
        title="Back to top"
        className="
          relative flex items-center justify-center
          w-12 h-12 rounded-full
          bg-white/80 dark:bg-slate-900/80
          backdrop-blur-md
          border border-slate-200 dark:border-slate-700
          shadow-lg shadow-black/10 dark:shadow-black/30
          text-slate-600 dark:text-slate-300
          hover:text-cta dark:hover:text-cta
          hover:border-cta/40 dark:hover:border-cta/40
          hover:shadow-xl hover:shadow-cta/10
          hover:-translate-y-0.5
          transition-all duration-200 ease-out
          group
        "
      >
        {/* Progress ring */}
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="absolute inset-0 -rotate-90"
          aria-hidden="true"
        >
          {/* Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-slate-200 dark:text-slate-700"
          />
          {/* Progress */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            className="text-cta transition-all duration-150"
          />
        </svg>

        {/* Arrow icon */}
        <ArrowUp
          className="w-4 h-4 relative z-10 transition-transform duration-200 group-hover:-translate-y-0.5"
          strokeWidth={2.5}
          aria-hidden="true"
        />
      </button>
    </div>
  );
};

export default ScrollToTop;
