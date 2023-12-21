import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import swr from 'swr'
import { ITestimonial } from '@/app/api/utils';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Testimonials() {
  const { data, error } = swr('/api/v1/testimonials', fetcher);

  // if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  const testimonials = data?.data
  // const testimonials = [
  //   {
  //     photo: "https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg",
  //     name: "Martin escobar",
  //     title: "Founder of meta",
  //     quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et est hendrerit, porta nunc vitae."
  //   },
  //   {
  //     photo: "https://randomuser.me/api/portraits/women/79.jpg",
  //     name: "Angela stian",
  //     title: "Product designer",
  //     quote: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit."
  //   },
  //   {
  //     photo: "https://randomuser.me/api/portraits/men/86.jpg",
  //     name: "Karim ahmed",
  //     title: "DevOp engineer",
  //     quote: "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain."
  //   },
  // ]

  return (
    <section className="py-8 lg:py-24 my-10">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="max-w-xl sm:text-center md:mx-auto">
          <h3 className="text-[var(--textColor)] text-xl font-semibold lg:text-4xl">
            {testimonials.length > 0 ? 'See what others are saying' : ''}
          </h3>
        </div>
        <div className="mt-6 lg:mt-12">
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {
              testimonials.map((item: ITestimonial, idx: any) => (
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
          </ul>
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto px-4 md:px-8 flex flex-col gap-5 items-center justify-center my-14">
        <p className='text-[var(--textColor)] text-base md:text-lg'>Have something to say? Click below to submit a testimonial.</p>
        <Link href='/testimonial' className="w-[200px] h-[45px] px-3 py-5 rounded-full leading-4 tracking-tighter shadow-lg flex items-center justify-center gap-10 text-base md:text-lg text-[var(--ctaText)] bg-[var(--cta)] border border-[var(--primary)] hover:bg-inherit hover:text-[var(--cta)] hover:border hover:border-[var(--cta)]">Submit a testimonial</Link>
      </div>
    </section>
  )
}
