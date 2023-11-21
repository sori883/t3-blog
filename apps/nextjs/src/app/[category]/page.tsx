import { Suspense } from "react";
import { PostInCategoryList } from "~/components/post"
import { BaseLayout } from "~/components/layouts";


export default function CateroryPosts({ params, searchParams }: { params: { category: string }, searchParams: {page: string | undefined}}) {
  return (
    <BaseLayout>
      <Suspense>
        <PostInCategoryList slug={params.category} page={searchParams.page} />
      </Suspense>
    </BaseLayout>
  );
}
