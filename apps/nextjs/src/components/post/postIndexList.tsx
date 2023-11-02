import { api } from "~/utils/server";
import { PostCard } from "~/components/post"

export async function PostIndexList() {
  const posts = await api.post.index.query({ limit: 10, offset: 0 });

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
    <div className="grid grid-cols-2 gap-4">
      {posts.map((p) => (<PostCard key={p.id} post={p} />))}
    </div>
  );
}