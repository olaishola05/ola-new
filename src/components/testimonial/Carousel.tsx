import { ITestimonial } from '@/app/api/utils';
import React from 'react'
import Slider from 'react-slick'
import Image from 'next/image'

interface ICarouselProps {
  data: ITestimonial[]
}

export default function Carousel({ data }: ICarouselProps) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };

  return (
    <Slider {...settings}>
      {/* <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"> */}
      {
        data?.map((item: ITestimonial, idx: any) => (
          <li key={idx} className="bg-[var(--contact)] p-4 rounded-xl">
            <figure>
              <div className="flex items-center gap-x-4">
                <Image src={item.photo || 'AD'} width={64} height={64} className="w-16 h-16 rounded-full" alt={item.photo} />
                <div>
                  <span className="block text-[var(--contactText)] font-semibold">{item.name}</span>
                  <span className="block text-[var(--contactText)] text-sm mt-0.5">{item.jobTitle}</span>
                </div>
              </div>
              <blockquote>
                <p className="mt-6 text-[var(--contactText)]">
                  {item.message}
                </p>
              </blockquote>
            </figure>
          </li>
        ))
      }
      {/* </ul> */}
    </Slider>
  )
}
