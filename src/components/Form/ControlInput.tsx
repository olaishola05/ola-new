'use client';

import React, { ChangeEvent } from 'react';
import { Controller } from 'react-hook-form';

interface Props {
  name: string;
  control: any;
  width?: any;
  placeholder?: string;
  type?: string;
  inputprops?: any;
  size?: any;
  error?: string;
  required?: boolean;
  trigger?: any
  watchPhoto?: any
}

const ControlInput: React.FC<Props> = ({
  name,
  required,
  control,
  width,
  placeholder,
  error,
  type,
  trigger,
  ...otherProps
}: Props) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: required || true }}
      render={({ field: { onChange, onBlur, value }, fieldState, formState }) => (
        <>
          {type === 'textarea' ? (
            <textarea
              style={{ width, border: error && '1px solid red' }}
              className='p-4 rounded-xl outline-none w-full bg-softBg/10 dark:bg-softBg/20 text-[var(--textColor)] border border-softBg/30 focus:border-cta/50 focus:ring-2 focus:ring-cta/20 transition-all duration-300 backdrop-blur-sm placeholder-softText/70 resize-none font-medium text-base'
              placeholder={placeholder}
              onChange={onChange}
              onBlur={onBlur}
              value={value as string}
              {...otherProps}
              rows={8}
              cols={5}
            />
          ) : type === 'file' ? (
            <>
              <input
                type="file"
                style={{ width, border: error && otherProps.watchPhoto && '1px solid red' }}
                className='file:cursor-pointer p-4 rounded-xl outline-none w-full bg-softBg/10 dark:bg-softBg/20 text-[var(--textColor)] border border-softBg/30 focus:border-cta/50 focus:ring-2 focus:ring-cta/20 transition-all duration-300 backdrop-blur-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cta/10 file:text-cta hover:file:bg-cta/20'
                placeholder={placeholder}
                accept="image/*"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  trigger(name)
                  if (e.target.files && e.target.files.length > 0) {
                    onChange(e.target.files);
                  }
                }}
                onBlur={onBlur}
                {...otherProps}
              />
            </>
          ) : (
            <input
              id="outlined-basic"
              style={{ width, border: error && '1px solid red' }}
              placeholder={placeholder}
              className={`w-[${width} || 100%] p-4 rounded-xl outline-none bg-softBg/10 dark:bg-softBg/20 text-[var(--textColor)] border border-softBg/30 focus:border-cta/50 focus:ring-2 focus:ring-cta/20 transition-all duration-300 backdrop-blur-sm placeholder-softText/70 font-medium text-base`}
              onChange={onChange}
              onBlur={onBlur}
              value={value as string}
              {...otherProps}
            />
          )}
        </>
      )}
    />
  );
};

export default ControlInput;
