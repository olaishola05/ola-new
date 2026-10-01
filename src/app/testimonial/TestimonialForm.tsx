"use client";

import React from 'react';
import ControlInput from '@/components/Form/ControlInput';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { TestimonialSchema, RELATIONSHIP_OPTIONS } from '../utils';
import toast from 'react-hot-toast';
import { uploadToCloudinary } from '../lib';
import { ArrowUpRight, Linkedin } from 'lucide-react';

const formValidation = yupResolver(TestimonialSchema);

type IFormValues = {
  name: string;
  email: string;
  message: string;
  jobTitle: string;
  photo: string | undefined;
  relationship: string;
  linkedinUrl?: string;
}

const defaultValues: IFormValues = {
  name: '',
  email: '',
  message: '',
  jobTitle: '',
  photo: '',
  relationship: '',
  linkedinUrl: '',
}

const inputClass =
  'p-4 rounded-xl outline-none w-full bg-white dark:bg-slate-900/90 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 border border-slate-200 dark:border-slate-700/80 focus:border-[#8257e5] dark:focus:border-[#a78bfa] focus:ring-2 focus:ring-[#8257e5]/20 dark:focus:ring-[#a78bfa]/20 transition-all duration-300 backdrop-blur-sm font-medium text-base';

export default function TestimonialForm() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    trigger,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IFormValues>({
    mode: 'onBlur',
    defaultValues,
    resolver: formValidation as any,
  });

  const MAX_LENGTH = 200;
  const count = watch('message').length;
  const watchPhoto = watch('photo');

  const onSubmit = async (data: IFormValues) => {
    try {
      const photoUrl = data.photo && (data.photo as any).length > 0
        ? await uploadToCloudinary(data.photo)
        : null;

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/testimonials`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          photo: photoUrl,
          linkedinUrl: data.linkedinUrl?.trim() || null,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        reset();
        toast.success('Thank you! Your recommendation means a lot.', {
          position: 'bottom-left',
          duration: 5000,
        });
      } else {
        toast.error(result?.message || 'An unexpected error occurred. Please try again later.', {
          position: 'bottom-left',
          duration: 5000,
        });
      }
    } catch (error: any) {
      console.error('Error submitting form:', error);
      toast.error(error?.message || 'Something went wrong. Please try again.', {
        position: 'bottom-left',
        duration: 5000,
      });
    }
  };

  return (
    <form
      className='w-full flex flex-col gap-5'
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Name + Job Title */}
      <div className='flex flex-col gap-5 md:flex-row'>
        <div className='w-full flex flex-col gap-1'>
          <label className='text-xs font-semibold uppercase tracking-widest text-softText'>
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
          <label className='text-xs font-semibold uppercase tracking-widest text-softText'>
            Job Title / Role
          </label>
          <ControlInput
            control={control}
            name="jobTitle"
            placeholder="Senior Product Designer"
            inputprops={register('jobTitle')}
            width={'100%'}
            error={errors.jobTitle?.message}
          />
          {errors.jobTitle?.message && (
            <small className='text-red-500 text-xs'>{errors.jobTitle.message}</small>
          )}
        </div>
      </div>

      {/* Email + Relationship */}
      <div className='flex flex-col gap-5 md:flex-row'>
        <div className='w-full flex flex-col gap-1'>
          <label className='text-xs font-semibold uppercase tracking-widest text-softText'>
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

        <div className='w-full flex flex-col gap-1'>
          <label className='text-xs font-semibold uppercase tracking-widest text-softText'>
            How do you know Oladipupo?
          </label>
          <select
            {...register('relationship')}
            className={`${inputClass} ${errors.relationship ? 'border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500 focus:ring-red-500/20' : ''}`}
            defaultValue=""
          >
            <option value="" disabled className="bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400">
              Select relationship…
            </option>
            {RELATIONSHIP_OPTIONS.map((opt) => (
              <option
                key={opt.value}
                value={opt.value}
                className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
              >
                {opt.label}
              </option>
            ))}
          </select>
          {errors.relationship?.message && (
            <small className='text-red-500 text-xs'>{errors.relationship.message}</small>
          )}
        </div>
      </div>

      {/* LinkedIn URL */}
      <div className='w-full flex flex-col gap-1'>
        <label className='text-xs font-semibold uppercase tracking-widest text-softText'>
          <span className='flex items-center gap-1.5'>
            <Linkedin className='w-3.5 h-3.5 text-[#0077B5]' />
            LinkedIn Profile URL{' '}
            <span className='normal-case font-normal text-softText/60'>(optional — helps verify you&apos;re real)</span>
          </span>
        </label>
        <input
          type="url"
          placeholder="https://www.linkedin.com/in/your-handle"
          {...register('linkedinUrl')}
          className={`${inputClass} ${errors.linkedinUrl ? 'border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500 focus:ring-red-500/20' : ''}`}
        />
        {errors.linkedinUrl?.message && (
          <small className='text-red-500 text-xs'>{errors.linkedinUrl.message}</small>
        )}
      </div>

      {/* Photo upload */}
      <div className='w-full flex flex-col gap-1'>
        <label className='text-xs font-semibold uppercase tracking-widest text-softText'>
          Profile Photo{' '}
          <span className='normal-case font-normal text-softText/60'>(optional)</span>
        </label>
        <ControlInput
          control={control}
          name="photo"
          type='file'
          placeholder='photo'
          inputprops={register('photo')}
          width={'100%'}
          error={errors.photo?.message}
          trigger={trigger}
          watchPhoto={!watchPhoto}
        />
        {errors.photo && (
          <small className='text-red-500 text-xs'>{errors.photo.message as string}</small>
        )}
        {!errors.photo && (
          <small className="text-softText/60 text-xs">Max 2 MB · JPG, PNG, WebP</small>
        )}
      </div>

      {/* Message */}
      <div className='w-full flex flex-col gap-1'>
        <div className='flex items-center justify-between'>
          <label className='text-xs font-semibold uppercase tracking-widest text-softText'>
            Your Recommendation
          </label>
          <span className={`text-xs ${count > MAX_LENGTH ? 'text-red-500' : 'text-softText/60'}`}>
            {count} / {MAX_LENGTH}
          </span>
        </div>
        <ControlInput
          control={control}
          name="message"
          type='textarea'
          placeholder="Share a brief professional note about your experience working with Oladipupo — what stood out, what you built together, what you would highlight to a future collaborator or employer."
          inputprops={register('message')}
          width={'100%'}
          error={errors.message?.message}
        />
        {errors.message && (
          <small className='text-red-500 text-xs'>{errors.message.message}</small>
        )}
      </div>

      <button
        type='submit'
        disabled={isSubmitting}
        className='inline-flex items-center justify-center gap-2 w-full md:w-auto md:self-start px-8 py-4 bg-cta text-ctaText font-bold rounded-2xl shadow-lg shadow-cta/20 hover:scale-[1.03] active:scale-95 transition-all text-sm tracking-wide disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 mt-2'
      >
        {isSubmitting ? 'Submitting…' : (
          <>
            Submit Recommendation
            <ArrowUpRight className='w-4 h-4' />
          </>
        )}
      </button>
    </form>
  );
}
