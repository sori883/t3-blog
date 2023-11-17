import { PostContent } from "~/components/post"

export default function Post({ params }: { params: { post: string }}) {

  return (
    <div>
      <PostContent slug={params.post} />
    </div>
  );
}
