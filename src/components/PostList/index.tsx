import { findAllPublicPostsCached } from '../../lib/post/queries/public';
import { PostCoverImage } from '../PostCoverImage';
import { PostSummary } from '../PostSummary';

export async function PostList() {
  const posts = await findAllPublicPostsCached();

  if (posts.length <= 1) return null;

  return (
    <div className='grid grid-cols-1 gap-8 mb-16 sm:grid-cols-2 lg:grid-cols-3'>
      {posts.slice(1).map(post => {
        const postLink = `/post/${post.slug}`;
        return (
          <div key={post.id} className='flex flex-col gap-4 group'>
            <PostCoverImage
              LinkProps={{
                href: postLink,
              }}
              imageProps={{
                width: 1200,
                height: 720,
                src: post.coverImageUrl,
                alt: post.title,
              }}
            />
            <PostSummary
              postLink={postLink}
              postHeading='h2'
              createdAt={post.createdAt}
              title={post.title}
              excerpt={post.excerpt}
              key={post.id}
            />
          </div>
        );
      })}
    </div>
  );
}
