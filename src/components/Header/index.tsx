import clsx from 'clsx';
import Link from 'next/link';

export function Header() {
  return (
    <header className={clsx('flex items-center justify-between')}>
      <h1
        className={clsx(
          'py-8 text-4xl/normal font-extrabold',
          'sm:py-10 sm:text-5xl',
          'md:py-10 md:text-6xl',
          'lg:py-12 lg:text-7xl',
        )}
      >
        <Link href='/'>The Blog</Link>
      </h1>
      <div
        className={clsx(
          'flex py-8 text-xs font-bold',
          'sm:py-10',
          'md:py-10',
          'lg:py-12',
        )}
      ></div>
    </header>
  );
}
