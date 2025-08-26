'use server';

import {
  CreateUserSchema,
  PublicUserDto,
  PublishUserSchema,
} from '@/lib/user/schemas';
import { z } from 'zod';
import { getZodErrorMessages } from '../../utils/get-zod-error-messages';

type CreateUserActionState = {
  user: PublicUserDto;
  errors: string[];
  success: boolean;
};

export async function createUserAction(
  state: CreateUserActionState,
  formData: FormData,
): Promise<CreateUserActionState> {
  if (!(formData instanceof FormData)) {
    return {
      user: state.user,
      errors: ['Dados inválidos'],
      success: false,
    };
  }

  const formDataObj = Object.fromEntries(formData.entries());
  const parseFormData = CreateUserSchema.safeParse(formDataObj);

  if (!parseFormData.success) {
    return {
      user: PublishUserSchema.parse(formDataObj),
      errors: getZodErrorMessages(z.treeifyError(parseFormData.error)),
      success: false,
    };
  }

  //FETCH PARA CRIAR O USUÁRIO NA API
  const apiURL = process.env.API_URL || 'http://localhost:3001';
  try {
    const response = await fetch(`${apiURL}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parseFormData.data),
    });
    console.log(response);
    if (!response.ok) {
      const data = await response.json();
      return {
        user: PublishUserSchema.parse(formDataObj),
        errors: [data.status, data.statusText || 'Erro ao criar usuário'],
        success: false,
      };
    }

    return {
      user: PublishUserSchema.parse(formDataObj),
      errors: ['Seu usuário foi criado com sucesso!'],
      success: true,
    };
  } catch (e) {
    console.log(e);

    return {
      user: PublishUserSchema.parse(formDataObj),
      errors: ['Falha ao conectar com o servidor. Usuário não foi criado.'],
      success: false,
    };
  }
}
