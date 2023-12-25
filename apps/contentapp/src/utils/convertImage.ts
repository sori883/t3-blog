import sharp from "sharp";

// eslint-disable-next-line
export async function convertImage(image: any) {
  // eslint-disable-next-line
  const buffer = Buffer.from(image)

  return await sharp(buffer)
    .toFormat("webp", { quality: 80 })
    .toBuffer()
}