import { z } from "zod";

import { desc, eq, schema, and, sql } from "@acme/db";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const postRouter = createTRPCRouter({
  /*
      トップページ用の記事を取得する
    */
  index: publicProcedure
    .input(z.object({ limit: z.number(), offset: z.number() }))
    .query(async ({ ctx, input }) => {
      const { limit, offset } = input;

      const posts = await ctx.db.query.posts.findMany({
        with: {
          category: true,
          postsToTags: true,
        },
        where: eq(schema.posts.isPublish, true),
        orderBy: desc(schema.posts.createdAt),
        limit,
        offset,
      });

      // ページネーション用に上記と同じ検索条件でカウントを取得する
      const totalCount = await ctx.db
      .select({ count: sql<number>`count(*)` })
      .from(schema.posts)
      .where(eq(schema.posts.isPublish, true))

      return {
        posts,
        totalCount:totalCount[0]?.count ?? 0
      }
    }),

  /*
    特定カテゴリの記事を取得する
  */
  postsInCategory: publicProcedure
  .input(z.object({ slug: z.string(), limit: z.number(), offset: z.number() }))
  .query(async ({ ctx, input }) => {
    const { slug, limit, offset } = input;

    const posts = await ctx.db.query.posts.findMany({
      with: {
        category: true,
        postsToTags: true,
      },
      where: and(
        eq(schema.posts.isPublish, true), 
        eq(schema.posts.categorySlug, slug)
      ),
      orderBy: desc(schema.posts.id),
      limit,
      offset,
    });

    // ページネーション用に上記と同じ検索条件でカウントを取得する
    const totalCount = await ctx.db
    .select({ count: sql<number>`count(*)` })
    .from(schema.posts)
    .where(and(
        eq(schema.posts.isPublish, true), 
        eq(schema.posts.categorySlug, slug))
    )

      return {
        posts,
        totalCount:totalCount[0]?.count ?? 0
      }
  }),

  /*
    特定カテゴリの記事を取得する
  */
    findBySlug: publicProcedure
    .input(z.object({ slug: z.string()}))
    .query(({ ctx, input }) => {
      const { slug } = input;
  
      return  ctx.db.query.posts.findFirst({
        with: {
          category: true,
          postsToTags: {
            with: {
              tag: true
            }
          }
        },
        where: and(
          eq(schema.posts.isPublish, true), 
          eq(schema.posts.slug, slug)
        ),
      });
    }),

});
