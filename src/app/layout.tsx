import type { Metadata } from 'next';
import { Container } from '../components/Container';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { ToastifyContainer } from '../components/ToastifyContainer';
import './globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s | The Blog',
    default: 'The Blog', // a default is required when creating a template
  },
  description: 'Notícias, artigos e tutoriais sobre desenvolvimento web.',
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang='pt-BR'>
      <body>
        <Container>
          <Header />
          {children}
          <Footer />
        </Container>
        <ToastifyContainer />
      </body>
    </html>
  );
}
