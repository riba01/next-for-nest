import { revalidateExampleAction } from '@/actions/revalidate-example';
import { formatHour } from '../../../utils/format-datetime';

/* export const dynamicParams = true;
export const revalidate = 10; //seconds */
/*

export async function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }];
} */
/* export const dynamic = 'force-static';
//para revalidar por tempo
export const revalidate = 10; //seconds */

export default async function ExamplePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  //pode ser no component
  /*   'use cache';
  unstable_cacheLife('seconds');
  unstable_cacheTag('randomuser'); */
  const { id } = await params;
  const hour = formatHour(Date.now());

  /*  // find
  const response = await fetch('https://randomuser.me/api/?results=2', {
    next: {
      tags: ['randomuser'],
      revalidate: 10, //seconds
    },
  });
  const jsonResponse = await response.json();
  /*
  /* console.log('Response from API:', jsonResponse);
  console.log('Name[0]', jsonResponse.results[0].name);
  console.log('Name[0]', jsonResponse.results[0].name.first); */
  /*
  const name = jsonResponse.results[0].name.first;
  */

  return (
    <main className='min-h-[600px] text-4xl font-bold'>
      <div>Name: {}</div>
      <div>
        Hora: {hour} (ID: {id})
      </div>
      <form action={revalidateExampleAction} className='py-16'>
        <input type='hidden' defaultValue={`/example/${id}`} />
        <button
          type='submit'
          name='path'
          className='p-4 bg-amber-500 text-white rounded-2xl hover:bg-amber-700 cursor-pointer'
        >
          Revalidate
        </button>
      </form>
    </main>
  );
}
