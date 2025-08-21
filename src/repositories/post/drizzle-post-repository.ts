import { PostModel } from '@/models/post/post-model';
import { desc, eq } from 'drizzle-orm';
import { drizzleDb } from '../../db/drizzle';
import { postsTable } from '../../db/drizzle/schema';
import { asyncDelay } from '../../utils/async-delay';
import { PostRepository } from './post-repository';

const simulatewait = Number(process.env.SIMULATE_WAIT) || 0;

export class DrizzlePostRepository implements PostRepository {
  async findAll(): Promise<PostModel[]> {
    await asyncDelay(simulatewait, true);
    /* logColor('findAll', Date.now()); */
    const posts = drizzleDb.query.posts.findMany({
      orderBy: desc(postsTable.createdAt),
    });

    return posts;
  }
  async findAllPublic(): Promise<PostModel[]> {
    /* await asyncDelay(SIMULATE_WAIT, true); */
    /* logColor('findAllPublic', Date.now()); */
    const posts = drizzleDb.query.posts.findMany({
      orderBy: desc(postsTable.createdAt),
      where: (posts, { eq }) => eq(posts.published, true),
    });

    return posts;
  }
  async findById(id: string): Promise<PostModel> {
    const post = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
    });

    // Se o post não for encontrado, lance um erro.
    if (!post) throw new Error('Post não encontrado');

    // Se o código continuar, o TypeScript sabe que 'post' é do tipo PostModel.
    return post;
  }
  async findBySlugPublic(slug: string): Promise<PostModel> {
    /* await asyncDelay(SIMULATE_WAIT, true); */
    /* logColor('findBySlugPublic', Date.now()); */
    const post = await drizzleDb.query.posts.findFirst({
      where: (posts, { and, eq }) =>
        and(eq(posts.published, true), eq(posts.slug, slug)),
    });

    // Se o post não for encontrado, lance um erro.
    if (!post) throw new Error('Post não encontrado');

    // Se o código continuar, o TypeScript sabe que 'post' é do tipo PostModel.
    return post;
  }

  async delete(id: string): Promise<PostModel> {
    const post = await drizzleDb.query.posts.findFirst({
      where: (post, { eq }) => eq(post.id, post.id),
    });
    if (!post) {
      throw new Error('Post not found');
    }
    await drizzleDb
      .delete(postsTable)
      .where(eq(postsTable.id, id))
      .limit(1)
      .returning(); // .returning() é necessário para obter os dados deletados

    return post;
  }

  async create(post: PostModel): Promise<PostModel> {
    const postExist = await drizzleDb.query.posts.findFirst({
      where: (table, { or, eq }) =>
        or(eq(table.id, post.id), eq(table.slug, post.slug)),
      columns: { id: true },
    });

    if (!!postExist) {
      throw new Error('Post com ID ou Slug já salvos na BD');
    }

    await drizzleDb.insert(postsTable).values(post);
    return post;
  }
  async update(
    id: string,
    newPostData: Omit<PostModel, 'id' | 'slug' | 'createdAt' | 'updatedAt'>,
  ): Promise<PostModel> {
    const postExist = await drizzleDb.query.posts.findFirst({
      where: (post, { eq }) => eq(post.id, post.id),
    });

    if (!postExist) {
      throw new Error('Post not found');
    }

    const updatedAt = new Date().toISOString();
    const postData = {
      author: newPostData.author,
      content: newPostData.content,
      coverImageUrl: newPostData.coverImageUrl,
      excerpt: newPostData.excerpt,
      published: newPostData.published,
      title: newPostData.title,
      updatedAt: updatedAt,
    };

    await drizzleDb
      .update(postsTable)
      .set(postData)
      .where(eq(postsTable.id, id));

    return {
      ...postExist,
      ...postData,
    };
  }
}

/* (async () => {
  const repo = new DrizzlePostRepository();
  const posts = await repo.findAllPublic();
  posts.forEach(post => console.log(post.slug, post.published));
})(); */
