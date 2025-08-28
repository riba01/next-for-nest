'use client';
import clsx from 'clsx';
import { LogInIcon } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import { useActionState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { loginAction } from '../../../actions/login/login-action';
import { Buttom } from '../../../components/Buttom';
import { InputText } from '../../../components/InputText';

export const metadata: Metadata = {
  title: 'Login Admin',
};

export default function LoginForm() {
  const initialState = {
    email: '',
    errors: [],
  };
  const [state, action, isPending] = useActionState(loginAction, initialState);
  useEffect(() => {
    if (state.errors.length > 0) {
      state.errors.forEach(error => toast.error(error));
    }
  }, [state]);
  return (
    <div
      className={clsx(
        'mx-auto flex flex-col items-center justify-center',
        'm-2 max-w-sm rounded-2xl p-4',
        'border-2 border-slate-400',
      )}
    >
      <h1 className='text-3xl'>Login</h1>
      <form action={action}>
        <div className='mx-auto my-10 flex max-w-sm flex-col items-center gap-4'>
          <InputText
            labelText='Email'
            name='email'
            placeholder='Digite seu email'
            type='email'
            disabled={isPending}
            required
          />
          <InputText
            labelText='Senha'
            type='password'
            name='password'
            placeholder='Digite sua senha'
            disabled={isPending}
            required
          />
          <div className='flex'>
            <Buttom
              type='submit'
              className='mt-4'
              size='md'
              disabled={isPending}
            >
              <LogInIcon />
              Entrar
            </Buttom>
          </div>
          <p className='my-4 text-sm/tight'>
            <Link href={'/user/new'}>Criar minha conta</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
