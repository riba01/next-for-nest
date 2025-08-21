import { Metadata } from 'next';
import LoginForm from '../../../components/Admin/LoginForm';
import ErrorMessage from '../../../components/ErrorMessage';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Login Admin',
};

export default async function LoginPage() {
  const allowLogin = Boolean(Number(process.env.ALLOW_LOGIN));
  if (!allowLogin) {
    return (
      <ErrorMessage
        contentTitle='403'
        contentText='Login bloqueado pelo Admin'
      />
    );
  }
  return <LoginForm />;
}
