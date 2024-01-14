"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import type { Metadata } from "@acme/markdown";

import { env } from "~/env";
import { getTwitterXId } from "./_utils/getTwitterXId";
import { EmbedCard } from "./card";
import { EmbedTwitter } from "./twitter";

export default function Embed({ params }: { params: { type: string } }) {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [url, setUrl] = useState<string>("");
  const [ogp, setOgp] = useState<Metadata>();
  const [twId, setTwId] = useState<string>("");

  useEffect(() => {
    const dataURL = fetchIframeUrl(id!);
    setUrl(decodeURIComponent(dataURL));
    if (params.type === "card") void fetchOGP(dataURL);
    if (params.type === "tweet") void twitterEm(dataURL);
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

  if (params.type === "tweet") {
    return <EmbedTwitter id={twId} />;
  } else if (params.type === "card") {
    return <EmbedCard ogp={ogp} url={url} />;
  }
}
