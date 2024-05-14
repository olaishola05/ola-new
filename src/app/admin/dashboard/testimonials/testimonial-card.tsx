"use client";

import Image from "next/image";
import FormButton from "./form-button";
import * as actions from "@/actions";

interface Props {
  testimonial: {
    photo: string;
    name: string;
    jobTitle: string;
    message: string;
    id: string;
    published: boolean;
  };
}

export default function TestimonialCard({ testimonial }: Props) {
  const togglePublishAction = actions.toggleTestimonial.bind(null, {
    id: testimonial.id,
    published: testimonial.published,
  });

  const deleteTestimonialAction = actions.deleteTestimonial.bind(
    null,
    testimonial.id,
  );
  return (
    <div
      key={testimonial.id}
      className="shadow rounded-lg flex flex-col gap-4 p-4"
    >
      <div className="flex gap-2 items-center">
        {testimonial.photo ? (
          <Image
            src={testimonial.photo}
            width={64}
            height={64}
            className="h-16 w-16 rounded-full"
            alt={testimonial.photo}
          />
        ) : (
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[var(--contactText)]">
            <span className="flex items-center justify-center text-[var(--contact)] text-2xl font-semibold text-center">
              {testimonial.name
                .split(" ")
                .map((word) => word[0])
                .join("")
                .toUpperCase()}
            </span>
          </div>
        )}

        <div>
          <span className="block font-semibold">{testimonial.name}</span>
          <span className="block text-sm mt-0.5">{testimonial.jobTitle}</span>
        </div>
      </div>
      <blockquote className="w-80 p-2">
        <p>{testimonial.message}</p>
      </blockquote>

      <div className="flex gap-4 items-center">
        <form action={togglePublishAction}>
          <FormButton color="black">Publish</FormButton>
        </form>
        <form action={deleteTestimonialAction}>
          <FormButton color="red">Delete</FormButton>
        </form>
      </div>
    </div>
  );
}
