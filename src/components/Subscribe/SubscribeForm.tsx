'use client';

import React from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { subscribeSchema } from '@/app/utils/validations';
import { tailwindToast } from '../Toast/Toast';
import { motion } from 'framer-motion';

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
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="relative flex flex-col gap-3 md:flex-row md:items-stretch md:gap-0">
        <div className="relative flex-1">
          <input
            type="email"
            placeholder="Work email address"
            {...register('email')}
            className={`w-full p-4 rounded-xl md:rounded-r-none bg-white dark:bg-slate-900/90 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 border border-slate-200 dark:border-slate-700/80 focus:border-[#8257e5] dark:focus:border-[#a78bfa] focus:ring-2 focus:ring-[#8257e5]/20 dark:focus:ring-[#a78bfa]/20 transition-all outline-none font-medium text-sm ${
              errors.email
                ? 'border-red-500 focus:border-red-500'
                : ''
            }`}
          />
          {errors.email && (
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -bottom-6 left-2 text-[10px] font-bold uppercase tracking-wider text-red-500"
            >
              {errors.email.message}
            </motion.span>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-8 py-4 bg-cta text-ctaText font-bold rounded-xl md:rounded-l-none hover:bg-cta/90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center gap-2 whitespace-nowrap text-sm tracking-wide shadow-md shadow-cta/20"
        >
          {isSubmitting ? (
            <div className="w-5 h-5 border-2 border-ctaText/30 border-t-ctaText rounded-full animate-spin" />
          ) : (
            'Join Now'
          )}
        </button>
      </div>
    </form>
  )
}
