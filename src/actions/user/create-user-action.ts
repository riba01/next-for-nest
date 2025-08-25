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

  return {
    user: state.user,
    errors: ['Funcionalidade ainda não implementada'],
    success: true,
  };
}
