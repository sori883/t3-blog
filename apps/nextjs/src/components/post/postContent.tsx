import { api } from "~/utils/server";
import { notFound } from 'next/navigation'
import { Image } from "~/components/elements/image"
import { formatDate } from "~/utils/formatDate"
import { MarkdownRenderer } from "~/components/elements/markdown";
import { ShareSns } from "~/components/elements/sns";

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
      <div className="mb-10">
        <ShareSns post={post} />
      </div>
      <article className="prose lg:prose-xl">
        {post.entry}
      <MarkdownRenderer text={test} />
      </article>
    </div>
  );
}