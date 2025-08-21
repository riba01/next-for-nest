'use client';

import clsx from 'clsx';
import Link from 'next/link';

type ErrorMessageProps = {
  pageTitle?: string;
  contentTitle: string;
  contentText: React.ReactNode;
};

export default function ErrorMessage({
  pageTitle = '',
  contentTitle,
  contentText,
}: ErrorMessageProps) {
  return (
    <>
      {pageTitle && <title>{pageTitle}</title>}
      <div
        className={clsx(
          'min-h-[320px] bg-slate-900 text-slate-200 mb-16 p-8 rounded-2xl',
          'flex flex-col justify-center items-center',
          'text-center',
        )}
      >
        <div>
          <h1 className='text-7xl font-extrabold mb-8'>{contentTitle}</h1>
          <p className='text-sm font-normal mb-8 text-slate-400'>
            {contentText}
          </p>
        </div>
        <div className='text-md font-normal'>
          <Link href='/'>Go back to Home</Link>
        </div>
      </div>
    </>
  );
}
