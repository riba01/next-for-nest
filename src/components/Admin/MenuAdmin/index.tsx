'use client';

import clsx from 'clsx';
import {
  CircleXIcon,
  FilePlus2Icon,
  FileTextIcon,
  HouseIcon,
  LogOutIcon,
  MenuIcon,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import { logoutAction } from '../../../actions/login/logout-action';

export function MenuAdmin() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);
  // console.log(pathname);

  const navClasses = clsx(
    'flex flex-col mb-8',
    'bg-slate-900 text-slate-100',
    'rounded-lg',
    'xs:flex-row xs:flex-wrap',
    !isOpen && 'h-10',
    !isOpen && 'overflow-hidden',
    'xs:overflow-auto xs:h-auto',

    //'h-10',
  );
  const linkClasses = clsx(
    'flex items-center justify-start gap-1 p-1 rounded-lg',
    'text-sm font-bold cursor-pointer',
    'hover:bg-slate-700 transition',
    'h-10',
    'shrink-0',
  );

  const openCloseMenu = clsx(linkClasses, 'text-blue-200 xs:hidden');

  function handleLogout(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    e.preventDefault();
    startTransition(async () => {
      await logoutAction();
    });
  }
  return (
    <nav className={navClasses}>
      <button className={openCloseMenu} onClick={() => setIsOpen(s => !s)}>
        {!isOpen && (
          <>
            <MenuIcon />
          </>
        )}
        {isOpen && (
          <>
            <CircleXIcon />
          </>
        )}
      </button>
      <Link
        className={linkClasses}
        href={'/'}
        target='_blank noopener noreferrer'
      >
        <HouseIcon size={20} /> Home
      </Link>
      <Link className={linkClasses} href={'/admin/post'} target={'_self'}>
        <FileTextIcon /> Posts
      </Link>
      <Link className={linkClasses} href={'/admin/post/new'} target={'_self'}>
        <FilePlus2Icon /> New Post
      </Link>
      <Link
        className={linkClasses}
        href={'#'}
        target={'_self'}
        onClick={handleLogout}
      >
        {!isPending && (
          <>
            <LogOutIcon /> Sair
          </>
        )}
      </Link>
    </nav>
  );
}
