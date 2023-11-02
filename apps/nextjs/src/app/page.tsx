// export const runtime = "edge";
import { BaseLayout } from "~/components/layouts";

import { PostIndexList } from "~/components/post"

export default function HomePage() {
  return (
    <BaseLayout>
      <PostIndexList />
    </BaseLayout>
  );
}
