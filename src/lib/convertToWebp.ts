// convertToWebp.ts
import sharp from 'sharp';

/**
 * Converte uma imagem (JPG, PNG, etc) para WebP reduzindo o tamanho sem perder qualidade visual.
 * @param inputBuffer Buffer ou Uint8Array da imagem original
 * @param quality Qualidade da compressão (0 a 100, padrão 90)
 * @returns Buffer da imagem em WebP
 */
export async function convertToWebp(
  inputBuffer: Buffer | Uint8Array,
  quality: number = 90,
): Promise<Buffer> {
  // O sharp faz ajuste automático para minimizar perda de qualidade
  return await sharp(inputBuffer)
    .webp({
      quality, // 90 é um ótimo valor (default do Google para webp)
      lossless: false, // Usa compressão inteligente (pode ativar lossless se quiser)
      effort: 4, // (1-6) Quanto mais alto, mais lento e menor o arquivo
    })
    .toBuffer();
}
