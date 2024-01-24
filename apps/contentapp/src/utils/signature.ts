import crypto from "crypto";

export function generateSignature(): string {
  return crypto
    .createHmac("sha256", process.env.SIGNATURE_SECRET!)
    .update(process.env.USER_ID!)
    .digest("hex");
}
