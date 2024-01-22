"use client";

import { forwardRef, useEffect } from "react";

export const EmbedTwitter = forwardRef<HTMLDivElement, { id: string }>(
  function EmbedTwitter({ id }, ref) {
    useEffect(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      // eslint-disable-next-line
      window.twttr?.widgets.load(ref.current);
    }, [id, ref]);

    return (
      <div
        dangerouslySetInnerHTML={{ __html: generateEmbedHtml(id) }}
        ref={ref}
      />
    );
  },
);

const generateEmbedHtml = (id: string): string => {
  return `<blockquote class="twitter-tweet" data-width="400px" data-conversation=”none”><a href="https://twitter.com/i/status/${id}"></a></blockquote>`;
};
