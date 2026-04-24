"use client";

import { useEffect, useRef } from "react";

export default function PageViewTracker() {
  const hasTracked = useRef(false);

  useEffect(() => {
    // Prevent strict mode double-firing in dev
    if (hasTracked.current) return;
    hasTracked.current = true;

    // Fire and forget, no await needed.
    fetch('/api/analytics/track?type=view', { 
      method: 'POST',
      // keepalive enables the request to outlive the page (great for exit tracking but useful here too)
      keepalive: true 
    }).catch(() => {
      // Silently catch errors so console stays clean if extensions block it
    });
  }, []);

  return null; // Renders nothing, completely invisible element
}
