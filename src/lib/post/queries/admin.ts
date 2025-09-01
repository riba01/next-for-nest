import { PostModelFromApi } from '@/models/post/post-model';
import { postRepository } from '@/repositories/post';
import { authenticatedApiRequest } from '@/utils/authenticated-api-request';
import { cache } from 'react';

export const findAllPostsAdmin = cache(async () => {
  return await postRepository.findAll();
});

export const findPostByIdAdmin = cache(async (id: string) => {
  return await postRepository.findById(id);
});

export const findPostByIdApiAdmin = cache(async (id: string) => {
  const postResponse = await authenticatedApiRequest<PostModelFromApi>(
    `/post/me/${id}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    },
  );

  return postResponse;
});

export const findAllPostsApiAdmin = cache(async () => {
  const postsResponse = await authenticatedApiRequest<PostModelFromApi[]>(
    '/post/me',
    {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    },
  );

  return postsResponse;
});
