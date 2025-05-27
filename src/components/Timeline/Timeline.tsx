'use client'

import React, { useContext } from 'react';
import { Chrono } from 'react-chrono';
import { ThemeContext } from '@/app/config/ThemeContext';

interface TimelineItem {
  title?: string;
  cardTitle: string;
  cardSubtitle?: string;
  cardDetailedText: string | Array<string>;
  cardText?: string;
  items?: any;
}

interface TimelineProps {
  items: TimelineItem[];
  mode?: 'HORIZONTAL' | 'VERTICAL' | 'VERTICAL_ALTERNATING';
}

const Timeline: React.FC<TimelineProps> = ({ items, mode }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className='w-full md:w-[90%] my-0 md:mx-auto'>
      <Chrono
        items={items.map((item) => ({
          title: '',
          cardTitle: item.cardTitle,
          cardSubtitle: item.cardSubtitle,
          cardDetailedText: item.cardDetailedText,
          items: item.items,
        }))}
        mode={mode}
        slideShow
        slideItemDuration={4500}
        slideShowType="reveal"
        scrollable={{ scrollbar: true }}
        enableOutline={false}
        enableBreakPoint={true}
        verticalBreakPoint={400}
        hideControls={true}
        theme={{
          primary: `${theme === 'dark' ? 'black' : 'var(--primary)'}`,
          secondary: `${theme === 'dark' ? 'black' : 'var(--primary)'}`,
          cardBgColor: `${theme === 'dark' ? 'white' : 'var(--bg)'}`,
          cardSubtitleColor: `${theme === 'dark' ? 'black' : 'var(--primary)'}`,
          cardTitleColor: `${theme === 'dark' ? 'black' : 'var(--primary)'}`,
          titleColor: `${theme === 'dark' ? 'black' : 'var(--primary)'}`,
          titleColorActive: `${theme === 'dark' ? 'black' : 'var(--primary)'}`,
          nestedCardBgColor: `${theme === 'dark' ? 'white' : 'var(--bg)'}`,
          detailsColor: `${theme === 'dark' ? 'white' : 'black'}`,
        }}
        cardWidth={700}
        useReadMore={true}
        borderLessCards={true}
        activeItemIndex={0}
        nestedCardHeight={200}
        fontSizes={{
          cardSubtitle: '1rem',
          cardText: '1rem',
          cardTitle: '1.1rem',
          title: '1rem',
        }}
      />
    </div>
  );
};

export default Timeline;
