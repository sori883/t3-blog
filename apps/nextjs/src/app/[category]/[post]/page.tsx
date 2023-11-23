import { Suspense } from "react";
import { PostContent } from "~/components/post";
import { ContentLayout } from "~/components/layouts";
import { PostRelatedList } from "~/components/post"


export default function Post({ params }: { params: { post: string }}) {

  return (
  <div>
    <ContentLayout>
      <Suspense>
        <PostContent slug={params.post} />
      </Suspense>
    </ContentLayout>
    <div className="w-full mx-auto mt-5 bg-white py-8 px-10">
      <h1 className="text-3xl font-medium">こちらもいかがですか？</h1>
      <Suspense>
        <PostRelatedList slug={params.post} />
      </Suspense>
    </div>
  </div>
  );
}
