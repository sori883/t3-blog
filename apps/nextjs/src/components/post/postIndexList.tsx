import { Pagination } from "~/components/elements/pagination";
import { makeLimitOffset } from "~/components/elements/pagination/";
import { PostCard } from "~/components/post";
import { api } from "~/trpc/server";

export async function PostIndexList(props: { page: string | undefined }) {
  const { limit, offset } = makeLimitOffset(props.page);
  const { posts, totalCount } = await api.post.index.query({ limit, offset });

  if (posts.length === 0) {
    return (
      <div className="relative flex w-full flex-col gap-x-4 gap-y-12">
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/10">
          <p className="text-2xl font-bold text-white">No post yet</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-12">
        {posts.map((p) => (
          <PostCard key={p.id} post={p} />
        ))}
      </div>
      <Pagination totalCount={totalCount} />
    </div>
  );
}
