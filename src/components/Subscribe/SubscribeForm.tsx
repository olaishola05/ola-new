'use client';

import React from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { subscribeSchema } from '@/app/utils/validations';
import { tailwindToast } from '../Toast/Toast';

const schema = yupResolver(subscribeSchema)
interface ISubscribe {
  email: string
}

export default function SubscribeForm() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ISubscribe>({
    mode: 'onBlur',
    defaultValues: {
      email: '',
    },
    resolver: schema,
  })

  const onSubmit = async (data: ISubscribe) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/newsletter`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!res.ok) {
      console.log(res)
      tailwindToast('error', res.statusText)
    }
    if (res.ok) {
      console.log(res)
      tailwindToast('success', 'Thank you for subscribing to my newsletter!')
      reset()
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 w-full md:flex-row'>
      <label htmlFor="email" className='flex flex-col gap-1 w-full'>
        <input type="email" placeholder="Enter your email" {...register('email')} className={`p-3 rounded-md bg-primary outline-none bg-white`} style={errors.email && { border: '1px solid red' }} />
        {errors.email && <span className={errors && 'text-sm text-ctaText'}>{errors.email.message}</span>}
      </label>
      <button type="submit" className='flex max-w-max py-3 px-5 text-ctaText bg-cta rounded-lg self-center md:self-start border border-ctaText hover:bg-inherit hover:text-cta hover:border hover:border-cta disabled:bg-gray-500' disabled={isSubmitting}>Subscribe</button>
    </form>
  )
}
