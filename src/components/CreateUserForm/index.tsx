'use client';

import { createUserAction } from '@/actions/user/create-user-action';
import { PublishUserSchema } from '@/lib/user/schemas';
import clsx from 'clsx';
import { UserRoundIcon } from 'lucide-react';
import Link from 'next/link';
import { useActionState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Buttom } from '../Buttom';
import { InputText } from '../InputText';

export function CreateUserForm() {
  const [state, action, isPending] = useActionState(createUserAction, {
    user: PublishUserSchema.parse({}),
    errors: [],
    success: false,
  });

  useEffect(() => {
    toast.dismiss();
    if (state.errors.length > 0) {
      state.errors.forEach(error => toast.error(error));
    }
  }, [state]);

  return (
    <div
      className={clsx(
        'flex items-center justify-center',
        'mx-auto mt-16 mb-32 max-w-sm text-center',
      )}
    >
      <form
        action={action}
        className={clsx('flex flex-1 flex-col gap-6 text-justify')}
      >
        <InputText
          type='text'
          name='name'
          labelText='Nome Completo'
          placeholder='Seu nome completo'
          required
          disabled={isPending}
          defaultValue={state.user.name}
        />
        <InputText
          type='text'
          name='email'
          labelText='Email'
          placeholder='Seu email'
          required
          disabled={isPending}
          defaultValue={state.user.email}
        />
        <InputText
          type='password'
          name='password'
          labelText='Senha'
          placeholder='Sua senha'
          required
          disabled={isPending}
          defaultValue={''}
        />
        <InputText
          type='password'
          name='confirmPassword'
          labelText='Repita a senha'
          placeholder='Repita a senha'
          required
          disabled={isPending}
          defaultValue={''}
        />
        <Buttom disabled={isPending} type='submit' size='lg' className='mt-4'>
          <UserRoundIcon size={16} />
          {isPending ? 'Criando usuário...' : 'Criar conta'}
        </Buttom>

        <p className='text-sm/tight'>
          <Link href={'/login'}>Já tem conta? Entrar</Link>
        </p>
      </form>
    </div>
  );
}
