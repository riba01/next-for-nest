import Image from 'next/image';
import { findPublicPostBySlugCached } from '../../lib/post/queries/public';
import { PostDate } from '../PostDate';
import { PostHeading } from '../PostHeading';
import { SafeMarkdown } from '../SafeMarkdown';

type SinglePostProps = {
  slug: string;
};

export async function SinglePost({ slug }: SinglePostProps) {
  const post = await findPublicPostBySlugCached(slug);
  const postLink = `/post/${post.slug}`;

  return (
    <article>
      <header className='group flex flex-col gap-4 mb-4'>
        <Image
          width={1200}
          height={720}
          src={post.coverImageUrl}
          alt={post.title}
          className='w-full h-auto mb-4 rounded-2xl'
        />
        <PostHeading url={postLink}>{post.title}</PostHeading>
        <p>
          {post.author} | <PostDate dateTime={post.createdAt} />
        </p>
      </header>
      <SafeMarkdown markdown={post.content} />
    </article>
  );
}
