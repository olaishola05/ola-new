'use client'

import { useEffect } from 'react';

interface ReadTrackerProps {
  slug: string;
}

const ReadTracker: React.FC<ReadTrackerProps> = ({ slug }) => {
  useEffect(() => {
    const handleRead = async () => {
      await fetch('/api/v1/track-event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ slug, eventType: 'read' }),
      });
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          handleRead();
          observer.disconnect();
        }
      });
    });

    const target = document.querySelector('#post-content');
    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [slug]);

  return null;
};

export default ReadTracker;
