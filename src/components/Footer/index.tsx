import { LogInIcon } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className='itens-center flex justify-center gap-2 py-8 text-sm text-gray-500'>
      <p className='text-center font-light'>
        <span>
          Copyright &copy; {new Date().getFullYear()} - All rights
          reserved.{' '}
        </span>
        <Link href={'/'}>The Blog - </Link>
      </p>
      <Link href={'/admin/login'} className='flex items-center gap-2'>
        Admin <LogInIcon size={14} />
      </Link>
    </footer>
  );
}
