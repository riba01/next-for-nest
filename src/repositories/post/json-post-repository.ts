import { PostModel } from '@/models/post/post-model';
import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { PostRepository } from './post-repository';

const ROOT_DIR = process.cwd();
const JSON_POST_FILE_PATH = resolve(
  ROOT_DIR,
  'src',
  'db',
  'seed',
  'posts.json',
);

export class JsonPostRepository implements PostRepository {
  private async readFromDisk(): Promise<PostModel[]> {
    const jsonContent = await readFile(JSON_POST_FILE_PATH, 'utf-8');
    const parsedJson = JSON.parse(jsonContent);
    const { posts } = parsedJson;
    return posts;
  }

  async findAll(): Promise<PostModel[]> {
    const posts = await this.readFromDisk();
    return posts;
  }
  async findAllPublic(): Promise<PostModel[]> {
    const posts = await this.readFromDisk();
    return posts.filter(post => post.published === true);
  }

  async findById(id: string): Promise<PostModel> {
    const posts = await this.findAllPublic();
    const post = posts.find(post => post.id === id);

    if (!post) throw new Error('Post não encontrado nesse ID');

    return post;
  }

  async findBySlugPublic(slug: string): Promise<PostModel> {
    /* await asyncDelay(SIMULATE_WAIT, true); */

    const posts = await this.findAllPublic();
    const post = posts.find(post => post.slug === slug);

    if (!post) throw new Error('Post não encontrado');

    return post;
  }
  async create(post: PostModel): Promise<PostModel> {
    throw new Error(`Post não encontrado nesse ID ${post.id}`);
  }
  async update(
    id: string,
    newPostData: Omit<PostModel, 'id' | 'slug' | 'createdAt' | 'updatedAt'>,
  ): Promise<PostModel> {
    throw new Error(`Post não encontrado nesse ID ${id}, ${newPostData}`);
  }
  async delete(id: string): Promise<PostModel> {
    throw new Error(`Post não encontrado nesse ID ${id}`);
  }
}
