import { desc, eq } from 'drizzle-orm';
import { drizzleDb } from '../../db/drizzle';
import { loginTable } from '../../db/drizzle/schema';
import { LoginRepository } from '../../repositories/login/login-repository';
import { asyncDelay } from '../../utils/async-delay';
import { LoginModel } from './login-model';

const simulatewait = Number(process.env.SIMULATE_WAIT) || 0;

export class DrizzleLoginRepository implements LoginRepository {
  async findAll(): Promise<LoginModel[]> {
    await asyncDelay(simulatewait, true);
    /* logColor('findAll', Date.now()); */
    const users = drizzleDb.query.login.findMany({
      orderBy: desc(loginTable.createdAt),
    });

    return users;
  }

  async findById(id: number): Promise<LoginModel> {
    const user = await drizzleDb.query.login.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
    });

    // Se o post não for encontrado, lance um erro.
    if (!user) throw new Error('Post não encontrado');

    // Se o código continuar, o TypeScript sabe que 'post' é do tipo LoginModel.
    return user;
  }
  async findByUser(username: string): Promise<LoginModel> {
    /* await asyncDelay(SIMULATE_WAIT, true); */
    /* logColor('findBySlugPublic', Date.now()); */
    const post = await drizzleDb.query.login.findFirst({
      where: (posts, { eq }) => eq(posts.username, username),
    });

    // Se o post não for encontrado, lance um erro.
    if (!post) throw new Error('Post não encontrado');

    // Se o código continuar, o TypeScript sabe que 'post' é do tipo LoginModel.
    return post;
  }

  async delete(id: number): Promise<LoginModel> {
    const post = await drizzleDb.query.login.findFirst({
      where: (post, { eq }) => eq(post.id, post.id),
    });
    if (!post) {
      throw new Error('Post not found');
    }
    await drizzleDb
      .delete(loginTable)
      .where(eq(loginTable.id, id))
      .limit(1)
      .returning(); // .returning() é necessário para obter os dados deletados

    return post;
  }

  async create(post: LoginModel): Promise<LoginModel> {
    const postExist = await drizzleDb.query.login.findFirst({
      where: (table, { or, eq }) =>
        or(eq(table.id, post.id), eq(table.username, post.username)),
      columns: { id: true },
    });

    if (!!postExist) {
      throw new Error('Post com ID ou Slug já salvos na BD');
    }

    await drizzleDb.insert(loginTable).values(post);
    return post;
  }
  async update(
    id: number,
    newPostData: Omit<
      LoginModel,
      'id' | 'username' | 'createdAt' | 'updatedAt'
    >,
  ): Promise<LoginModel> {
    const loginExist = await drizzleDb.query.login.findFirst({
      where: (post, { eq }) => eq(post.id, id),
    });

    if (!loginExist) {
      throw new Error('Post not found');
    }

    const updatedAt = new Date().toISOString();
    const loginData = {
      passwordHash: newPostData.passwordHash,
      updatedAt: updatedAt,
    };

    await drizzleDb
      .update(loginTable)
      .set(loginData)
      .where(eq(loginTable.id, id));

    return {
      ...loginExist,
      ...loginData,
    };
  }
}

/* (async () => {
  const repo = new DrizzlePostRepository();
  const posts = await repo.findAllPublic();
  posts.forEach(post => console.log(post.slug, post.published));
})(); */
