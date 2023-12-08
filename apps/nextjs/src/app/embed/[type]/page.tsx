"use client"
import type { Metadata } from "@acme/markdown";
import { env } from "../../../env.mjs";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { EmbedCard } from "./card";

export default function Embed() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [ogp, setOgp] = useState<Metadata>();

  const fetchIframeUrl = (iframeId: string): string => {
    // iframeのdata-contentに指定されてる表示先のURLを取得
    const iframeElement = window.parent.document.querySelector(`#${iframeId}`);
    if (!iframeElement)  {
      throw new Error(`there is no iframe xD`);
    }
    return  iframeElement.getAttribute('data-content')!;
  }

  const fetchOGP = async (targerUrl: string) => {
    // data-contentのURLからOGPを取得
    const response = await fetch(`${env.NEXT_PUBLIC_APP_URL}/api/ogp?url=${targerUrl}`, { cache: 'no-store' })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const ogpData = await response.json() as Metadata
    setOgp(ogpData)
  }

  useEffect(() => {
    void fetchOGP(fetchIframeUrl(id!));
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <EmbedCard ogp={ogp} />
  );
}