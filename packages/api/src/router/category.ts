import { desc, schema } from "@acme/db";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const categoryRouter = createTRPCRouter({
  /*
      カテゴリを全て取得する
    */
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.categories.findMany({
      with: {
        posts: true,
      },
      orderBy: desc(schema.categories.createdAt),
    });
  }),
});
