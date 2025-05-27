'use server';

import { z } from 'zod';
import prisma from '@/app/lib/prisma';

const subscribeSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type SubscribeResult = {
  subscribed: boolean;
  message?: string;
  error?: string;
};

export async function subscribeToNewsletter(prevState: SubscribeResult, formData: FormData): Promise<SubscribeResult> {

  const email = formData.get('email') as string;
  const result = subscribeSchema.safeParse({ email });

  if (!result.success) {
    return {
      subscribed: false,
      error: result.error.format().email?._errors[0] ?? 'Invalid input',
    };
  }

  const { email: validatedEmail } = result.data;
  try {

    const existingSubscriber = await prisma.subscriber.findUnique({
      where: { email: validatedEmail },
    });

    if (existingSubscriber) {
      return {
        subscribed: false,
        error: 'You are already subscribed to our newsletter.',
      };
    }
    await prisma.subscriber.create({
      data: {
        email: validatedEmail,
      },
    });
    return {
      subscribed: true,
      message: 'Thank you for subscribing! We will notify you when our blog launches.',
    };
  } catch (error) {
    return {
      subscribed: false,
      error: 'Something went wrong. Please try again later.',
    };
  }
}