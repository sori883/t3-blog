import sharp from "sharp";

// eslint-disable-next-line
export async function convertImage(image: any) {
  // eslint-disable-next-line
  const buffer = Buffer.from(image);

  const imageSharp = sharp(buffer);
  const metadata = await imageSharp.metadata();

  // 横幅が1200px以上の場合、アスペクト比を保ったまま横幅1200pxにリサイズする
  if (metadata.width && metadata.width > 1200) {
    imageSharp.resize(1200, null, {
      withoutEnlargement: true, // 元のサイズより大きくならないようにする
    });
  }

  // webpに変換して返す
  return await imageSharp.toFormat("webp", { quality: 75 }).toBuffer();
}
