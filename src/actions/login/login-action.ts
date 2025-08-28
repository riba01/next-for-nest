'use server';

import { redirect } from 'next/navigation';
import z from 'zod';
import { createLoginSessionFromApi } from '../../lib/login/manage-login';
import { LoginSchema } from '../../lib/login/schemas';
import { apiRequest } from '../../utils/api-request';
import { asyncDelay } from '../../utils/async-delay';
import { getZodErrorMessages } from '../../utils/get-zod-error-messages';

type LoginActionProps = {
  email: string;
  errors: string[];
};

export async function loginAction(state: LoginActionProps, formData: FormData) {
  const allowLogin = Boolean(Number(process.env.ALLOW_LOGIN));
  if (!allowLogin) {
    return {
      email: '',
      errors: ['Login not allowed'],
    };
  }

  await asyncDelay(2000, true);
  if (!(formData instanceof FormData)) {
    return {
      email: '',
      errors: ['Dados inválidos'],
    };
  }
  //Validar
  const formDataObj = Object.fromEntries(formData.entries());
  const formEmail = formDataObj?.email?.toString() || '';
  const parseFormData = LoginSchema.safeParse(formDataObj);

  if (!parseFormData.success) {
    return {
      email: formEmail,
      errors: getZodErrorMessages(z.treeifyError(parseFormData.error)),
    };
  }

  const createLogin = await apiRequest<{ accessToken: string }>('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(parseFormData.data),
  });
  if (!createLogin.success) {
    return {
      email: formEmail,
      errors: ['Erro ao fazer login, tente novamente'],
    };
  }

  await createLoginSessionFromApi(createLogin.data.accessToken);
  redirect('/admin/post');
}
