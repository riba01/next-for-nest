'use client';

import { ImageUpIcon } from 'lucide-react';
import Image from 'next/image';
import { useRef, useState, useTransition } from 'react';
import { toast } from 'react-toastify';
import { uploadImageAction } from '../../../actions/upload/upload-image-action';
import { getImageTypeByMagicBytes } from '../../../lib/getImageTypeByMagicBytes';
import { Buttom } from '../../Buttom';

type ImageUploaderProps = {
  disabled?: boolean;
};

export function ImageUploader({ disabled = false }: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isUploading, startTransition] = useTransition();

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [imgUrl, setImgUrl] = useState<string>('');

  function handleChooseFile() {
    if (!fileInputRef.current) {
      setPreviewUrl(null);
      return;
    }

    fileInputRef.current.click();
  }

  async function handleChange() {
    toast.dismiss();
    setPreviewUrl(null);
    if (!fileInputRef.current) {
      setPreviewUrl(null);
      return;
    }

    const fileInput = fileInputRef.current;
    const file = fileInput.files?.[0];

    if (!file) {
      setPreviewUrl(null);
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast.error('Arquivo selecionado não é uma imagem válida.');
      fileInput.value = '';
      setPreviewUrl(null);
      return;
    }

    // 2. Checagem dos primeiros bytes (magic bytes)
    const arrayBuffer = await file.arrayBuffer();
    const uint8 = new Uint8Array(arrayBuffer).subarray(0, 16); // pega só os 16 primeiros bytes para análise
    const realType = getImageTypeByMagicBytes(uint8);

    if (!realType) {
      toast.error('Arquivo selecionado não é uma imagem válida.');
      setPreviewUrl(null);
      return;
    }
    const image_upload_max_size =
      Number(process.env.NEXT_PUBLIC_IMAGE_UPLOADER_MAX_SIZE) || 921600;
    /* console.log(file); */
    if (file.size > image_upload_max_size) {
      const readMaxImageFile = image_upload_max_size / 1024;
      toast.error(`Imagem não pode ser maior que ${readMaxImageFile}Kb`);
      setPreviewUrl(null);

      fileInput.value = '';
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    startTransition(async () => {
      const result = await uploadImageAction(formData);
      /*  console.log(result.user); */
      if (result.error) {
        toast.error(result.error);
        fileInput.value = '';
        setPreviewUrl(null);
        return;
      }

      toast.success('Imagem salva com sucesso!');
      setImgUrl(result.url);
    });

    /* console.log(formData.get('file')); */
    // Mostrar preview
    const reader = new FileReader();
    reader.onload = e => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    fileInput.value = '';
  }

  return (
    <div className='flex flex-col gap-2 py-4'>
      <Buttom
        type='button'
        onClick={handleChooseFile}
        size='md'
        disabled={isUploading || disabled}
      >
        <ImageUpIcon />
        Enviar imagem
      </Buttom>{' '}
      <span className='text-xs italic opacity-80'>
        Apenas arquivos de imagens (.jpg, .jpeg, .png, .gif, .bmp, .webp)
      </span>
      <input
        ref={fileInputRef}
        name='file'
        type='file'
        className='hidden'
        accept='image/*'
        onChange={handleChange}
        disabled={isUploading || disabled}
      />
      {imgUrl && previewUrl && (
        <div className='flex w-full flex-col gap-2 py-4'>
          <span className='mt-4 text-xs'>Url da imagem: {imgUrl}</span>
          <Image
            src={previewUrl}
            alt='Preview da imagem selecionada'
            width={400}
            height={225}
            className='mt-2 w-full rounded-lg shadow'
          />
        </div>
      )}
    </div>
  );
}
