import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function formatDateTime(rawDateTime: string): string {
  const date = new Date(rawDateTime);

  return format(date, "dd/MM/yyyy 'às' HH'h'mm", { locale: ptBR });
}

export function formatRelativeDate(rawDateTime: string): string {
  const date = new Date(rawDateTime);

  return formatDistanceToNow(date, {
    locale: ptBR,
    addSuffix: true,
  });
}
export function formatHour(timestampMs: number): string {
  const date = new Date(timestampMs);

  return format(date, 'HH:mm:ss', { locale: ptBR });
}

/* export async function formatHourCached() {
  /*  'use cache';
  unstable_cacheLife('seconds');
  unstable_cacheTag('randomuser'); */
/*
  return formatHour(Date.now());
}
 */
