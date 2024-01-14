"use client";

import { Tweet } from "react-tweet";

export function EmbedTwitter({ id }: { id: string }) {
  return <Tweet id={id} />;
}
