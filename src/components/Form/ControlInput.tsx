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
  trigger?: any;
  watchPhoto?: any;
}

const baseInputClass =
  'p-4 rounded-xl outline-none w-full bg-white dark:bg-slate-900/90 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all duration-300 backdrop-blur-sm font-medium text-base';

const normalBorder =
  'border border-slate-200 dark:border-slate-700/80 focus:border-[#8257e5] dark:focus:border-[#a78bfa] focus:ring-2 focus:ring-[#8257e5]/20 dark:focus:ring-[#a78bfa]/20';

const errorBorder =
  'border border-red-500 dark:border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20';

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
      render={({ field: { onChange, onBlur, value } }) => (
        <>
          {type === 'textarea' ? (
            <textarea
              style={{ width: width || '100%' }}
              className={`${baseInputClass} ${error ? errorBorder : normalBorder} resize-none`}
              placeholder={placeholder}
              onChange={onChange}
              onBlur={onBlur}
              value={(value as string) || ''}
              {...otherProps}
              rows={6}
              cols={5}
            />
          ) : type === 'file' ? (
            <input
              type="file"
              style={{ width: width || '100%' }}
              className={`p-3 rounded-xl outline-none w-full bg-white dark:bg-slate-900/90 text-slate-700 dark:text-slate-300 transition-all duration-300 backdrop-blur-sm font-medium text-sm ${
                error && otherProps.watchPhoto ? errorBorder : normalBorder
              } file:cursor-pointer file:mr-4 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-[#8257e5] file:text-white hover:file:bg-[#7042db] dark:file:bg-[#8257e5] dark:file:text-white dark:hover:file:bg-[#9067f5] file:transition-colors`}
              placeholder={placeholder}
              accept="image/*"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                trigger && trigger(name);
                if (e.target.files && e.target.files.length > 0) {
                  onChange(e.target.files);
                }
              }}
              onBlur={onBlur}
              {...otherProps}
            />
          ) : (
            <input
              id={`input-${name}`}
              style={{ width: width || '100%' }}
              placeholder={placeholder}
              className={`${baseInputClass} ${error ? errorBorder : normalBorder}`}
              onChange={onChange}
              onBlur={onBlur}
              value={(value as string) || ''}
              {...otherProps}
            />
          )}
        </>
      )}
    />
  );
};

export default ControlInput;
