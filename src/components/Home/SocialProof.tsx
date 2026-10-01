import React from "react";
import Link from "next/link";
import { Quote, ArrowUpRight, Linkedin, GraduationCap } from "lucide-react";
import {
  PEER_RECOMMENDATIONS,
  MENTEE_RECOMMENDATIONS,
  type LinkedInRecommendation,
} from "@/data/linkedin-recommendations";

// ─── Sub-components ───────────────────────────────────────────────────────────

function FeaturedCard({ rec }: { rec: LinkedInRecommendation }) {
  return (
    <article className="relative rounded-3xl border border-softBg/60 bg-softBg/20 p-8 md:p-10 overflow-hidden">
      <Quote
        className="absolute top-6 right-8 w-20 h-20 text-cta opacity-10"
        strokeWidth={1}
      />

      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-full bg-cta/10 flex items-center justify-center flex-shrink-0">
          <span className="text-cta font-bold text-sm">{rec.avatar}</span>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-[var(--textColor)] text-sm">
              {rec.name}
            </span>
            <a
              href={rec.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0077B5] hover:opacity-80 transition-opacity"
              aria-label={`${rec.name} on LinkedIn`}
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
          <p className="text-xs text-softText mt-0.5">{rec.title}</p>
          <p className="text-xs text-softText/70 mt-0.5">
            {rec.relationship} · {rec.date}
          </p>
        </div>
      </div>

      <blockquote className="relative z-10">
        {rec.excerpt && (
          <p className="text-base md:text-lg text-[var(--textColor)] leading-relaxed font-medium mb-4">
            &ldquo;{rec.excerpt}&rdquo;
          </p>
        )}
        <p className="text-sm text-softText leading-relaxed">
          &ldquo;{rec.quote}&rdquo;
        </p>
      </blockquote>

      <div className="mt-6">
        <a
          href={rec.linkedIn}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-softText hover:text-[#0077B5] transition-colors"
        >
          <Linkedin className="w-3.5 h-3.5" />
          Verified on LinkedIn
          <ArrowUpRight className="w-3 h-3" />
        </a>
      </div>
    </article>
  );
}

function CompactCard({ rec }: { rec: LinkedInRecommendation }) {
  return (
    <article className="rounded-2xl border border-softBg/60 bg-softBg/10 p-6 flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-cta/10 flex items-center justify-center flex-shrink-0">
          <span className="text-cta font-bold text-xs">{rec.avatar}</span>
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-[var(--textColor)] text-sm">
              {rec.name}
            </span>
            <a
              href={rec.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0077B5] hover:opacity-80 transition-opacity"
              aria-label={`${rec.name} on LinkedIn`}
            >
              <Linkedin className="w-3.5 h-3.5" />
            </a>
          </div>
          <p className="text-xs text-softText">{rec.title}</p>
          <p className="text-xs text-softText/70">
            {rec.relationship} · {rec.date}
          </p>
        </div>
      </div>

      <blockquote>
        <p className="text-sm text-[var(--textColor)] leading-relaxed">
          &ldquo;{rec.quote}&rdquo;
        </p>
      </blockquote>

      <a
        href={rec.linkedIn}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto inline-flex items-center gap-1 text-xs text-softText hover:text-[#0077B5] transition-colors"
      >
        <Linkedin className="w-3 h-3" />
        Verified on LinkedIn
        <ArrowUpRight className="w-3 h-3" />
      </a>
    </article>
  );
}

function CTACard() {
  return (
    <article className="rounded-2xl border border-cta/20 bg-cta/5 p-6 flex flex-col gap-4 justify-between">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-cta mb-2">
          Work with me?
        </p>
        <h3 className="text-base font-bold text-[var(--textColor)] leading-snug">
          Leave a recommendation
        </h3>
        <p className="text-sm text-softText mt-2 leading-relaxed">
          If we&apos;ve collaborated on a project or you&apos;ve seen my work
          first-hand, I&apos;d appreciate a brief note. It takes under 2
          minutes.
        </p>
      </div>
      <Link
        href="/testimonial"
        className="inline-flex items-center gap-2 px-5 py-3 bg-cta text-ctaText font-bold rounded-xl text-sm hover:scale-[1.03] active:scale-95 transition-all shadow-lg shadow-cta/20 w-fit"
      >
        Write a recommendation
        <ArrowUpRight className="w-4 h-4" />
      </Link>
    </article>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────

export default function SocialProof() {
  const featuredPeer = PEER_RECOMMENDATIONS.find((r) => r.featured);
  const supportingPeers = PEER_RECOMMENDATIONS.filter((r) => !r.featured);
  const hasMentees = MENTEE_RECOMMENDATIONS.length > 0;

  return (
    <section
      id="social-proof"
      className="py-16 md:py-24 max-w-5xl mx-auto px-6 lg:px-8"
      data-aos="fade-up"
    >
      {/* ── Peer & Collaborator Recommendations ── */}
      <div className="mb-6">
        <span className="text-xs font-bold uppercase tracking-widest text-cta">
          Peer Recommendations
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--textColor)] tracking-tight mt-2">
          What colleagues say
        </h2>
        <p className="text-softText text-base mt-2 max-w-xl">
          Verified LinkedIn recommendations from engineers and designers who
          have shipped products with me.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {featuredPeer && <FeaturedCard rec={featuredPeer} />}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {supportingPeers.map((rec) => (
            <CompactCard key={rec.name} rec={rec} />
          ))}
          <CTACard />
        </div>
      </div>

      {/* ── Mentorship & Teaching ── */}
      {hasMentees && (
        <div className="mt-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-cta/10 flex items-center justify-center flex-shrink-0">
              <GraduationCap className="w-4 h-4 text-cta" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-cta block">
                Mentorship & Teaching
              </span>
              <h3 className="text-2xl md:text-3xl font-extrabold text-[var(--textColor)] tracking-tight mt-0.5">
                From those I&apos;ve coached
              </h3>
            </div>
          </div>
          <p className="text-softText text-base mb-8 max-w-xl">
            Recommendations from engineers and students I&apos;ve mentored
            through code reviews, pair programming, and technical guidance.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MENTEE_RECOMMENDATIONS.map((rec) => (
              <CompactCard key={rec.name} rec={rec} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
