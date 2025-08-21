import clsx from 'clsx';
import React, { forwardRef, useId } from 'react';

type InputCheckboxProps = {
  labelText?: string;
  id?: string;
} & Omit<React.ComponentProps<'input'>, 'type' | 'id'>;

export const InputCheckbox = forwardRef<HTMLInputElement, InputCheckboxProps>(
  ({ labelText = '', id, ...props }, ref) => {
    const autoId = useId();
    const inputId = id ?? autoId;

    return (
      <div className='flex items-center gap-2'>
        <label className='inline-flex cursor-pointer items-center'>
          <input
            {...props}
            ref={ref}
            id={inputId}
            type='checkbox'
            className='peer sr-only'
          />
          <span
            className={clsx(
              'flex h-5 w-5 items-center justify-center rounded border-2 border-gray-400 transition-all',
              'peer-checked:border-blue-600 peer-checked:bg-blue-600',
              'peer-focus:ring-2 peer-focus:ring-blue-500',
              'after:mb-0.5 after:ml-0.5 after:block',
              'after:h-1.5 after:w-2.5 after:rotate-[-45deg]',
              'after:border-b-2 after:border-l-2 after:border-white',
              'after:opacity-0 after:transition-all after:content-[""]',
              'peer-checked:after:opacity-100',
            )}
          />
          {labelText && (
            <span className='ml-2 text-sm select-none'>{labelText}</span>
          )}
        </label>
      </div>
    );
  },
);

InputCheckbox.displayName = 'InputCheckbox';
