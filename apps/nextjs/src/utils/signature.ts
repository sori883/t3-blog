import crypto from "crypto";

import { env } from "~/env";

export function generateResizeImageWord(url: string, width: string): string {
  return `url=${url}&width=${width}`;
}

// 作成
export function generateSignature(params: string): string {
  return crypto
    .createHmac("sha256", env.SIGNATURE_SECRET)
    .update(params)
    .digest("hex");
}

// 検証
export function verifySignature(
  params: string,
  providedSignature: string,
): boolean {
  const expectedSignature = generateSignature(params);
  return expectedSignature === providedSignature;
}
