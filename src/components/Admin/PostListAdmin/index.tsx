import clsx from 'clsx';
import Link from 'next/link';
import { findAllPostsAdmin } from '../../../lib/post/queries/admin';
import ErrorMessage from '../../ErrorMessage';
import { DeletePostButton } from '../DeletePostButtom';

export default async function PostListAdmin() {
  const posts = await findAllPostsAdmin();
  if (posts.length <= 0) {
    return (
      <ErrorMessage contentTitle='Opps 😜' contentText='Sem posts criados' />
    );
  }

  return (
    <div className='mb-16'>
      {posts.map(post => {
        return (
          <div
            key={post.id}
            className={clsx(
              'p-2',
              !post.published && 'bg-slate-400',
              'flex gap-2 items-center justify-between',
            )}
          >
            <Link href={`/admin/post/${post.id}`}>{post.title}</Link>
            {!post.published && (
              <span className='text-xs italic text-slate-300'>
                {' '}
                (Não publicado)
              </span>
            )}
            <DeletePostButton title={post.title} id={post.id} />
          </div>
        );
      })}
    </div>
  );
}
