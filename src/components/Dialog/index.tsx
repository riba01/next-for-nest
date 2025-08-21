'use client';

import clsx from 'clsx';
import { Buttom } from '../Buttom';

type DialogProps = {
  title: string;
  content: React.ReactNode;
  isVisible?: boolean;
  onClose: () => void;
  onConfirm: () => void;
  disabled: boolean;
};

export function Dialog({
  title,
  content,
  isVisible = false,
  onClose,
  onConfirm,
  disabled = false,
}: DialogProps) {
  if (!isVisible) return null;

  function handleCancel() {
    if (disabled) return;
    onClose();
  }

  return (
    <div
      //'top-0 bottom-0 left-0 right-0' pode ser substituido por inset-0
      className={clsx(
        'fixed bg-black/50 text-white backdrop-blur-[1.5px]',
        'inset-0',
        'flex items-center justify-center',
        'z-50 p-6',
      )}
      onClick={handleCancel}
    >
      <div
        className={clsx(
          'rounded-2xl bg-slate-100 p-6 text-slate-700',
          'max-w-2xl',
          'flex flex-col gap-6',
          'shadow-lg shadow-gray-600',
        )}
        role='dialog'
        aria-modal={true}
        aria-labelledby='dialog-title'
        aria-describedby='dialog-description'
        onClick={e => e.stopPropagation()}
      >
        <h3 id='dialog-title' className='text-center text-xl font-bold'>
          {title}
        </h3>
        <div id='dialog-description' className='mb-4 text-justify'>
          {content}
        </div>
        <div className={clsx('itens-center flex flex-row justify-around')}>
          <Buttom
            variant='ghost'
            autoFocus
            onClick={onClose}
            disabled={disabled}
            size={'md'}
          >
            Cancelar
          </Buttom>
          <Buttom
            variant='default'
            className={clsx(
              'flex items-center justify-center',
              'bg-blue-500 text-blue-50',
              'rounded-lg px-4 py-2',
              'transition hover:bg-blue-600',
              'cursor-pointer',
              'disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500',
            )}
            onClick={onConfirm}
            disabled={disabled}
            aria-label='Confirmar exclusão'
            size={'md'}
          >
            Ok
          </Buttom>
        </div>
      </div>
    </div>
  );
}
