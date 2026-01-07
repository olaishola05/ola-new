// import React from "react";
// import Link from "next/link";
// import prisma from "@/app/lib/prisma";
// import TestimonialsComponent from "./testimonials-component";

// export async function fetcher() {
//   const testimonials = await prisma.testimonial.findMany({
//     where: {
//       published: true,
//     },
//   });

//   return testimonials || [];
// }

// export async function Testimonials() {
//   const data = await fetcher();

//   if (!data) return <div>loading...</div>;

//   return (
//     <section className="py-8 lg:py-24 my-10">
//       <div className="max-w-screen-xl mx-auto px-4 md:px-8">
//         <div className="max-w-xl sm:text-center md:mx-auto">
//           <h3 className="text-[var(--textColor)] text-xl font-semibold lg:text-4xl">
//             {data?.length > 0 ? "See what others are saying" : ""}
//           </h3>
//         </div>
//         <TestimonialsComponent data={data} />
//       </div>
//       <div className="max-w-screen-xl mx-auto px-4 md:px-8 flex flex-col gap-5 items-center justify-center my-14">
//         <p className="text-[var(--textColor)] text-base md:text-lg">
//           Have something to say? Click below to submit a testimonial.
//         </p>
//         <Link
//           href="/testimonial"
//           className="w-[200px] h-[45px] px-3 py-5 rounded-full leading-4 tracking-tighter shadow-lg flex items-center justify-center gap-10 text-base md:text-lg text-[var(--ctaText)] bg-[var(--cta)] border border-[var(--primary)] hover:bg-inherit hover:text-[var(--cta)] hover:border hover:border-[var(--cta)]"
//         >
//           Submit a testimonial
//         </Link>
//       </div>
//     </section>
//   );
// }
