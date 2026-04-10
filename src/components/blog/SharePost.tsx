'use client';

import React, { useState } from 'react';
import { Twitter, Linkedin, Facebook, Link as LinkIcon, Check, Share2 } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/config';

interface SharePostProps {
  title: string;
  slug: string;
}

export default function SharePost({ title, slug }: SharePostProps) {
  const [copied, setCopied] = useState(false);
  
  const url = `${SITE_CONFIG.siteUrl}/blog/posts/${slug}`;
  const text = `Check out this article: ${title}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      
      // Track interaction if you want to know how many people clicked copy link
      import("@/components/Analytic/EngagementTracker").then(m => {
        m.trackInteraction(slug, 'share_copy_link');
      });
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
        import("@/components/Analytic/EngagementTracker").then(m => {
          m.trackInteraction(slug, 'share_device_native');
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-12 pt-8 border-t border-softBg">
      <span className="text-sm font-bold uppercase tracking-widest text-cta">Share this post</span>
      <div className="flex items-center gap-3">
        {typeof navigator !== 'undefined' && typeof navigator.share === 'function' && (
          <button
            onClick={handleNativeShare}
            className="p-2.5 rounded-full bg-softBg text-textColor hover:bg-cta hover:text-ctaText transition-all hover:scale-105 shadow-sm"
            aria-label="Share via device"
          >
            <Share2 className="w-5 h-5" />
          </button>
        )}
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-full bg-softBg text-textColor hover:bg-[#1DA1F2] hover:text-white transition-all hover:scale-105 shadow-sm"
          aria-label="Share on Twitter"
        >
          <Twitter className="w-5 h-5" />
        </a>
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-full bg-softBg text-textColor hover:bg-[#0A66C2] hover:text-white transition-all hover:scale-105 shadow-sm"
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="w-5 h-5" />
        </a>
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-full bg-softBg text-textColor hover:bg-[#1877F2] hover:text-white transition-all hover:scale-105 shadow-sm"
          aria-label="Share on Facebook"
        >
          <Facebook className="w-5 h-5" />
        </a>
        <button
          onClick={handleCopy}
          className="p-2.5 rounded-full bg-softBg text-textColor hover:bg-cta hover:text-ctaText transition-all hover:scale-105 shadow-sm"
          aria-label="Copy link"
        >
          {copied ? <Check className="w-5 h-5 text-green-500" /> : <LinkIcon className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}
