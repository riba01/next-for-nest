import { PostList } from '@/components/PostList';
import { SpinLoader } from '@/components/SpinLoader';
import { Suspense } from 'react';
import { PostFeatured } from '../components/PostFeatured';

export const dynamic = 'force-static';

export default async function Home() {
  /*  throw new Error('Erro na /'); */
  return (
    <>
      <Suspense fallback={<SpinLoader className='min-h-20 mb-16' />}>
        <PostFeatured />
        <PostList />
      </Suspense>
    </>
  );
}
