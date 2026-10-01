'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import ControlInput from './ControlInput';
import { contactSchema as schema } from '@/app/utils';
import { FormValues } from '@/app/types';
import { toast } from 'react-hot-toast';
import { ArrowUpRight } from 'lucide-react';

const formValidation = yupResolver(schema);

const ContactForm = () => {
  const { register, handleSubmit, control, reset, formState: { errors, isSubmitSuccessful, isSubmitting } } = useForm<FormValues>({
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    resolver: formValidation,
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      if (response.ok && result?.status === 'success') {
        toast.success('Thank you! I will get back to you shortly.', {
          duration: 5000,
          position: 'bottom-left',
          className: 'w-full h-12 flex items-center justify-center bg-green-500 text-white',
        });
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong. Please try again later.', {
        duration: 5000,
        position: 'bottom-left',
        className: 'w-full h-12 flex items-center justify-center bg-red-500 text-white',
      });
    }
  };

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <form
      className='w-full flex flex-col gap-5'
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Name + Email — side by side on md+ */}
      <div className='flex flex-col gap-5 md:flex-row'>
        <div className='w-full flex flex-col gap-1'>
          <label htmlFor='name' className='text-xs font-semibold uppercase tracking-widest text-softText'>
            Full Name
          </label>
          <ControlInput
            control={control}
            name="name"
            placeholder="Adeola Martins"
            inputprops={register('name')}
            width={'100%'}
            error={errors.name?.message}
          />
          {errors.name?.message && (
            <small className='text-red-500 text-xs'>{errors.name.message}</small>
          )}
        </div>

        <div className='w-full flex flex-col gap-1'>
          <label htmlFor='email' className='text-xs font-semibold uppercase tracking-widest text-softText'>
            Email Address
          </label>
          <ControlInput
            control={control}
            name="email"
            placeholder="you@example.com"
            inputprops={register('email')}
            width={'100%'}
            error={errors.email?.message}
          />
          {errors.email?.message && (
            <small className='text-red-500 text-xs'>{errors.email.message}</small>
          )}
        </div>
      </div>

      {/* Subject */}
      <div className='w-full flex flex-col gap-1'>
        <label htmlFor='subject' className='text-xs font-semibold uppercase tracking-widest text-softText'>
          Subject
        </label>
        <ControlInput
          control={control}
          name="subject"
          placeholder="Project inquiry / collaboration / consulting"
          inputprops={register('subject')}
          width={'100%'}
          error={errors.subject?.message}
        />
        {errors.subject?.message && (
          <small className='text-red-500 text-xs'>{errors.subject.message}</small>
        )}
      </div>

      {/* Message */}
      <div className='w-full flex flex-col gap-1'>
        <label htmlFor='message' className='text-xs font-semibold uppercase tracking-widest text-softText'>
          Message
        </label>
        <ControlInput
          control={control}
          name="message"
          type='textarea'
          placeholder='Tell me about your project, timeline, or what you need help with.'
          inputprops={register('message')}
          width={'100%'}
          error={errors.message?.message}
        />
        {errors.message?.message && (
          <small className='text-red-500 text-xs'>{`${errors.message.message}`}</small>
        )}
      </div>

      <button
        type='submit'
        disabled={isSubmitting}
        className='inline-flex items-center justify-center gap-2 w-full md:w-auto md:self-start px-8 py-4 bg-cta text-ctaText font-bold rounded-2xl shadow-lg shadow-cta/20 hover:scale-[1.03] active:scale-95 transition-all text-sm tracking-wide disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 mt-2'
      >
        {isSubmitting ? 'Sending…' : (
          <>
            Send Direct Message
            <ArrowUpRight className='w-4 h-4' />
          </>
        )}
      </button>
    </form>
  );
};

export default ContactForm;