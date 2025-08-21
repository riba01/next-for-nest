import clsx from 'clsx';
import {
  formatDateTime,
  formatRelativeDate,
} from '../../utils/format-datetime';

type PostDateProps = {
  dateTime: string;
};
export function PostDate({ dateTime }: PostDateProps) {
  return (
    <time
      className={clsx('text-sm/tight text-slate-600')}
      dateTime={dateTime}
      title={formatRelativeDate(dateTime)}
    >
      {formatDateTime(dateTime)}
    </time>
  );
}
