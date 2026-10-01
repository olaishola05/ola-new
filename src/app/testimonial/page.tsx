import React from 'react'
import TestimonialForm from './TestimonialForm'
import { Metadata } from 'next';
import { Copyright } from '@/components';
import Link from 'next/link';
import { ArrowLeft, Linkedin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Leave a Recommendation',
  description: 'Worked with Ola? Leave a brief professional recommendation — it takes under 2 minutes and means a lot.',
  alternates: {
    canonical: 'https://olaishola.tech/testimonial',
  },
  openGraph: {
    title: 'Leave a Recommendation | Oladipupo Ishola',
    description: 'Worked with Ola on a project? Leave a recommendation below.',
    url: 'https://olaishola.tech/testimonial',
    type: 'website',
    images: [
      {
        url: '/images/portrait-me.jpeg',
        width: 1200,
        height: 630,
        alt: 'Oladipupo Ishola',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Leave a Recommendation | Oladipupo Ishola',
    description: 'Worked with Ola on a project? Leave a recommendation below.',
  },
}

export default function TestimonialPage() {
  return (
    <main className="min-h-screen pt-28 pb-16">
      {/* Back nav */}
      <div className="max-w-2xl mx-auto px-6 mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-softText hover:text-cta transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to portfolio
        </Link>
      </div>

      {/* Header */}
      <section className="max-w-2xl mx-auto px-6 mb-12 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-cta">
          Recommendation
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-[var(--textColor)] tracking-tight mt-3 mb-4">
          Have we worked together?
        </h1>
        <p className="text-softText text-base md:text-lg leading-relaxed">
          If you&apos;ve collaborated with me on a project, reviewed my work, or
          seen me operate in an engineering or product context — I&apos;d be
          grateful for a brief professional recommendation. It takes under 2
          minutes.
        </p>

        {/* LinkedIn alternative */}
        <div className="mt-6 inline-flex items-center gap-2 text-sm text-softText">
          <Linkedin className="w-4 h-4 text-[#0077B5]" />
          Prefer LinkedIn?{' '}
          <a
            href="https://www.linkedin.com/in/oladipupoishola/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cta hover:underline underline-offset-4 font-semibold"
          >
            Leave a recommendation there →
          </a>
        </div>
      </section>

      {/* Form */}
      <section className="max-w-2xl mx-auto px-6">
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 p-8 md:p-10 backdrop-blur-sm shadow-xl">
          <h2 className="text-lg font-bold text-[var(--textColor)] mb-6">
            Your recommendation
          </h2>
          <TestimonialForm />
        </div>

        <p className="text-xs text-softText/60 text-center mt-6 leading-relaxed">
          Your submission is reviewed before it appears publicly. Your email is
          used only for follow-up if needed and is never displayed.
        </p>
      </section>

      <div className="mt-20">
        <Copyright />
      </div>
    </main>
  )
}
