import { PostInCategoryList } from "~/components/post"

export default function CateroryPosts({ params }: { params: { category: string } }) {
  return (
    <div>
      <PostInCategoryList slug={params.category} />
      </div>
  );
}
