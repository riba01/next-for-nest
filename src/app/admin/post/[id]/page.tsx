import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ManagePostForm } from '../../../../components/Admin/ManagePostForm';
import { requireLoginSessionRedirect } from '../../../../lib/login/manage-login';
import { findPostByIdAdmin } from '../../../../lib/post/queries/admin';

export const dynamic = 'force-dynamic';

type AdminPostIdPageProps = {
  params: Promise<{ id: string }>;
};
export const metadata: Metadata = {
  title: 'Editar post',
};
export default async function AdminPostIdPage({
  params,
}: AdminPostIdPageProps) {
  await requireLoginSessionRedirect();
  const { id } = await params;
  const post = await findPostByIdAdmin(id).catch(() => undefined);
  if (!post) notFound();
  /*  console.log(id); */
  return (
    <>
      <div className='flex w-full flex-col'>
        <h1 className='text-center text-xl font-bold'>Edit Post</h1>
      </div>
      <ManagePostForm mode='update' publicPost={post} />
    </>
  );
}
