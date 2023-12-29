import { ITestimonial } from '@/app/api/utils'
import React from 'react'
import Image from 'next/image'

interface ITestimonialProps {
  item: ITestimonial
  idx: number
  slide: number
  itemsPerSlide: number
}

export default function Testimonial({ item, idx, slide, itemsPerSlide }: ITestimonialProps) {
  return (
    <li key={idx} className={`bg-[var(--contact)] p-4 rounded-xl border ${idx >= slide && idx < slide + itemsPerSlide ? "block" : "hidden"}`
    }>
      <figure>
        <div className="flex items-center gap-x-4">
          {item.photo ? <Image src={item.photo} width={64} height={64} className="w-16 h-16 rounded-full" alt={item.photo} /> : <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[var(--contactText)]">
            <span className="flex items-center justify-center text-[var(--contact)] text-2xl font-semibold text-center">{item.name.split(" ").map((word) => word[0]).join("").toUpperCase()}</span>
          </div>}
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
  )
}
