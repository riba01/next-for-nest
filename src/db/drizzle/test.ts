import { drizzleDb } from '.';
import { postsTable } from './schema';

(async () => {
  const posts = await drizzleDb.select().from(postsTable);
  posts.forEach(post => {
    console.log(post.title);
  });
  //console.log(posts);
})();
