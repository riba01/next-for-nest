'use server';

import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { v7 as uuidV7 } from 'uuid';
import z from 'zod';
import { makePartialPublicPost, PublicPost } from '../../dto/post/dto';
import { requireLoginSessionForApiOrRedirect } from '../../lib/login/manage-login';
import { PostCreateSchema } from '../../lib/post/schemas';
import { PostModel } from '../../models/post/post-model';
import { postRepository } from '../../repositories/post';
import { getZodErrorMessages } from '../../utils/get-zod-error-messages';
import { makeSlugtext } from '../../utils/make-slug-text';

type CreatePostActionProps = {
  formState: PublicPost;
  errors: string[];
  success?: true;
};

export async function createPostAction(
  prevState: CreatePostActionProps,
  formData: FormData,
): Promise<CreatePostActionProps> {
  await requireLoginSessionForApiOrRedirect();

  /* console.log({ prevState });
  console.log(formData); */

  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      errors: ['Dados inválidos'],
    };
  }

  //pagar os dados do formulário
  // entries retorna um interator (método) para cada entries retorna um arrya [chave, valor]

  const formDataObj = Object.fromEntries(formData.entries());

  const zodParsedObj = PostCreateSchema.safeParse(formDataObj);

  if (!zodParsedObj.success) {
    const errors = getZodErrorMessages(z.treeifyError(zodParsedObj.error));
    return {
      formState: makePartialPublicPost(formDataObj),
      errors: errors,
    };
  }

  const validPostData = zodParsedObj.data;

  const newPost: PostModel = {
    ...validPostData,
    id: uuidV7(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    slug: `${makeSlugtext(validPostData.title)}-${uuidV7().split('-')[0]}`,
  };

  //
  try {
    await postRepository.create(newPost);
    //console.log(newPost);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        formState: newPost,
        errors: [error.message],
      };
    }
    return {
      formState: newPost,
      errors: ['Erro desconhecido'],
    };
  }

  revalidateTag('posts');
  //redireciona
  redirect(`/admin/post/${newPost.id}?created=true`);
  /* return {
    formState: newPost,
    errors: [],
  }; */
}
