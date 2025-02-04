'use client'

import React, { useState, useCallback } from 'react';
import { MdEmail } from 'react-icons/md'
import { HiLockClosed } from 'react-icons/hi'
import Link from 'next/link'
import LoginButton from '@/components/auths/LoginButton'
import { errorToast } from '@/components/Toast/Toast';
import { loginSchema } from "@/app/utils/auth.validation";
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface ILocalErrors {
  errors?: {
    email?: string[];
    password?: string[];
    _form?: string[];
  };
  pending?: boolean;
}

interface IData {
  email: string;
  password: string;
}

export default function Signin({ from }: { from: string }) {
  const [localErrors, setLocalErrors] = useState<ILocalErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(!isSubmitting)
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {} as IData;
    data['email'] = formData.get('email') as string || '';
    data['password'] = formData.get('password') as string || '';

    const result = loginSchema.safeParse(data);
    if (!result.success) {
      setLocalErrors({ errors: result.error.flatten().fieldErrors });
      setIsSubmitting(false)
      return;
    }

    const { email, password } = result.data;
    const res = await signIn('credentials',
      {
        redirect: false,
        email,
        password,
        callbackUrl: from || '/'
      });
    if (res?.error) {
      setIsSubmitting(false);
      setLocalErrors(prevErrors => ({
        ...prevErrors,
        errors: {
          ...prevErrors.errors,
          _form: [res.error || '']
        }
      }));
    } else {
      router.push(from || '/')
    }
  }

  React.useEffect(() => {
    if (localErrors?.errors?._form) {
      errorToast(Array.isArray(localErrors.errors._form)
        ? localErrors.errors._form.join(', ')
        : localErrors.errors._form);
    }
  }, [localErrors?.errors?._form])

  const clearError = useCallback((field: string) => {
    setLocalErrors(prev => {
      const newErrors = { ...prev };
      if (newErrors.errors) {
        delete newErrors.errors[field as keyof typeof newErrors.errors];
        if ((field === 'email' || field === 'password') && newErrors.errors) {
          delete newErrors.errors._form;
        }
      }
      return newErrors;
    });
  }, []);

  return (
    <div>
      <section className='my-16 mx-auto h-full w-full py-10 px-2 gap-8 flex flex-col items-center md:my-15 md:h-4/5 rounded-lg md:gap-10 md:py-20'>
        <h1 className='text-2xl font-bold text-blue-500 md:text-4xl'>Tech With Ola</h1>
        <div className='w-full bg-transparent px-2 py-5 rounded-sm md:w-[450px] md:px-5 md:py-7 md:rounded-md'>
          <h2 className='text-center text-lg text-[#36537F] dark:text-blue-500 font-semibold mb-1 md:text-2xl'>Welcome Back</h2>
          <p className='text-xs text-center text-gray-500 dark:text-white mb-6 md:text-sm'>Enter your credentials to access your account</p>
          <form className='w-full flex flex-col gap-5' onSubmit={handleSubmit}>
            <div className='w-full flex flex-col gap-3 relative rounded-sm'>
              <MdEmail className='absolute text-blue-400 top-4 left-1' />
              <input type="email" name='email' placeholder="Email" className='w-full py-3 pl-7 rounded-sm text-textColor bg-bg dark:border'
                onChange={() => clearError('email')}
              />
              {localErrors?.errors?.email && <p className='text-red-500 text-sm'>{localErrors.errors.email}</p>}
            </div>
            <div className='w-full flex flex-col gap-3 relative rounded-sm'>
              <HiLockClosed className='absolute text-blue-400 top-4 left-1' />
              <input type="password" name='password' placeholder="Password" className='w-full py-3 pl-7 rounded-sm text-textColor bg-softBg dark:border'
                onChange={() => clearError('password')}
              />
              {localErrors?.errors?.password && <ul className='text-red-500 text-sm flex flex-col gap-1 pl-7'>
                {Array.isArray(localErrors.errors.password)
                  ? localErrors.errors.password.map((error, index) => <li className='list-disc' key={index}>{error}</li>)
                  : localErrors.errors.password}
              </ul>}
            </div>
            <button type="submit"
              className='w-44 p-3 mx-auto rounded-md bg-blue-500 
              text-white hover:text-blue-400 hover:bg-white hover:border 
              hover:border-blue-500 mt-2 md:w-11/12'
              disabled={isSubmitting}
            >{isSubmitting ? 'Signing in...' : 'Sign In'}</button>
          </form>
        </div>
        <div className='w-full flex flex-col items-center justify-center gap-2'>
          <div className='flex gap-4 items-center w-max my-1 mx-auto md:w-11/12 md:justify-center md:text-center md:items-center'>
            <hr className='w-34 text-[#D6DDEC] md:w-36' />
            <span className='md:text-lg self-center'>or</span>
            <hr className='w-34 text-[#D6DDEC] md:w-36' />
          </div>
          <LoginButton from={from} />
          <p className='text-center text-gray-500 text-sm md:text-base'>{"Don't"} have an account? <Link href="/auths/register" className='text-blue-500 pl-2'>Sign Up</Link></p>
        </div>
      </section>
    </div>
  )
}
