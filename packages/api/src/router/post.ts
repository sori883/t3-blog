import { z } from "zod";

import { union, desc, eq, ne, schema, and, sql } from "@acme/db";

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
    カテゴリを元に、指定されたカテゴリの記事を一覧で取得する
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
    Slugを元に、一意の記事を取得する
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

  /*
    おすすめの記事を12件取得する
  */
    findRecommend: publicProcedure
    .input(z.object({
      slug: z.string(),
      limit: z.number(),
    }))
    .query(async ({ ctx, input }) => {

      // 記事のslugしか取ってこれそうにないので、記事からカテゴリのslugを取得して使用する
      const categorySlug = await ctx.db.select({
        slug: schema.posts.categorySlug
      })
      .from(schema.posts)
      .where(eq(schema.posts.slug, input.slug))
      .limit(1)

      // 同じカテゴリーの記事を最大でLIMIT件取得する
      const sameCategoryPosts = ctx.db.select()
        .from(schema.posts)
        .where(
          and(
            eq(schema.posts.isPublish, true), 
            eq(schema.posts.categorySlug, categorySlug[0]!.slug)
          ),
        )
        .orderBy(desc(schema.posts.id))
        .limit(input.limit)

      // カテゴリーが違う記事を最大でLIMIT件取得する
      const recentPosts = ctx.db.select()
        .from(schema.posts)
        .where(
          and(
            eq(schema.posts.isPublish, true),
            ne(schema.posts.categorySlug, categorySlug[0]!.slug)
          ),
        )
        .orderBy(desc(schema.posts.id))
        .limit(input.limit)
      
      // 上記をunionしてLIMIT件取得することで同じカテゴリーの記事が
      // LIMIT件以下でも表示する記事数を確保出来るようにする
      return union(
        sameCategoryPosts,
        recentPosts
      ).limit(input.limit)
    })
});
