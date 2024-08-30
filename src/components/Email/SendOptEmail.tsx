import React from 'react';
import {
  Body,
  Head,
  Heading,
  Html,
  Preview,
  Text,
  Tailwind,
  Section,
  Img,
  Link
} from '@react-email/components';

export default function SendOptEmail({ name, otp }: { name: string, otp: string }) {
  const firstName = name.split(' ')[0];
  return (
    <Html lang='en'>
      <Head />
      <Preview>Your OTP for verification</Preview>
      <Tailwind>
        <Body className='text-base text-[#374151] bg-white p-0 m-0 container w-[500px] mx-auto'>
          <div className='py-5 flex items-center'>
            <Img
              className='' src={'https://res.cloudinary.com/hebronhq/image/upload/v1703278654/testimonials/qqp0gph5uf7njmnijp3j.png'} alt='logo' width={80} height={80} />
            <Text className='text-lg font-bold'>Tech With Ola</Text>
          </div>
          <Section className='mb-4'>
            <Text className='mb-2 text-lg font-bold'>Hello {firstName},</Text>
            <Text className='font-bold'>Your OTP for verification is {otp}.</Text>
          </Section>
          <Section className='mb-4'>
            <Text className='mb-2'>This is a verification code for your account. Please do not share it with anyone.</Text>
            <Text>If you did not request this code, please ignore this email.</Text>

            <hr className='my-10' />
            <div className='py-5'>
              <div className='flex flex-col-reverse gap-2 mb-3'>
                <p className='flex items-center justify-center text-center gap-1 m-1'>
                  {'Copyright © '}
                  <Link href="https://www.linkedin.com/in/olaishola05/"
                    color="inherit"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Oladipupo Ishola
                  </Link>{' '}
                  {new Date().getFullYear()}
                </p>
              </div>
            </div>
          </Section>
        </Body>
      </Tailwind>
    </Html>
  )
}

const main = {
  fontFamily: 'Inter, sans-serif',
  fontSize: '16px',
  lineHeight: '1.5',
  color: '#374151',
  backgroundColor: '#ffffff',
  padding: '0',
  margin: '0',
}


