'use client';

import React, { useRef, useState, useCallback } from 'react'
import { TfiEye } from 'react-icons/tfi'
import FormBtnStatus from '../Button/form-status-btn'
import * as actions from '@/actions'
import { useFormState } from 'react-dom'
import { passwordTips, PasswordTip } from '@/app/utils/utilities';
import { errorToast } from '../Toast/Toast';

export default function Register() {
  const [formState, action] = useFormState(actions.register, {
    errors: {},
    success: false
  })

  const [criteria, setCriteria] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });

  const passwordRef = useRef<HTMLInputElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const tempState = formState.errors ?? {}
  const [localErrors, setLocalErrors] = useState<Record<string, string | string[]>>({});

  const clearError = useCallback((field: string) => {
    setLocalErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  }, []);

  const handleFocus = () => {
    if (tooltipRef.current) {
      tooltipRef.current.style.display = 'block';
    }
  };

  const handleBlur = () => {
    if (tooltipRef.current) {
      tooltipRef.current.style.display = 'none';
    }
  };

  const handlePasswordChange = () => {
    if (!passwordRef.current) return;

    const value = passwordRef.current.value
    const newCriteria = {
      length: value.length >= 8,
      uppercase: /[A-Z]/.test(value),
      lowercase: /[a-z]/.test(value),
      number: /\d/.test(value),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
    };
    setCriteria(newCriteria);

    if (Object.values(newCriteria).every(Boolean)) {
      formState.errors = tempState;
      formState.errors['password'] = [];
    }
  };

  const handleInputChange = useCallback((field: string) => {
    clearError(field);
  }, [clearError]);

  React.useEffect(() => {
    if (!formState.success && formState?.errors?._form) {
      errorToast(formState.errors._form.join(', '))
    }
  }, [formState.success, formState?.errors?._form])

  React.useEffect(() => {
    if (formState.errors && Object.keys(formState.errors).length > 0) {
      setLocalErrors(formState.errors);
    }
  }, [formState.errors]);

  return (
    <form className='flex flex-col gap-2 w-7/12' action={action}>
      <label htmlFor="name" className='flex flex-col gap-1'>
        Your Name
        <input
          type="text"
          name='name'
          placeholder='John Doe'
          className='border border-gray-200 rounded p-2 focus:outline-none focus:border-black md:p-3 focus:text-textColor'
          onChange={() => handleInputChange('name')}
        />
        {localErrors?.name && <p className='text-red-500 text-sm'>{localErrors.name}</p>}
      </label>
      <label htmlFor="email" className='flex flex-col gap-1'>
        Your Email
        <input
          type="email"
          name='email'
          placeholder='example@gmail.com'
          className='border border-gray-200 rounded p-2 focus:outline-none focus:border-black md:p-3 text-textColor'
          onChange={() => handleInputChange('email')}
        />
        {localErrors?.email && <p className='text-red-500 text-sm'>{localErrors.email}</p>}
      </label>
      <label htmlFor="password" className='flex flex-col gap-1 relative'>
        Password
        <input
          type="password"
          name='password'
          placeholder='********'
          className='border border-gray-200 rounded p-2 focus:outline-none focus:border-black md:p-3'
          ref={passwordRef}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={(e) => {
            handlePasswordChange();
            handleInputChange('password');
          }}
        />
        <TfiEye className='absolute top-10 right-2 text-gray-400' />
        {localErrors?.password && (<ul className='flex flex-col gap-2'>
          {(localErrors.password as string[]).map((error, index) => (
            <li key={index} className='text-red-500 text-sm'>{error}</li>
          ))}
        </ul>)}
      </label>

      <div ref={tooltipRef} style={{ display: "none" }}>
        <p className='text-sm text-textColor'>Password must contain:</p>
        <ul>
          {passwordTips.map((tip: PasswordTip, index) => <li key={index} className='text-sm text-textColor'
            style={{ color: criteria[tip.key as keyof typeof criteria] ? 'green' : 'red' }}
          >{tip.text} {criteria[tip.key as keyof typeof criteria] && <span>✔️</span>}</li>)}
        </ul>
      </div>

      <label htmlFor="confirmPassword" className='flex flex-col gap-1 relative'>
        Confirm Password
        <input
          type="password"
          name='confirmPassword'
          placeholder='********'
          className='border border-gray-200 rounded p-2 focus:outline-none focus:border-black md:p-3'
          onChange={() => handleInputChange('confirmPassword')}
        />
        <TfiEye className='absolute top-10 right-2 text-gray-400' />
        {localErrors?.confirmPassword && <p className='text-red-500 text-sm'>{localErrors.confirmPassword}</p>}
      </label>
      <FormBtnStatus type="submit" classes='bg-blue-600 text-white rounded py-3 md:font-semibold'>Register</FormBtnStatus>
    </form>
  )
}