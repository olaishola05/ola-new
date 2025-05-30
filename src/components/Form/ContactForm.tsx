'use client';

import React from 'react';
import { CustomButton } from '@/components';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import ControlInput from './ControlInput';
import { contactSchema as schema } from '@/app/utils';
import { FormValues } from '@/app/types';
import { toast } from 'react-hot-toast';

const formValidation = yupResolver(schema);

const ContactForm = () => {
  const { register, handleSubmit, control, reset, formState: { errors, isSubmitSuccessful, isSubmitting } } = useForm<FormValues>({
    mode: 'onBlur',
    defaultValues: {
      name: '',
      number: '',
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
    <main data-aos="fade-up" className='w-full flex-2 h-full flex flex-col items-center justify-center md:h-full lg:h-full'>
      <form
        className='m-1 w-full flex flex-col gap-3'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <div className='flex flex-col gap-3 lg:flex-row'>
            <div className='w-full'>
              <ControlInput
                control={control}
                name="name"
                placeholder="e.g John Doe"
                inputprops={register('name')}
                width={'100%'}
                error={errors.name?.message}
              />
              {errors.name?.message && (<small className={errors && 'text-red-700 text-sm'}>{`${errors.name.message}`}</small>)}
            </div>

            <div className='w-full'>
              <ControlInput
                control={control}
                name="number"
                placeholder="e.g +2348012345678"
                inputprops={register('number')}
                width={'100%'}
                error={errors.number?.message}
              />
              {errors.number?.message && (<small className={errors && 'text-red-700 text-sm'}>{`${errors.number.message}`}</small>)}
            </div>
          </div>
        </div>

        <div className='w-full'>
          <ControlInput
            control={control}
            name="email"
            placeholder="e.g youremail@something.com"
            inputprops={register('email')}
            width={'100%'}
            error={errors.email?.message}
          />
          {errors.email?.message && <small className={errors && 'text-red-700 text-sm'}>{`${errors.email.message}`}</small>}
        </div>


        <div className='full'>
          <ControlInput
            control={control}
            name="subject"
            placeholder="e.g I want to hire you"
            inputprops={register('subject')}
            width={'100%'}
            error={errors.subject?.message}
          />
          {errors.subject?.message && <small className={errors && 'text-red-700 text-sm'}>{`${errors.subject.message}`}</small>}
        </div>

        <div className='w-full'>
          <ControlInput
            control={control}
            name="message"
            type='textarea'
            placeholder='Say hello!'
            inputprops={register('message')}
            width={'100%'}
            error={errors.message?.message}
          />
          {errors.message?.message && <small className={errors && 'text-red-700 text-sm'}>{`${errors.message.message}*`}</small>}
        </div>
        <CustomButton
          variant='contained'
          type='submit'
          disabled={isSubmitting}
          size='large'
          className='self-center md:self-center'
        >
          {isSubmitting ? 'Loading' : 'Send'}
        </CustomButton>
      </form>
    </main>
  );
};

export default ContactForm;