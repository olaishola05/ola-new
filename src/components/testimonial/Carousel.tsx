import React, { useState, useEffect } from 'react';
import { ITestimonial } from '@/app/api/utils';
import Testimonial from './Testimonial';

interface ICarouselProps {
  data: ITestimonial[];
}

export default function Carousel({ data }: ICarouselProps) {
  const itemsPerSlide = 3;
  const [activeIndex, setActiveIndex] = useState(0);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((activeIndex + 1) % data.length);
      setSlide((slide + 1) % data.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [activeIndex, slide]);

  return (
    <ul className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3`}>
      {data?.map((item: ITestimonial, idx: number) => (
        <Testimonial key={idx} item={item} idx={idx} slide={slide} itemsPerSlide={itemsPerSlide} />
      ))}
    </ul>
  );
}
