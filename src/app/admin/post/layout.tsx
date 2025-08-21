import { MenuAdmin } from '../../../components/Admin/MenuAdmin';
import { requireLoginSessionRedirect } from '../../../lib/login/manage-login';

type AdminPostLayoutProps = {
  children: React.ReactNode;
};

export default async function AdminPostLayout({
  children,
}: Readonly<AdminPostLayoutProps>) {
  await requireLoginSessionRedirect();
  return (
    <>
      <MenuAdmin />
      {children}
    </>
  );
}
