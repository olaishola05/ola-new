import { NextRequest } from 'next/server'
import { responseReturn, ITestimonial } from '../../utils';
import prisma from '@/app/lib/prisma';

export async function POST(req: NextRequest) {
  const { name, email, message, photo, jobTitle }: ITestimonial = await req.json()
  try {
    const checkEmail = await prisma.testimonial.findUnique({
      where: { email }
    });

    if (checkEmail) {
      return responseReturn(400, 'Thanks for your interest, but you have already submitted a testimonial', 'Email already exist', null, 'bad request');
    }

    const createTestimonial = await prisma.testimonial.create({
      data: {
        name,
        email,
        message,
        photo,
        jobTitle
      }
    });
    return responseReturn(200, {
      message: 'Email sent successfully',
      data: createTestimonial
    }, 'success');
  } catch (error: any) {
    console.log(error);
    return responseReturn(500, 'Oops! Something happened!', 'error', null, error?.message);
  }
}

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: [
        { createdAt: 'desc' },
        { updatedAt: 'desc' }
      ],
      // where: {
      //   published: true
      // },
    });
    return responseReturn(200, 'Testimonials fetched successfully', 'success', testimonials);
  } catch (error: any) {
    return responseReturn(500, 'Oops! Something happened!', 'error', null, error?.message);
  }
}