import React from 'react'
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

export default function ThankYouEmail({ name }: { name: string }) {
  return (
    <Html lang='en'>
      <Head />
      <Preview>{`Thank You for Your Testimonial ${name || 'Sender'}`}</Preview>
      <Body className='text-base text-[#374151] bg-white p-0 m-0' style={main}>
        <Tailwind>
          <div
            className='w-full py-10 px-4 mx-auto my-14'
          >
            <Section
              className='w-11/12 px-5 mx-auto my-14'
            >
              <Img
                className='mx-auto mb-5' src={'https://res.cloudinary.com/hebronhq/image/upload/v1703278654/testimonials/qqp0gph5uf7njmnijp3j.png'} alt='logo' width={80} height={80} />
              <div>
                <Heading className='font-bold text-lg text-left'>
                  Dear {name || 'Sender'},
                </Heading>

                <Text
                  className='text-lg text-justify'
                >
                  I hope this message finds you well. I wanted to reach out to express my sincerest gratitude for taking the time to provide a testimonial for me. Your support and kind words mean a lot, and I am truly humbled by your gesture.
                  <br />
                  <br />
                  I have just been notified of your testimonial, and I am genuinely looking forward to reading it. Your feedback is incredibly valuable to me, and I am honored to have your support in my professional endeavors.
                  <br />
                  <br />
                  I cannot thank you enough for your willingness to endorse me, and I am grateful for the opportunity to have you as a part of my professional network.
                  <br />
                  <br />
                  I value your opinion and look forward to the opportunity to continue our professional relationship in the future. Thank you once again for your time and your kind words.
                  <br />
                  <br />
                  Warm regards,
                  <br />
                  Oladipupo Ishola.
                </Text>
              </div>
              <hr className='my-10' />
              <div className='py-5'>
                <div className='flex flex-col-reverse gap-2 mb-3'>
                  <p className='flex items-center justify-center text-center gap-1 m-1'>
                    {'Copyright © '}
                    <Link href="https://github.com/olaishola05"
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
          </div>
        </Tailwind>
      </Body>
    </Html>
  )
}

const main = {
  fontFamily: 'sans-serif',
}