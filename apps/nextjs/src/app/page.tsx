// export const runtime = "edge";
import { Suspense } from "react";
import { BaseLayout } from "~/components/layouts";

import { PostIndexList } from "~/components/post"

export default function HomePage({ searchParams }: { searchParams: {page: string | undefined}}) {
  return (
    <BaseLayout>
      <Suspense>
        <PostIndexList page={searchParams.page}  />
      </Suspense>
    </BaseLayout>
  );
}
