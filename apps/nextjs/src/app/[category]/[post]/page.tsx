import { PostContent } from "~/components/post"
import { ContentLayout } from "~/components/layouts";
import { PostRelatedList } from "~/components/post"


export default function Post({ params }: { params: { post: string }}) {

  return (
  <div>
    <ContentLayout>
      <PostContent slug={params.post} />
    </ContentLayout>
    <div className="w-full mx-auto mt-5 bg-white py-8 px-10">
      <h1 className="text-3xl font-medium">こちらもいかがですか？</h1>
      <PostRelatedList slug={params.post} />
    </div>
  </div>
  );
}
