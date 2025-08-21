import { Metadata } from 'next';
import { Suspense } from 'react';
import PostListAdmin from '../../../components/Admin/PostListAdmin';
import { SpinLoader } from '../../../components/SpinLoader';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Admin Post Page',
};

export default async function AdminPostPage() {
  return (
    <Suspense fallback={<SpinLoader className='my-6' />}>
      <PostListAdmin />
    </Suspense>
  );
}
