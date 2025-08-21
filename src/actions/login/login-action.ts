'use server';

import { redirect } from 'next/navigation';
import {
  createLoginSession,
  verifyPassword,
} from '../../lib/login/manage-login';
import { loginRepository } from '../../models/login';
import { asyncDelay } from '../../utils/async-delay';

type LoginActionProps = {
  username: string;
  error: string;
};

export async function loginAction(state: LoginActionProps, formData: FormData) {
  const allowLogin = Boolean(Number(process.env.ALLOW_LOGIN));
  if (!allowLogin) {
    return {
      username: '',
      error: 'Login not allowed',
    };
  }

  await asyncDelay(2000, true);
  if (!(formData instanceof FormData)) {
    return {
      username: '',
      error: 'Dados inválidos',
    };
  }

  const username = formData.get('username')?.toString() || '';
  const password = formData.get('password')?.toString() || '';

  if (!username || !password) {
    return {
      username: username,
      error: 'Informe seu usuário e senha',
    };
  }
  //Aqui eu checo se o usuário existe na base de dados
  /*   const isUserNameValid = username === process.env.LOGIN_USER; */
  const isUserNameValid = await loginRepository
    .findByUser(username)
    .catch(() => undefined);

  /*  console.log(isUserNameValid?.username); */

  if (!isUserNameValid) {
    return {
      username: username,
      error: 'Ficou aqui',
    };
  }

  const hashPassword = isUserNameValid.passwordHash;

  if (!hashPassword || typeof hashPassword !== 'string') {
    throw new Error('Hash da senha não está definido!');
  }

  /*  console.log(hashPassword); */

  const isPasswordValid = await verifyPassword(password, hashPassword);

  if (!isPasswordValid) {
    return {
      username: username,
      error: 'Error ao logar',
    };
  }

  await createLoginSession(username);
  redirect('/admin/post');
}
