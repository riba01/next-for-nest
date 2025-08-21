import clsx from 'clsx';
import { useId } from 'react';

type InputTextProps = {
  labelText?: string;
} & React.ComponentProps<'input'>;

export function InputText({ labelText = '', ...props }: InputTextProps) {
  const id = useId();
  return (
    <div className={clsx('flex w-full flex-col gap-1')}>
      {labelText && (
        <label className={clsx('text-sm')} htmlFor={id}>
          {labelText}
        </label>
      )}
      <input
        className={clsx(
          'bg-white outline-0',
          'ring-2 ring-slate-400',
          'rounded px-3 py-1',
          'text-base/tight',
          'focus:ring-blue-600',
          'placeholder-slate-400',
          'placeholder:text-xs',
          'disabled:bg-slate-200 disabled:text-slate-300',
          'read-only:focus:ring-slate-300',
          'read-only:bg-gray-100',
          props.className,
        )}
        {...props}
        id={id}
      />
    </div>
  );
}
