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


export default function WelcomeEmail({ name }: { name: string }) {
  const firstName = name.split(' ')[0];
  return (
    <Html lang='en'>
      <Head />
      <Preview>Welcome to Tech With Ola</Preview>
      <Tailwind>
        <Body className='text-base text-[#374151] bg-white p-0 m-0 container w-[500px] mx-auto'>
          <div className='py-5 flex items-center'>
            <Img
              className='' src={'https://res.cloudinary.com/hebronhq/image/upload/v1703278654/testimonials/qqp0gph5uf7njmnijp3j.png'} alt='logo' width={80} height={80} />
            <Text className='text-lg font-bold'>Tech With Ola</Text>
          </div>
          <Section className='mb-2'>
            <Text className='mb-2 text-lg font-bold'>Hello {firstName},</Text>
            <Text className='font-bold'>Welcome to Tech With Ola.</Text>
          </Section>
          <Section className='mb-4'>
            <Text className='font-bold'>We are excited to have you on board.</Text>
            <Text>
              Feel free to acquaint yourself with the platform and its features. If you have any questions, please don&apos;t hesitate to reach out to us.
            </Text>

            <Text>
              Here are some resources to get you started:
            </Text>
            <ul className='list-disc list-inside ml-1'>
              <li>
                <Link href={`${process.env.NEXT_PUBLIC_APP_URL}/blog`}>Blogs Homepage</Link>
              </li>
              <li>
                <Link href={`${process.env.NEXT_PUBLIC_APP_URL}/blog/write`}>Create a new post</Link>
              </li>

              <li>
                <Link href={`${process.env.NEXT_PUBLIC_APP_URL}/admin/dashboard/posts`}>View all posts</Link>
              </li>
            </ul>

            <Text>
              We are excited to see and read what you&apos;ll write.
            </Text>
            <Text>
              Best,
            </Text>
            <Text>
              Tech With Ola
            </Text>
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
