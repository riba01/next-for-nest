'use server';
import { revalidateTag } from 'next/cache';
import { requireLoginSessionRedirect } from '../../lib/login/manage-login';
import { postRepository } from '../../repositories/post';

export async function DeletePostAction(id: string) {
  //TODO: checar se o usuário tem permissap para deletar o post
  //Redireciono diretamente
  await requireLoginSessionRedirect();

  const postId = id;

  if (!postId || typeof postId !== 'string') {
    return {
      error: 'Invalid post ID',
    };
  }
  let post;
  try {
    post = await postRepository.delete(postId);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: [error.message],
      };
    }
    return {
      errors: ['Erro desconhecido'],
    };
  }

  revalidateTag('posts');
  revalidateTag(`post-${post.slug}`);

  return {
    error: '',
  };
}
