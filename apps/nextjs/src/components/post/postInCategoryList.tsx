import { api } from "~/trpc/server";
import { PostCard } from "~/components/post"
import { Pagination } from "~/components/elements/pagination";
import { makeLimitOffset } from "~/components/elements/pagination/"

export async function PostInCategoryList(props: {slug: string, page: string | undefined}) {
  const { limit, offset } = makeLimitOffset(props.page);
  const { posts, totalCount } = await api.post.postsInCategory.query({slug: props.slug, limit, offset });

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
    <div>
      <div className="grid grid-cols-2 gap-4 mb-12">
        {posts.map((p) => (<PostCard key={p.id} post={p} />))}
      </div>
      <Pagination totalCount={totalCount} />
    </div>
  );
}