import { markdownToHtml } from "@acme/markdown"
import { api } from "~/utils/server";
import { notFound } from 'next/navigation'
import { Image } from "~/components/elements/image"
import { formatDate } from "~/utils/formatDate"
import { MarkdownRender } from "~/components/elements/markdown";
import { ShareSns } from "~/components/elements/sns";
import { TocRender } from "~/components/elements/markdown";
import { EditReqButton } from "~/components/post"

// TODO:delete
import {test} from "./test";

export async function PostContent(props: {
  slug: string
}) {
  const post = await api.post.findBySlug.query({slug: props.slug});

  // 存在しない場合は404にしておく
  if (post === undefined) {
    notFound()
  }
  const lastUpdate = post.updatedAt ?? post.createdAt
  const html = markdownToHtml(test, {embedOrigin: "http://localhost:3000"})


  return (
    <div>
        <div className="border-b-2 pb-5">
          <h1 className="text-4xl font-medium mb-3">{post.title}</h1>
          <div className="ui_badge ui_badge-outline mb-1">{post.category.title}</div>
          <p>最終更新日：{formatDate(lastUpdate)}</p>
        </div>
      <figure className="relative w-full h-80 mb-10">
        <Image src={post.thumbnailUrl} alt="アイキャッチ" />
      </figure>
      <div className="mb-5">
        <ShareSns post={post} />
      </div>
      <details className="ui_collapse bg-base-200 mb-5 prose prose-md prose-a:font-normal max-w-full">
          <summary className="ui_collapse-title font-bold">この記事の目次 ▼</summary>
          <div className="ui_collapse-content"> 
          <TocRender html={html} />
          </div>
        </details>
      <article>
        {post.entry}
        {post.githubUrl}
      <MarkdownRender html={html} />
      </article>
      <div className="mt-5">
      <EditReqButton url={post.githubUrl} />
      </div>
    </div>
  );
}