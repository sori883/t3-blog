import { Suspense } from "react";

import PingComp from "./pingComp";

export default function SampleClient() {
  return (
    <Suspense fallback={<p className="mt-4">Loading...</p>}>
      <PingComp />
    </Suspense>
  );
}
