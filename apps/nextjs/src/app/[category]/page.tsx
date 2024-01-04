import { Suspense } from "react";

import { PostInCategoryList } from "~/components/post";

export default function CateroryPosts({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams: { page: string | undefined };
}) {
  return (
    <Suspense>
      <PostInCategoryList slug={params.category} page={searchParams.page} />
    </Suspense>
  );
}
