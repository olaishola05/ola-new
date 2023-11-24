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
    <div className='h-full border border-b-[var(--textColor)] border-t-[var(--textColorDark)] md:border-none md:w-full md:h-[400px] md:flex md:justify-center md:items-center mt-8'>
      <h1>
        <blockquote className='text-xl p-5 text-[var(--textColor)] md:w-[80%] md:mx-auto md:py-5 md:px-1 lg:p-5 lg:text-6xl md:text-4xl font-medium text-center'>
          <p>
            <strong>“</strong>
            <em>
              {quote?.quote || 'The best way to predict the future is to create it.'}
            </em>
            <strong>”</strong>

            <br />
            <br />
            <em>
              - {quote?.author || 'Abraham Lincoln'}
            </em>
          </p>
        </blockquote>
      </h1>
    </div>
  )
}
