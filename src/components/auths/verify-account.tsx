'use client';

import React, { useState, useRef } from 'react'
import './verify.css'
import FormBtnStatus from '../Button/form-status-btn';
import { useFormState } from 'react-dom'
import * as actions from '@/actions'
import { useRouter } from 'next/navigation';

interface VerifyAccountProps {
  data: {
    email: string;
    id: string;
  }
}

export default function VerifyAccount({ data }: VerifyAccountProps) {
  const router = useRouter()
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { email, id } = data;
  const [formState, action] = useFormState(actions.verifyOtp.bind(null, id, otp), {
    success: false,
    message: '' || undefined
  })

  const handleChange = (element: any, index: number) => {
    if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, i) => (i === index ? element.value : d))]);
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      const newOtp = [...otp];
      if (newOtp[index]) {
        newOtp[index] = '';
      } else if (index > 0) {
        newOtp[index - 1] = '';
        const prevInput = (e.target as HTMLInputElement).previousElementSibling as HTMLInputElement;
        if (prevInput) prevInput.focus();
      }
      setOtp(newOtp);
    } else if (e.key === 'Delete') {
      e.preventDefault();
      const newOtp = [...otp];
      if (newOtp[index]) {
        newOtp[index] = '';
      } else if (index < otp.length - 1) {
        newOtp[index + 1] = '';
        ((e.target as HTMLInputElement).nextElementSibling as HTMLInputElement)?.focus();
      }
      setOtp(newOtp);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    const newOtp = [...otp];
    pastedData.split('').forEach((char, index) => {
      if (index < 6 && /^\d$/.test(char)) {
        newOtp[index] = char;
        if (inputRefs.current[index]) inputRefs.current[index]!.value = char;
      }
    });
    setOtp(newOtp);
    inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
  };

  React.useEffect(() => {
    if (formState.success) {
      const redirectTimer = setTimeout(() => {
        router.push('/auths/signin');
      }, 5000);
      return () => clearTimeout(redirectTimer);
    }
  }, [formState.success, router]);

  React.useEffect(() => {
    if (formState.success) {
      setOtp(new Array(6).fill(''));
    }
  }, [formState.success]);

  return (
    <div className='py-36'>
      {formState.success === false && <div className='text-center text-lg font-semibold text-red-500'>{formState.message}</div>}
      <h2 className='text-center text-2xl md:text-5xl mb-4 text-textColor'>Verify Your Account</h2>
      {formState.success && <div className='text-center text-2xl text-green-500'>{formState.message}</div>}
      {formState.success === false && <p className='text-center text-textColor'>We emailed you the six digit code to {email} <br /> Enter the code below to confirm your email address.</p>}
      <form className="code-container" action={action}>
        <div className='flex w-full items-center justify-center'>
          {otp.map((digit, index) => (
            <input
              key={index}
              type="number"
              className="code"
              maxLength={1}
              min={0}
              max={9}
              value={digit}
              placeholder='0'
              name={`digit-${index}`}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onChange={(e) => handleChange(e.target, index)}
              onFocus={(e) => e.target.select()}
              onPaste={handlePaste}
              ref={(el) => (inputRefs.current[index] = el)}
              required
              autoFocus={index === 0}
            />
          ))}
        </div>
        <FormBtnStatus
          type='submit'
          classes='p-3 mt-8 transparent text-white rounded-md border font-semibold bg-cta'
        >
          Verify Account
        </FormBtnStatus>
      </form>
    </div>
  )
}
