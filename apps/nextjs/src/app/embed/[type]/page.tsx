"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

import type { Metadata } from "@acme/markdown";

import { env } from "~/env";
import { EmbedCard } from "./_embed/card";
import { EmbedTwitter } from "./_embed/twitter";
import { getTwitterXId } from "./_utils/getTwitterXId";

export default function Embed({ params }: { params: { type: string } }) {
  const ref = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [url, setUrl] = useState<string>("");
  const [ogp, setOgp] = useState<Metadata>();
  const [twId, setTwId] = useState<string>("");

  const sendEmbedSizeInfo = (height: number, name: string) => {
    window.parent.postMessage(
      JSON.stringify({
        height: height + 10,
        isEmbed: true,
        name: name,
      }),
      "*",
    );
  };

  useEffect(() => {
    const dataURL = fetchIframeUrl(id!);
    setUrl(decodeURIComponent(dataURL));
    if (params.type === "card") void fetchOGP(dataURL);
    if (params.type === "tweet") void twitterEm(dataURL);

    if (!ref.current) return;
    if (!window.parent) return;

    const elem = ref.current;
    const observer = new ResizeObserver(() => {
      sendEmbedSizeInfo(elem.offsetHeight, window.name);
    });

    if (elem) {
      observer.observe(elem);
    }

    return () => {
      if (elem) {
        observer.unobserve(elem);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function twitterEm(targerUrl: string) {
    setTwId(getTwitterXId(decodeURIComponent(targerUrl))!);
  }

  function fetchIframeUrl(iframeId: string): string {
    // iframeのdata-contentに指定されてる表示先のURLを取得
    const iframeElement = window.parent.document.querySelector(`#${iframeId}`);
    if (!iframeElement) {
      throw new Error(`there is no iframe xD`);
    }
    return iframeElement.getAttribute("data-content")!;
  }

  async function fetchOGP(targerUrl: string) {
    // data-contentのURLからOGPを取得
    const response = await fetch(
      `http://${env.NEXT_PUBLIC_APP_URL}/api/ogp?url=${targerUrl}`,
      { cache: "no-store" },
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const ogpData = (await response.json()) as Metadata;
    setOgp(ogpData);
  }

  return (
    <div>
      {params.type === "tweet" ? (
        <EmbedTwitter id={twId} ref={ref} />
      ) : (
        <EmbedCard ogp={ogp} url={url} ref={ref} />
      )}
    </div>
  );
}
