import prisma from "@/app/lib/prisma";
import TestmmnialCard from "./testimonial-card";

async function fetchTestimonials() {
  return await prisma.testimonial.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export default async function Testimonials() {
  const testimonials = await fetchTestimonials();

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl text-center pt-5 font-bold md:text-4xl">
        Testimonials
      </h1>
      <div className="flex gap-5">
        {testimonials.map((testimonial) => (
          <TestmmnialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>
    </div>
  );
}
