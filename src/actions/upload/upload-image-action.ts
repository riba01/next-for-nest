'use server';

import { mkdir, writeFile } from 'fs/promises';
import { extname, resolve } from 'path';
import { convertToWebp } from '../../lib/convertToWebp';
import { getImageTypeByMagicBytes } from '../../lib/getImageTypeByMagicBytes';
import { verifyLoginSession } from '../../lib/login/verifyLoginSession';

type UpuLoadImageActionResult = {
  url: string;
  error: string;
};
export async function uploadImageAction(
  formdata: FormData,
): Promise<UpuLoadImageActionResult> {
  const makeResult = ({ url = '', error = '' }) => ({ url, error });
  const isAuthenticated = await verifyLoginSession();
  if (!isAuthenticated) {
    return makeResult({
      error: 'Faça login em outra aba do navegador!',
    });
  }

  if (!(formdata instanceof FormData)) {
    return makeResult({ url: '', error: 'Dados invalidos' });
  }

  const file = formdata.get('file');

  if (!(file instanceof File)) {
    return makeResult({ error: 'Arquivo invalido' });
  }

  const image_upload_max_size =
    Number(process.env.NEXT_PUBLIC_IMAGE_UPLOADER_MAX_SIZE) || 921600;

  if (file.size > image_upload_max_size) {
    const readMaxImageFile = (image_upload_max_size / 1024).toFixed(2);
    return makeResult({
      error: `Imagem não pode ser maior que ${readMaxImageFile}Kb`,
    });
  }

  if (!file.type.startsWith('image/')) {
    return makeResult({
      error: `Apenas arquivos de Imagem`,
    });
  }
  // 2. Checagem dos primeiros bytes (magic bytes)
  const arrayBuffer = await file.arrayBuffer();
  const uint8 = new Uint8Array(arrayBuffer).subarray(0, 16); // pega só os 16 primeiros bytes para análise
  const realType = getImageTypeByMagicBytes(uint8);

  if (!realType) {
    return makeResult({
      error: 'O arquivo enviado não é uma imagem válida.',
    });
  }

  // Aqui você pode salvar a imagem no disco, S3, etc.
  // const imageUrl = await saveImage(file);
  const imageExtension = extname(file.name);
  const uniqueImageName = `img_${Date.now()}${imageExtension}`;
  /* console.log('Teste ', uniqueImageName); */

  //verifica se a pasta existe e se não existe criar
  const IMAGE_UPLOADER_DIRECTORY =
    process.env.NEXT_PUBLIC_IMAGE_UPLOADER_DIRECTORY || 'uploads';
  const folderPath = resolve(process.cwd(), 'public', IMAGE_UPLOADER_DIRECTORY);

  await mkdir(folderPath, { recursive: true });

  const inputBuffer = Buffer.from(arrayBuffer);

  const buffer = await convertToWebp(inputBuffer, 90);

  //Gerar o caminho para o arquivo
  const fileFullPath = resolve(folderPath, uniqueImageName);

  /*   console.log(fileFullPath); */

  await writeFile(fileFullPath, buffer);

  const IMAGE_SERVER_URL = process.env.NEXT_PUBLIC_IMAGE_SERVER_URL;

  const url = `${IMAGE_SERVER_URL}/${uniqueImageName}`;
  return makeResult({ url: url });
}
