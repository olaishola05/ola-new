'use client';

import { useEffect, useRef } from 'react';

interface EngagementTrackerProps {
  slug: string;
}

export default function EngagementTracker({ slug }: EngagementTrackerProps) {
  const lastPulseRef = useRef<number>(Date.now());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Reset on mount
    lastPulseRef.current = Date.now();

    const sendPulse = async (duration: number) => {
      try {
        await fetch('/api/analytics/engagement', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            slug,
            type: 'heartbeat',
            duration: Math.round(duration / 1000), // convert to seconds
          }),
        });
      } catch (err) {
        // Silent fail
      }
    };

    // Pulse every 10 seconds
    intervalRef.current = setInterval(() => {
      const now = Date.now();
      const diff = now - lastPulseRef.current;

      // Only send if the window is currently focused (prevent background accumulation)
      if (document.visibilityState === 'visible') {
        sendPulse(diff);
        lastPulseRef.current = now;
      }
    }, 10000);

    // Initial pulse after 5 seconds to ensure "engagement"
    const initialPulse = setTimeout(() => {
      if (document.visibilityState === 'visible') {
        const diff = Date.now() - lastPulseRef.current;
        sendPulse(diff);
        lastPulseRef.current = Date.now();
      }
    }, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      clearTimeout(initialPulse);

      // Send final pulse on unmount
      const finalDiff = Date.now() - lastPulseRef.current;
      if (finalDiff > 1000) {
        // Use sendBeacon for more reliable unmount delivery
        const payload = JSON.stringify({
          slug,
          type: 'heartbeat',
          duration: Math.round(finalDiff / 1000),
        });

        // Check if browser supports beacon
        if (navigator.sendBeacon) {
          navigator.sendBeacon('/api/analytics/engagement', payload);
        } else {
          sendPulse(finalDiff);
        }
      }
    };
  }, [slug]);

  return null; // Invisible component
}

/**
 * Global utility to track interactions
 */
export const trackInteraction = async (slug: string, interactionType: string) => {
  try {
    await fetch('/api/analytics/engagement', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        slug,
        type: 'interaction',
        interactionType,
      }),
    });
  } catch (err) {
    // Silent fail
  }
};
