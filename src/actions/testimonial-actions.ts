import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export async function toggleTestimonial({
  id,
  published,
}: {
  id: string;
  published: boolean;
}) {
  await prisma.testimonial.update({
    data: {
      published: {
        set: !published,
      },
    },
    where: {
      id,
    },
  });
  revalidatePath("/admin/dashboard/testimonials");
  revalidatePath("/");
}

export async function deleteTestimonial(id: string) {
  await prisma.testimonial.delete({
    where: {
      id,
    },
  });
  revalidatePath("/admin/dashboard/testimonials");
  revalidatePath("/");
}
