import React from 'react'
import { IEmailNotification } from '@/app/api/utils'
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
  Tailwind,
  Section,
} from '@react-email/components';


export default function TestimonialNotification({ name, email, message, jobTitle }: IEmailNotification) {
  return (
    <Html lang='en'>
      <Head />
      <Preview>{`New testimonial from ${name}`}</Preview>
      <Body className='text-base text-[#374151] bg-white p-0 m-0' style={main}>
        <Tailwind>
          <div
            className='w-8/12 py-14 px-4 mx-auto my-14'
          >
            <Section
              className='w-11/12 px-5 mx-auto my-14'
            >
              <Heading
                className='font-bold text-2xl text-center'
              >
                New testimonial from {name}
              </Heading>
              <div className='flex items-center justify-between mb-3'>
                <Text className='flex gap-1 items-center text-lg'>
                  <span className='font-bold text-base'>Email:</span> {email}
                </Text>
                <Text
                  className='flex gap-1 items-center text-lg'
                >
                  <span className='font-bold text-base'>Job title:</span> {jobTitle}
                </Text>
              </div>
              <Text
                className='text-lg text-justify'
              >
                {message}
              </Text>
            </Section>
          </div>
        </Tailwind>
      </Body>
    </Html>
  )
}

const main = {
  fontFamily: 'sans-serif',
}