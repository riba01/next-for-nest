import { drizzleDb } from '.';
import { JsonPostRepository } from '../../repositories/post/json-post-repository';
import { postsTable } from './schema';

(async () => {
  const jsonPostRepository = new JsonPostRepository();
  const posts = await jsonPostRepository.findAll();
  /*  console.log(posts); */
  try {
    await drizzleDb.delete(postsTable);
    await drizzleDb.insert(postsTable).values(posts);
  } catch (e) {
    console.log('Ocorreu um erro', e);
  }
})();
