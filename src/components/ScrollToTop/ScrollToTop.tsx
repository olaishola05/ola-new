'use client';

import React, { useState, useEffect } from 'react';
import { MdOutlineArrowCircleUp as ArrowCircleUpIcon } from 'react-icons/md';
import { animateScroll as scroll } from 'react-scroll';

const ScrollToTop = () => {
  const [showScroll, setShowScroll] = useState(false);
  const [atTop, setAtTop] = useState(true);

  const scrollTop = React.useCallback(() => {
    showScroll ? scroll.scrollToTop() : atTop ? scroll.scrollToBottom() : scroll.scrollToTop();
  }, [atTop, showScroll]);

  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScroll && window.pageYOffset > 400) {
        setShowScroll(true);
        setAtTop(false);
      } else if (showScroll && window.pageYOffset <= 400) {
        setShowScroll(false);
        setAtTop(true);
      }
    };

    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [showScroll]);


  return (
    <div
      className='transition-all duration-300 ease-in-out fixed bottom-8 right-2 lg:right-8 z-10'
    >
      <ArrowCircleUpIcon
        onClick={scrollTop}
        style={{
          display: showScroll ? 'flex' : atTop ? 'flex' : 'none',
          transform: atTop ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.3s ease-in-out',
        }}
        className='transition-all duration-300 ease-in-out w-7 h-7 md:w-12 md:h-12 text-5xl text-[var(--cta)] hover:bg-[var(--primary)] hover:text-[var(--ctaText)] cursor-pointer rounded-full z-10'
      />
    </div>
  );
};

export default ScrollToTop;
