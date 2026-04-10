'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Send, Zap } from 'lucide-react';
import SubscribeForm from './SubscribeForm';

export default function InlineNewsletter() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="my-16 p-8 rounded-3xl bg-gradient-to-br from-cta/10 via-softBg/50 to-cta/5 border border-cta/20 relative overflow-hidden group"
    >
      {/* Decorative background elements */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-cta/10 rounded-full blur-3xl group-hover:bg-cta/20 transition-colors" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-cta/5 rounded-full blur-3xl" />

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center p-2 rounded-xl bg-cta text-ctaText">
              <Zap className="w-5 h-5 fill-current" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-cta">Reader Exclusive</span>
          </div>

          <h3 className="text-2xl md:text-3xl font-extrabold text-textColor leading-tight">
            Enjoying this article? <br />
            <span className="text-cta">Level up</span> your skills.
          </h3>

          <p className="text-base text-softText max-w-sm">
            Join 2,000+ developers receiving my best technical deep-dives and career advice every week. No spam, ever.
          </p>
        </div>

        <div className="w-full md:w-112 lg:w-[448px] space-y-4">
          <SubscribeForm />
          <p className="text-[10px] text-center text-softText mt-4 opacity-70">
            Fully secure. Unsubscribe at any time with one click.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
