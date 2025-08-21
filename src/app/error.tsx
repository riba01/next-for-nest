'use client';
//Qualquer server component e seus filhos importado aqui vai se transformar em client component
// você pode contornar isso importando o component como chield de outro component
//https://nextjs.org/docs/app/building-your-application/rendering/server-components#client-components

import ErrorMessage from '../components/ErrorMessage';

/* type RootErrorPageProps = {
  error: Error;
  resetError: () => void;
}; */

export default function RootErrorPage(/* { error }: RootErrorPageProps */) {
  /* useEffect(() => {
    //console.log('Error: ', error);
  }, [error]); */
  return (
    <ErrorMessage
      pageTitle='Internal Server Error'
      contentTitle='501'
      contentText='Oops! Ocorreu um erro que não conseguimos recuperar.'
    />
  );
}
