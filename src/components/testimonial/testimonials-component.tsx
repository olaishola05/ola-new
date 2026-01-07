// "use client";

import { Testimonial } from "@prisma/client";
import Carousel from "./Carousel";
import Image from "next/image";

interface TestimonialsComponentProps {
  data: Testimonial[];
}

export default function TestimonialsComponent({ data }: TestimonialsComponentProps) {
  return (
    <div className={`mt-6 lg:mt-12 ${data?.length <= 3 && "flex justify-center"}`}>
      {data.length <= 3 ? (
        <ul className="flex flex-col lg:flex-row gap-6 items-center justify-center">
          {data?.map((item: any, idx: number) => (
            <li
              key={idx}
              className={`bg-[var(--contact)] p-4 rounded-xl border w-[300px] lg:w-[350px]`}
            >
              <figure>
                <div className="flex items-center gap-x-4">
                  {item.photo ? (
                    <Image
                      src={item.photo}
                      width={64}
                      height={64}
                      className="w-16 h-16 rounded-full"
                      alt={item.photo}
                    />
                  ) : (
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[var(--contactText)]">
                      <span className="flex items-center justify-center text-[var(--contact)] text-2xl font-semibold text-center">
                        {item.name
                          .split(" ")
                          .map((word: string[]) => word[0])
                          .join("")
                          .toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div>
                    <span className="block text-[var(--contactText)] font-semibold">
                      {item.name}
                    </span>
                    <span className="block text-[var(--contactText)] text-sm mt-0.5">
                      {item.jobTitle}
                    </span>
                  </div>
                </div>
                <blockquote>
                  <p className="mt-6 text-[var(--contactText)]">{item.message}</p>
                </blockquote>
              </figure>
            </li>
          ))}
        </ul>
      ) : (
        <Carousel data={data} />
      )}
    </div>
  );
}
