import { z } from "zod";

import { desc, eq, schema, and } from "@acme/db";

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

  /*
    特定カテゴリの記事を取得する
  */
  postsInCategory: publicProcedure
  .input(z.object({ slug: z.string(), limit: z.number(), offset: z.number() }))
  .query(({ ctx, input }) => {
    const { slug, limit, offset } = input;

    return ctx.db.query.posts.findMany({
      with: {
        category: true,
        postsToTags: true,
      },
      where: and(
        eq(schema.posts.isPublish, true), 
        eq(schema.posts.categorySlug, slug)
      ),
      orderBy: desc(schema.posts.createdAt),
      limit,
      offset,
    });
  }),
});
