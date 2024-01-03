import { desc, schema } from "@acme/db";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const tagRouter = createTRPCRouter({
  /*
    タグを全て取得する
  */
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.tags.findMany({
      orderBy: desc(schema.tags.createdAt),
    });
  }),
});
