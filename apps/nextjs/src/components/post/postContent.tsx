import { notFound } from "next/navigation";

import { markdownToHtml } from "@acme/markdown";

import { Image } from "~/components/elements/image";
import { MarkdownRender, TocRender } from "~/components/elements/markdown";
import { ShareSns } from "~/components/elements/sns";
import { EditReqButton } from "~/components/post";
import { api } from "~/trpc/server";
import { formatDate } from "~/utils/formatDate";
// TODO:delete
import { test } from "./test";

export async function PostContent(props: { slug: string }) {
  const post = await api.post.findBySlug.query({ slug: props.slug });

  // 存在しない場合は404にしておく
  if (post === undefined) {
    notFound();
  }
  const lastUpdate = post.updatedAt ?? post.createdAt;
  const html = markdownToHtml(test, { embedOrigin: "http://localhost:3000" });

  return (
    <div>
      <div className="mb-5">
        <h1 className="mb-3 text-4xl font-medium">{post.title}</h1>
        <div className="ui_badge ui_badge-outline mb-1">
          {post.category.title}
        </div>
        <p>最終更新日：{formatDate(lastUpdate)}</p>
      </div>
      <figure className="relative mb-10 h-80 w-full">
        <Image src={post.thumbnailUrl} alt="アイキャッチ" />
      </figure>
      <div className="mb-5">
        <ShareSns post={post} />
      </div>
      <details className="ui_collapse bg-base-200 prose prose-md prose-a:font-normal mb-5 max-w-full">
        <summary className="ui_collapse-title font-bold">
          この記事の目次 ▼
        </summary>
        <div className="ui_collapse-content">
          <TocRender html={html} />
        </div>
      </details>
      <article>
        <MarkdownRender html={html} />
      </article>
      <div className="mt-5">
        <EditReqButton url={post.githubUrl} />
      </div>
    </div>
  );
}
