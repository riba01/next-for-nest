'use client';
import clsx from 'clsx';
import { Trash2Icon } from 'lucide-react';
import { useState, useTransition } from 'react';
import { toast } from 'react-toastify';
import { DeletePostAction } from '../../../actions/post/delete-post-action';
import { Dialog } from '../../Dialog';

type DeletePostButtonProps = {
  id: string;
  title: string;
};
export function DeletePostButton({ id, title }: DeletePostButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [showDialog, setShowDialog] = useState(false);
  const contentDialog = `Tem certeza que deseja exluir o post "${title}". Se está certo clique em "Ok"`;

  function handleClick() {
    setShowDialog(true);
  }
  function handleConfirm() {
    toast.dismiss();
    startTransition(async () => {
      const result = await DeletePostAction(id);
      /* console.log(result); */
      setShowDialog(false);
      if (result.error) {
        /* console.error(result.error); */
        toast.error(result.error);
        return;
      }
      toast.success(`Post "${title}" excluido com sucesso!`);
    });
  }
  return (
    <>
      <button
        className={clsx(
          'cursor-pointer',
          '[&_svg]:text-red-700',
          'hover:scale-120',
          'disabled:[&_svg]:text-slate-500 disabled:cursor-not-allowed',
        )}
        aria-label={`Delete post ${title}`}
        title={`Delete post ${title}`}
        onClick={handleClick}
        disabled={isPending}
      >
        <Trash2Icon size={16} />
      </button>
      {showDialog && (
        <Dialog
          isVisible={showDialog}
          title={`Excluir Post? `}
          content={contentDialog}
          onClose={() => setShowDialog(false)}
          onConfirm={handleConfirm}
          disabled={isPending}
        />
      )}
    </>
  );
}
