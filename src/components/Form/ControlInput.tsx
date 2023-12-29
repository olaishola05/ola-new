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
              className='p-3 rounded-md outline-none bg-white focus:bg-[var(--cta)] text-black focus:text-[var(--formText)] border-[var(--primary)] border-[1px] focus:border-solid focus:border-[var(--textColor)]'
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
                className='p-2 rounded-md outline-none bg-white focus:bg-[var(--cta)] text-black focus:text-[var(--formText)] border-[var(--primary)] border-[1px] focus:border-solid focus:border-[var(--textColor)]'
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
              className={`w-[${width} || 100%] p-3 rounded-md outline-none bg-white focus:bg-[var(--cta)] text-black focus:text-[var(--formText)] border-[var(--primary)] border-[1px] focus:border-solid focus:border-[var(--textColor)]`}
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
