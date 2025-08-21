import ErrorMessage from '../components/ErrorMessage';

export default function NotFoundPage() {
  return (
    <>
      <ErrorMessage
        pageTitle='404 - Page not found'
        contentTitle='404'
        contentText="{' '}
            Page Not Found Sorry, the page you are looking for does not exist."
      />
    </>
  );
}
