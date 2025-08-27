'use server';

import {
  CreateUserSchema,
  PublicUserDto,
  PublishUserSchema,
} from '@/lib/user/schemas';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { apiRequest } from '../../utils/api-request';
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
  const createResponse = await apiRequest<PublicUserDto>('/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(parseFormData.data),
  });

  if (!createResponse.success) {
    return {
      user: PublishUserSchema.parse(formDataObj),
      errors: createResponse.errors || ['Erro ao criar usuário'],
      success: createResponse.success,
    };
  }

  redirect('/login?created=1');
}
