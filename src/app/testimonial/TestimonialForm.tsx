"use client";

import React from 'react'
import { CustomButton } from '@/components';
import ControlInput from '@/components/Form/ControlInput';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { TestimonialSchema } from '../utils';
import toast from 'react-hot-toast';
import { uploadToCloudinary } from '../lib';

const formValidation = yupResolver(TestimonialSchema);

type IFormValues = {
  name: string
  email: string
  message: string
  jobTitle: string
  photo: string | undefined
}

const defualtValues: IFormValues = {
  name: '',
  email: '',
  message: '',
  jobTitle: '',
  photo: '',
}

export default function TestimonialForm() {
  const { register, handleSubmit, control, watch, trigger, reset, formState: { errors, isSubmitting } } = useForm<IFormValues>({
    mode: 'onBlur',
    defaultValues: defualtValues,
    resolver: formValidation as any,
  });
  const count = watch('message').length;
  const watchPhoto = watch('photo');

  const onSubmit = async (data: IFormValues) => {
    try {
      const photoUrl = await uploadToCloudinary(data.photo);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/testimonials`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, photo: photoUrl })
      });
      const result = await response.json();
      if (response.ok && result?.status === 'success') {
        reset();
        toast.success('Thank you for your feedback. I appreciate you.', {
          position: 'bottom-left',
          duration: 5000,
        });
      } else {
        toast.error(result?.message, {
          position: 'bottom-left',
          duration: 5000,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form
      className='w-full flex flex-col gap-3 mt-3 md:w-8/12 mx-auto py-4 px-4 md:px-8 md:py-8'
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
              name="jobTitle"
              placeholder="e.g Product Design"
              inputprops={register('jobTitle')}
              width={'100%'}
              error={errors.jobTitle?.message}
            />
            {errors.jobTitle?.message && (<small className={errors && 'text-red-700 text-sm'}>{`${errors.jobTitle.message}`}</small>)}
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-3 lg:flex-row'>
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
        <div className='w-full'>
          <ControlInput control={control} name="photo" type='file' placeholder='photo' inputprops={register('photo')} width={'100%'} error={errors.photo?.message} trigger={trigger}
            watchPhoto={!watchPhoto}
          />

          {errors.photo && <small className={errors && 'text-red-700 text-sm'}>{`${errors.photo.message}`}</small>}
          {!errors.photo && <small className="text-[textColor] text-sm">Maximum file size: 2 MB</small>}
        </div>
      </div>

      <div className='w-full'>
        <ControlInput
          control={control}
          name="message"
          type='textarea'
          placeholder='Kindly, leave a professional testimonial about your experience working with me.'
          inputprops={register('message')}
          width={'100%'}
          error={errors.message?.message}
        />
        {count > 100 && <small className={errors && 'text-red-700 text-sm mr-3'}>{`Word count: ${count}.`}</small>}
        {errors.message && <small className={errors && 'text-red-700 text-sm'}>{`${errors.message.message}*`}</small>}
        {!errors.message?.message && count <= 100 && <small className="text-[textColor] text-sm">{`Word count: ${count}, Max 100 words`}</small>}
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
  )
}
