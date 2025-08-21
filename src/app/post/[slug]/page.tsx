import clsx from 'clsx';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { SinglePost } from '../../../components/SinglePost';
import { SpinLoader } from '../../../components/SpinLoader';
import { findPublicPostBySlugCached } from '../../../lib/post/queries/public';

export const dynamic = 'force-static';

type PostSlugPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: PostSlugPageProps): Promise<Metadata> {
  const { slug } = await params;

  const post = await findPublicPostBySlugCached(slug);
  return {
    title: `${post.title}`,
    description: `Read the post titled "${post.excerpt}" on our blog.`,
    openGraph: {
      title: `Post - ${post.title}`,
      description: `Read the post titled "${post.title}" on our blog.`,
      url: `/post/${post.slug}`,
    },
  };
}
/* export async function generateStaticParams() {
  const posts = await findAllPublicPostsCached();
  return posts.map(post => {
    return {
      slug: post.slug,
    };
  });
  /*
  ou assim
  const params = posts.map(post => {
    return {
      slug: post.slug,
    };
  });
  console.log('params', params);
  return params;

}
 */
export default async function PostSlugPage({ params }: PostSlugPageProps) {
  const { slug } = await params;

  return (
    <article className={clsx('grid grid-cols-1 gap-8 mb-16 group')}>
      <Suspense fallback={<SpinLoader className='min-h-20 mb-16' />}>
        <SinglePost slug={slug} />
      </Suspense>
    </article>
  );
}
