import { Suspense } from "react";

import { ContentLayout } from "~/components/layouts";
import { PostContent, PostRelatedList } from "~/components/post";

export default function Post({ params }: { params: { post: string } }) {
  return (
    <div>
      <ContentLayout>
        <Suspense>
          <PostContent slug={params.post} />
        </Suspense>
      </ContentLayout>
      <div className="mx-auto mt-5 w-full bg-white px-10 py-8">
        <h1 className="text-3xl font-medium">こちらもいかがですか？</h1>
        <Suspense>
          <PostRelatedList slug={params.post} />
        </Suspense>
      </div>
    </div>
  );
}
