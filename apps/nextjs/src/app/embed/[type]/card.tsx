"use client"
import type { Metadata } from "@acme/markdown";

export function EmbedCard(props: {
  ogp: Metadata | undefined
}) {
  return (
    !props.ogp ? 
    <div className="w-full h-[125px] border-2 animate-pulse flex">
      <div className="flex-1 space-y-6 py-6 px-6">
        <div className="h-2 bg-slate-500 rounded"></div>
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-4">
            <div className="h-2 bg-slate-500 rounded col-span-2"></div>
            <div className="h-2 bg-slate-500 rounded col-span-1"></div>
          </div>
          <div className="h-2 bg-slate-500 rounded"></div>
        </div>
      </div>
      <div className="bg-slate-500 h-[152] w-48"></div>
    </div>
    :
    <a href={props.ogp.url} target="_top">
      <div className="w-full h-[125px] border-2 flex bg-white">
      <div className="flex-1 space-y-5 py-5 px-6">
        <div className="h-2 text-xl font-bold">
          {props.ogp.title ? props.ogp.title : "タイトル未設定"}
        </div>
        <div className="space-y-3">
            <div className="col-span-2 text-sm text-slate-500">
              {props.ogp.description ? props.ogp.description : ""}
            </div>
          <div className="text-xs">
            {props.ogp.siteName ? props.ogp.siteName : props.ogp.url}
          </div>
        </div>
      </div>
      <div className="bg-slate-500 h-[123px] w-48">
        {/*eslint-disable-next-line @next/next/no-img-element */}
        <img src={props.ogp.image} alt="iconm" className="object-fill block w-full h-full" />
      </div>
    </div>
  </a>
  );
}
