import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.email({ message: 'E-mail inválido' }).trim(),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres').trim(),
});
