"use client";

import { api } from "~/utils/react";

export default function PingComp() {
  const hello = api.post.publicProcedure.useSuspenseQuery({
    text: "from client",
  });
  if (!hello) {
    return (
      <div>
        <p>no hello</p>
      </div>
    );
  }

  return <p>{hello[0].greeting}</p>;
}
