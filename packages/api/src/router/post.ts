import { z } from "zod";

import { desc, eq, schema } from "@acme/db";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const postRouter = createTRPCRouter({
  /*
      トップページ用の記事を取得する
    */
  index: publicProcedure
    .input(z.object({ limit: z.number(), offset: z.number() }))
    .query(({ ctx, input }) => {
      const { limit, offset } = input;

      return ctx.db.query.posts.findMany({
        with: {
          category: true,
          postsToTags: true,
        },
        where: eq(schema.posts.isPublish, true),
        orderBy: desc(schema.posts.createdAt),
        limit,
        offset,
      });
    }),
});
