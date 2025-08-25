import { z } from 'zod';

const CreateUserBase = z.object({
  name: z.coerce.string().trim().min(4, 'Nome deve ter no mínimo 4 caracteres'),
  email: z.email({ message: 'Email inválido' }).trim(),
  password: z
    .string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .refine(password => /[a-z]/.test(password), {
      message: 'A senha deve conter pelo menos uma letra minúscula.',
    })
    .refine(password => /[A-Z]/.test(password), {
      message: 'A senha deve conter pelo menos uma letra maiúscula.',
    })
    .refine(password => /\d/.test(password), {
      message: 'A senha deve conter pelo menos um número.',
    })
    .refine(password => /[\W_]/.test(password), {
      message: 'A senha deve conter pelo menos um símbolo.',
    }),
  confirmPassword: z.string().min(6, 'Senha deve ter no mínimo 6'),
});
export const CreateUserSchema = CreateUserBase.refine(
  data => data.password === data.confirmPassword,
  {
    path: ['confirmPassword'],
    message: 'As senhas não conferem',
  },
).transform(({ name, email, password }) => {
  // Transformar os dados para retornar apenas os campos necessários
  // Não precisar retornar o campo confirmPassword
  return { name, email, password };
});

export const PublishUserSchema = z.object({
  id: z.string().default(''),
  name: z.string().default(''),
  email: z.string().default(''),
});

export const UpdatePasswordSchema = z
  .object({
    currentPass: z
      .string()
      .trim()
      .min(6, 'Senha atual deve ter no mínimo 6 caracteres'),
    newPassword: z
      .string()
      .min(6, 'A senha deve ter no mínimo 6 caracteres')
      .refine(password => /[a-z]/.test(password), {
        message: 'A senha deve conter pelo menos uma letra minúscula.',
      })
      .refine(password => /[A-Z]/.test(password), {
        message: 'A senha deve conter pelo menos uma letra maiúscula.',
      })
      .refine(password => /\d/.test(password), {
        message: 'A senha deve conter pelo menos um número.',
      })
      .refine(password => /[\W_]/.test(password), {
        message: 'A senha deve conter pelo menos um símbolo.',
      }),
    confirmNewPassword: z.string().min(6, 'Senha deve ter no mínimo 6'),
  })
  .refine(
    data => {
      return data.newPassword === data.confirmNewPassword;
    },
    {
      path: ['confirmNewPassword'],
      message: 'As senhas não conferem',
    },
  )
  .transform(({ currentPass, newPassword }) => {
    return { currentPass, newPassword };
  });

export const UpdateUserSchema = CreateUserBase.omit({
  password: true,
  confirmPassword: true,
}).extend({});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
export type PublicUserDto = z.infer<typeof PublishUserSchema>;
export type UpdatePasswordDto = z.infer<typeof UpdatePasswordSchema>;
export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
