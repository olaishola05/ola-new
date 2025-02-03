import TestimonialNotification from '@/components/Email/Notification'
import ThankYouEmail from '@/components/Email/ThankYouEmail'
import React from 'react'
import SendOptEmail from '@/components/Email/SendOptEmail'
import WelcomeEmail from '@/components/Email/WelcomeEmail'

export default function page() {
  const data = {
    name: 'Adrian',
    email: 'adrian@mails.com',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam bibendum ullamcorper tortor, et tincidunt turpis interdum eu. Proin congue orci at auctor iaculis. Pellentesque congue nunc vitae posuere imperdiet. Quisque.',
    jobTitle: 'Developer'
  }


  return (
    <div>page
      {/* <TestimonialNotification {...data} /> */}
      {/* <SendOptEmail name='Adrian Moses' otp='123456' /> */}
      <WelcomeEmail name='Adrian Moses' />

    </div>
  )
}
