"use server";

import type { Inputs } from "~/components/contact";
import { sendDiscord } from "~/utils/sendDiscord";

import { env } from "~/env.mjs";

const url = env.CONTACT_URL

export const sendContactAction = async (data: Inputs) => {
  // 投稿内容を組み立てる
  const content = `メールアドレス:${data.email}\n投稿内容:\n${data.body}`
  await sendDiscord(url, content)
};