import { cache } from 'react';
import { postRepository } from '../../../repositories/post';

export const findAllPostsAdmin = cache(async () => {
  return await postRepository.findAll();
});

export const findPostByIdAdmin = cache(async (id: string) => {
  return await postRepository.findById(id);
});
