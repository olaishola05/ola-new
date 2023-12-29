import TestimonialNotification from '@/components/Email/Notification'
import ThankYouEmail from '@/components/Email/ThankYouEmail'
import React from 'react'

export default function page() {
  const data = {
    name: 'Adrian',
    email: 'adrian@mails.com',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam bibendum ullamcorper tortor, et tincidunt turpis interdum eu. Proin congue orci at auctor iaculis. Pellentesque congue nunc vitae posuere imperdiet. Quisque.',
    jobTitle: 'Developer'
  }


  return (
    <div>page
      <TestimonialNotification {...data} />
    </div>
  )
}
