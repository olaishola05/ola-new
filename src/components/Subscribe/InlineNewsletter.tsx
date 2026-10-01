'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Sparkles } from 'lucide-react';
import SubscribeForm from './SubscribeForm';

export default function InlineNewsletter() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="my-12 p-6 sm:p-8 md:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-900/70 relative overflow-hidden backdrop-blur-sm shadow-sm group"
    >
      {/* Subtle ambient accent glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cta/10 via-purple-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-2xl">
        {/* Eyebrow Badge */}
        <div className="flex items-center gap-2 mb-3">
          <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-cta text-ctaText shadow-sm shadow-cta/20">
            <Mail className="w-3.5 h-3.5" />
          </span>
          <span className="text-xs font-bold uppercase tracking-widest text-cta">
            Engineering Newsletter
          </span>
        </div>

        {/* Headline */}
        <h3 className="text-xl sm:text-2xl font-extrabold text-[var(--textColor)] tracking-tight mb-2">
          Enjoying this post? Stay in the loop.
        </h3>

        {/* Description */}
        <p className="text-sm sm:text-base text-softText leading-relaxed mb-6 max-w-xl">
          Get practical technical notes on TypeScript, backend systems, and AI-assisted development delivered to your inbox. No hype, no spam.
        </p>

        {/* Subscribe Form Container */}
        <div className="w-full max-w-xl">
          <SubscribeForm />
          <p className="text-[11px] text-softText/70 mt-2.5 flex items-center gap-1.5">
            <span>🔒 Free &amp; private. Unsubscribe anytime with one click.</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
