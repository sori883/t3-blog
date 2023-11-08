// export const runtime = "edge";
import { BaseLayout } from "~/components/layouts";

import { PostIndexList } from "~/components/post"

export default function HomePage({ searchParams }: { searchParams: {page: string | undefined}}) {
  return (
    <BaseLayout>
      <PostIndexList page={searchParams.page}  />
    </BaseLayout>
  );
}
