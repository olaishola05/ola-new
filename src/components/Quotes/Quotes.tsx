import React from 'react'
import { getMotivationalQuote } from '@/app/utils/data';

export default function Quotes() {
  const [quote, setQuote] = React.useState({} as any)

  React.useEffect(() => {
    const interval = setInterval(() => {
      const quote = getMotivationalQuote()
      setQuote(quote)
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className='w-full max-w-4xl mx-auto my-16 px-6'
      data-aos="fade-up"
    >
      <div className='relative flex flex-col items-center text-center p-10 md:p-16 bg-softBg/30 border border-softBg/30 rounded-3xl backdrop-blur-sm shadow-xl overflow-hidden'>
        {/* Decorative Quote Icon Background */}
        <div className="absolute top-4 left-6 md:top-8 md:left-10 text-[8rem] md:text-[12rem] leading-none font-serif text-cta/5 select-none pointer-events-none">
          &quot;
        </div>

        <span className="text-xs font-bold uppercase tracking-widest text-cta mb-8 relative z-10">Quote of the Day</span>

        <blockquote
          key={quote?.quote || 'default'}
          className='relative z-10 animate-fade-in flex flex-col items-center gap-6'
        >
          <p className="text-xl md:text-3xl lg:text-4xl font-medium text-[var(--textColor)] leading-relaxed italic mx-auto max-w-3xl">
            &quot;{quote?.quote || 'The best way to predict the future is to create it.'}&quot;
          </p>

          <footer className="text-base md:text-lg font-bold text-cta tracking-wide uppercase">
            — {quote?.author || 'Abraham Lincoln'}
          </footer>
        </blockquote>
      </div>
    </div>
  )
}
