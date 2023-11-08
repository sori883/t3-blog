import { PostInCategoryList } from "~/components/post"

export default function CateroryPosts({ params, searchParams }: { params: { category: string }, searchParams: {page: string | undefined}}) {
  return (
    <div>
      <PostInCategoryList slug={params.category} page={searchParams.page} />
      </div>
  );
}
