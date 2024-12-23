'use client';

import { useEffect, useRef, useState } from "react";

export function useHighlighted(id: string) {
  const observer = useRef<IntersectionObserver | null>(null);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const handleObserver = (entries: any[]) => {
      entries.forEach((entry) => {
        if (entry?.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    observer.current = new IntersectionObserver(handleObserver, {
      rootMargin: "0% 0% -35% 0px",
    });

    const elements = document.querySelectorAll("h2, h3, h4");
    elements.forEach((elem) => observer.current && observer.current.observe(elem));
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);
  const highlighted = activeId === id;
  return { highlighted, setActiveId };
}