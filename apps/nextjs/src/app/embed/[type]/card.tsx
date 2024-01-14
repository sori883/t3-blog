"use client";

import type { Metadata } from "@acme/markdown";

export function EmbedCard(props: { ogp: Metadata | undefined; url: string }) {
  return !props.ogp ? (
    <div className="flex h-[125px] w-full animate-pulse border-2 border-slate-300">
      <div className="flex-1 space-y-6 px-6 py-6">
        <div className="h-2 rounded bg-slate-400"></div>
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 h-2 rounded bg-slate-400"></div>
            <div className="col-span-1 h-2 rounded bg-slate-400"></div>
          </div>
          <div className="h-2 rounded bg-slate-400"></div>
        </div>
      </div>
      <div className="h-[152] w-48 bg-slate-400"></div>
    </div>
  ) : (
    <a href={`${props.url}`} target="_top">
      <div className="flex h-[125px] w-full justify-between border-2 border-slate-300 bg-white">
        <div className="flex flex-col justify-between space-y-6 px-6 py-6">
          <div className="h-2 text-xl font-bold">
            {props.ogp.title ? props.ogp.title : "タイトル未設定"}
          </div>
          <div>
            <div className="col-span-2 text-sm text-slate-500">
              {props.ogp.description ? props.ogp.description : ""}
            </div>
            <div className="text-xs">
              {props.ogp.siteName ? props.ogp.siteName : props.url}
            </div>
          </div>
        </div>
        <div className="h-[123px] w-48 bg-slate-500">
          {/*eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={props.ogp.image}
            alt="iconm"
            className="block h-full w-full object-fill"
          />
        </div>
      </div>
    </a>
  );
}
