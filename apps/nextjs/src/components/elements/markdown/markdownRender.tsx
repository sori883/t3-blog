"use client";

import "@acme/markdown/css";

import { useEffect } from "react";

// heightはありまぁす！
type Iframe = {
  height: number;
} & Element;

export function MarkdownRender(props: { html: string }) {
  useEffect(() => {
    window.addEventListener(
      "message",
      function (event) {
        try {
          // eslint-disable-next-line
          const data = JSON.parse(event.data);
          // eslint-disable-next-line
          if (!data.isEmbed) {
            return;
          }
          const iframe: Iframe = document.querySelector(
            // eslint-disable-next-line
            `[name="${data.name}"]`,
          )!;
          if (!iframe) {
            return;
          }
          // eslint-disable-next-line
          iframe.height = data.height;
        } catch (e) {
          /* empty */
        }
      },
      false,
    );
  }, []);

  return (
    <div className="znc" dangerouslySetInnerHTML={{ __html: props.html }} />
  );
}
