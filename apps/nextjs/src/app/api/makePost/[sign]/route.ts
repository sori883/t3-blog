import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import type { Post } from "@acme/db";
import { db, eq, schema, sql } from "@acme/db";
import { CreatePostSchema } from "@acme/validators";

import { verifySignature } from "~/utils/signature";

/**
 * Configure basic CORS headers
 * You should extend this to match your needs
 */
function setCorsHeaders(res: Response) {
  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set("Access-Control-Request-Method", "*");
  res.headers.set("Access-Control-Allow-Methods", "OPTIONS, POST");
  res.headers.set("Access-Control-Allow-Headers", "*");
}

export function OPTIONS() {
  const response = new Response(null, {
    status: 204,
  });
  setCorsHeaders(response);
  return response;
}

export async function POST(
  request: NextRequest,
  { params }: { params: { sign: string } },
) {
  const body = CreatePostSchema.safeParse(await request.json());

  if (!body.success)
    return NextResponse.json(
      { error: "Parameter Valid Error" },
      { status: 402 },
    );

  // 署名を検証する
  if (!verifySignature(body.data.userId, params.sign)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    // ユーザを取得する
    const userId = (
      await db
        .select()
        .from(schema.users)
        .where(eq(schema.users.email, body.data.userId))
        .limit(1)
    )[0]!.id;

    // 投稿のslugが新規か更新か確認する
    const isExistPostSlug: Post[] = await db
      .select()
      .from(schema.posts)
      .where(eq(schema.posts.slug, body.data.slug))
      .limit(1);

    // カテゴリを登録(update/insert)
    await db
      .insert(schema.categories)
      .values({
        title: body.data.categorySlug,
        slug: body.data.categorySlug,
        userId,
      })
      .onDuplicateKeyUpdate({ set: { id: sql`id` } });

    // タグを登録(update/insert)
    body.data.tagSlug.map(async (tagSlug) => {
      await db
        .insert(schema.tags)
        .values({
          title: tagSlug,
          slug: tagSlug,
          userId,
        })
        .onDuplicateKeyUpdate({ set: { id: sql`id` } });
    });

    // 投稿を登録(insert/updateでもいいかも..?)
    await db
      .insert(schema.posts)
      .values({
        title: body.data.title,
        slug: body.data.slug,
        entry: body.data.entry,
        isPublish: body.data.isPublish,
        description: body.data.description,
        thumbnailUrl: body.data.thumbnailUrl,
        githubUrl: body.data.githubUrl,
        categorySlug: body.data.categorySlug,
        userId,
      })
      .onDuplicateKeyUpdate({ set: { id: sql`id` } });

    const response = NextResponse.json({
      message: `${isExistPostSlug[0] ? "更新" : "新規"}:${body.data.slug}`,
    });

    setCorsHeaders(response);
    return response;
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
