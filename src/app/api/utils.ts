import { NextResponse } from "next/server"
import { Resend } from 'resend';
import EmailTemplate from '@/components/Email/email-template';
import ThankYouEmail from "@/components/Email/ThankYouEmail";
import TestimonialNotification from "@/components/Email/Notification";
import SendOptEmail from "@/components/Email/SendOptEmail";
import WelcomeEmail from "@/components/Email/WelcomeEmail";

export const responseReturn =
  (status: number, message: any, statusText: string, data?: any, error?: any) => {
    return NextResponse.json({
      status: statusText,
      message: message,
      data: data,
      error: error
    }, {
      status: status,
      headers: { "Content-Type": "application/json" },
    })
  }

export const blogResponse = (status: number, message: string, data?: unknown) => {
  return new NextResponse(JSON.stringify({
    status,
    message,
    data,
  }))
}

export const errorResponse = (status: number, message: string, error?: unknown) => {
  return new NextResponse(JSON.stringify({
    status,
    message,
    error
  }))
}

const resend = new Resend(process.env.RESEND_API_KEY);
export interface Contact {
  name: string;
  email: string;
  number: string;
  subject: string;
  message: string;
}

export interface ITestimonial {
  name: string;
  email: string;
  message: string;
  photo: string;
  jobTitle: string;
}

export interface IEmailNotification {
  name: string;
  email: string;
  message: string;
  jobTitle: string;
}

export interface IEmailThankYou {
  name: string;
  email: string;
  message: string;
}

const fromEmail = process.env.RESEND_FROM_EMAIL!;
const publicEmail = process.env.NEXT_PUBLIC_EMAIL!
export async function sendEmail({ name, email, number, subject, message }: Contact) {

  const options = {
    from: fromEmail,
    to: publicEmail,
    subject: `New message from ${name} via your website`,
    react: EmailTemplate({ name, email, number, subject, message }),
  };
  const { data, error } = await resend.emails.send(options);

  return { data, error };
}

export async function sendTestimonialNotificationEmail({ name, email, message, jobTitle }: IEmailNotification) {

  const options = {
    from: fromEmail,
    to: publicEmail,
    subject: `New message from ${name} via your website`,
    react: TestimonialNotification({ name, email, message, jobTitle })
  };
  const { data, error } = await resend.emails.send(options);

  return { data, error };
}

export async function sendTestimonialThankYouEmail({ name, email }: IEmailThankYou) {

  const options = {
    from: fromEmail,
    to: email,
    subject: `Thank You for Your Testimonial ${name.split(' ')[0]}`,
    react: ThankYouEmail({ name })
  };
  const { data, error } = await resend.emails.send(options);

  return { data, error };
}

export async function sendOtpMessage({ name, email, otp }: { name: string, email: string, otp: string }) {
  const opts = {
    from: fromEmail,
    to: email,
    subject: 'Complete Your Registration',
    react: SendOptEmail({ name, otp })
  }
  const { data, error } = await resend.emails.send(opts)
  return { data, error }
}

export async function sendWelcomeEmail({ name, email }: { name: string, email: string }) {
  const options = {
    from: fromEmail,
    to: email,
    subject: 'Welcome to Tech With Ola',
    react: WelcomeEmail({ name })
  }
  const { data, error } = await resend.emails.send(options)
  return { data, error }
}