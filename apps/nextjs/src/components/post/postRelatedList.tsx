import type { RouterOutputs } from "~/trpc/shared";
import { Image } from "~/components/elements/image";
import { Link } from "~/components/elements/link";
import { api } from "~/trpc/server";
import { formatDate } from "~/utils/formatDate";

export async function PostRelatedList(props: { slug: string }) {
  const posts = await api.post.findRecommend.query({
    slug: props.slug,
    limit: 5,
  });

  if (posts.length === 0) {
    return (
      <div className="relative flex w-full flex-col gap-4">
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/10">
          <p className="text-2xl font-bold text-white">No post yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-5">
      {posts.map((p) => (
        <PostItem post={p} key={p.id} />
      ))}
    </div>
  );
}

export function PostItem(props: {
  post: RouterOutputs["post"]["findRecommend"][number];
}) {
  return (
    <div className="mb-2 border-b-2 pb-3 pt-2">
      <Link href={`/${props.post.categorySlug}/${props.post.slug}`}>
        <div className="flex min-h-24 w-full">
          <figure className="relative mr-5 h-24 w-24">
            <Image src={props.post.thumbnailUrl} alt="icon" />
          </figure>
          <div className="flex flex-col justify-around">
            <h2 className="text-xl font-bold">{props.post.title}</h2>
            <p className="text-sm">{formatDate(props.post.createdAt)}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
