'use client';

import clsx from 'clsx';
import { useRouter, useSearchParams } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { createPostAction } from '../../../actions/post/create-post-action';
import { updatePostAction } from '../../../actions/post/update-post-action';
import { makePartialPublicPost, PublicPost } from '../../../dto/post/dto';
import { Buttom } from '../../Buttom';
import { InputCheckbox } from '../../InputCheckbox';
import { InputText } from '../../InputText';
import { MarkdownEditor } from '../../MarkdownEditor';
import { ImageUploader } from '../ImageUpLoarder';

type ManagePostFormUpdateProps = {
  mode: 'update';
  publicPost: PublicPost;
};

type ManagePostFormCreateProps = {
  mode: 'create';
};

type ManagePostFormProps =
  | ManagePostFormUpdateProps
  | ManagePostFormCreateProps;

export function ManagePostForm(props: ManagePostFormProps) {
  const searchParams = useSearchParams();
  const created = searchParams.get('created');
  const router = useRouter();

  const { mode } = props;
  let publicPost;

  if (mode === 'update') {
    publicPost = props.publicPost;
  }

  const actionsMap = {
    update: updatePostAction,
    create: createPostAction,
  };

  const initialState = {
    formState: makePartialPublicPost(publicPost),
    errors: [],
  };
  const [state, action, isPending] = useActionState(
    actionsMap[mode],
    initialState,
  );
  useEffect(() => {
    if (state.errors.length > 0) {
      state.errors.forEach(error => toast.error(error));
    }
  }, [state.errors]);

  useEffect(() => {
    if (state.success) {
      toast.dismiss();
      toast.success('Success post update');
    }
  }, [state]);

  useEffect(() => {
    if (created) {
      toast.dismiss();
      toast.success('Success post created');
      const url = new URL(window.location.href);
      url.searchParams.delete('created');
      router.replace(url.toString());
    }
  }, [created, router]);

  const { formState } = state;
  const [contentValue, setContentValue] = useState(publicPost?.content || '');

  return (
    <form action={action} className='mb-16'>
      <div
        className={clsx(
          'flex flex-col',
          'my-8 items-start justify-start gap-4',
        )}
      >
        <InputText
          placeholder='ID gerado automaticamente'
          labelText='ID'
          name='id'
          type='text'
          defaultValue={formState.id}
          disabled={isPending}
          readOnly
        />
        <InputText
          placeholder='Slug gerada automaticamente'
          labelText='Slug'
          name='slug'
          type='text'
          defaultValue={formState.slug}
          disabled={isPending}
          readOnly
        />
        <InputText
          placeholder='Digite o nome do autor do post'
          labelText='Autor'
          name='author'
          type='text'
          defaultValue={formState.author}
          disabled={isPending}
        />
        <InputText
          placeholder='Digite o título do texto'
          labelText='Título'
          name='title'
          type='text'
          defaultValue={formState.title}
          disabled={isPending}
        />
        <InputText
          placeholder='Digite o resumo do post'
          labelText='Resumo'
          name='excerpt'
          type='text'
          defaultValue={formState.excerpt}
          disabled={isPending}
        />
        <MarkdownEditor
          labelText='Conteúdo'
          textAreaName='content'
          value={contentValue}
          setValue={setContentValue}
          disabled={isPending}
        />

        <ImageUploader disabled={isPending} />
        <InputText
          placeholder='URL da imagem de capa'
          labelText='URL da imagem de capa'
          name='coverImageUrl'
          type='text'
          defaultValue={formState.coverImageUrl}
          disabled={isPending}
        />

        <InputCheckbox
          labelText={'Publicar?'}
          name='published'
          defaultChecked={formState.published}
          disabled={isPending}
        />

        <div className='mt-4'>
          <Buttom
            type='submit'
            variant='default'
            size='md'
            className='font-bold'
            disabled={isPending}
          >
            {' '}
            Enviar
          </Buttom>
        </div>
      </div>
    </form>
  );
}
