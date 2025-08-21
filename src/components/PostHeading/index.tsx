import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

export type PostHeadingProps = {
  children: React.ReactNode;
  url: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
};

export function PostHeading({
  children,
  url,
  as: Tag = 'h2',
}: PostHeadingProps) {
  const baseClass = {
    h1: 'text-2xl/tight font-extrabold text-[#003F5C] sm:text-4xl',
    h2: 'text-xl/tight font-bold text-[#003F5C] sm:text-2xl',
    h3: 'text-lg/tight font-bold text-[#003F5C] sm:text-2xl',
    h4: 'text-md/tight font-bold text-[#003F5C] sm:text-xl',
    h5: 'text-sm/tight font-bold text-[#003F5C] sm:text-lg',
    h6: 'text-sm/tight font-bold text-[#003F5C] sm:text-md',
  };
  return (
    <Tag className={clsx(baseClass[Tag])}>
      <Link className='group-hover:text-slate-600' href={url}>
        {children}
      </Link>
    </Tag>
  );
}
