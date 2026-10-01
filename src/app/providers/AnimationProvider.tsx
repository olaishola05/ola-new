'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// AOS is lazily imported after hydration — keeps it out of the critical JS bundle
// and prevents it from blocking First Contentful Paint
function useAOS() {
  React.useEffect(() => {
    let cleanup: (() => void) | undefined;
    import('aos').then(({ default: AOS }) => {
      import('aos/dist/aos.css' as any);
      AOS.init({
        once: true,       // only animate once — avoids re-triggering on scroll back
        delay: 50,
        duration: 800,
        easing: 'ease-out-cubic',
      });
      cleanup = () => AOS.refresh();
    });
    return () => cleanup?.();
  }, []);
}

const variantProps = {
  pageInitial: { opacity: 0 },
  pageAnimate: { opacity: 1, transition: { duration: 0.25 } },
  pageExit: { opacity: 0, transition: { duration: 0.15 } },
};

export default function AnimationProvider({ children }: { children: React.ReactNode }) {
  useAOS();

  return (
    <AnimatePresence onExitComplete={() => window.scrollTo(0, 0)}>
      <motion.div
        initial="pageInitial"
        animate="pageAnimate"
        exit="pageExit"
        variants={variantProps}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
