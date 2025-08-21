import { formatHour } from '@/utils/format-datetime';

export default async function ExamplePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const hour = formatHour(Date.now());
  return (
    <main className='min-h-[600px] text-4xl font-bold'>
      <div>
        Hora: {hour} (ID: {id})
      </div>
    </main>
  );
}
