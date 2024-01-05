import {
  S3Client,
  PutObjectCommand,
  // ListObjectsV2Command,
} from "@aws-sdk/client-s3";
import { convertImage } from "./convertImage"
import { getExtension } from "./getExtension" 

// eslint-disable-next-line
export async function uploader(image: any, path: string) {
  // 環境変数があるか確認するよ
  if (!process.env.R2_ENDPOINT) throw new Error("R2_ENDPOINT is not set");
  if (!process.env.R2_ACCESS_KEY_ID) throw new Error("R2_ACCESS_KEY_ID is not set");
  if (!process.env.R2_SECRET_ACCESS_KEY) throw new Error("R2_SECRET_ACCESS_KEY is not set");
  if (!process.env.R2_BUCKET) throw new Error("R2_BUCKET is not set");

  // 画像をwebpに変換する
  // eslint-disable-next-line
  const convertedImage = await convertImage(image.data)

  // Upload Client
  const S3 = new S3Client({
    region: "auto",
    endpoint: process.env.R2_ENDPOINT,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
  });

  // アップロード
  await S3.send(
    new PutObjectCommand({
      Body: convertedImage,
      ContentType: "image/webp", // webpしかアップロードしない想定
      Bucket: process.env.R2_BUCKET, // Bucketを指定
      Key: `2023/${path.replace(getExtension(path), "webp")}`, // ファイル名の拡張子をwqebpに変換して保存
    })
  );
}