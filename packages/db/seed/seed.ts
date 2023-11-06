import { db, schema } from "../";
import type {
  Category,
  InsertCategory,
  InsertPost,
  InsertPostsToTags,
  InsertTag,
  Post,
  Tag,
  User,
} from "../";

async function main() {
  // ユーザを取得する
  const user: User[] = await db.select().from(schema.users).limit(1);

  // ユーザ以外のschemaを削除
  await db.delete(schema.posts);
  await db.delete(schema.categories);
  await db.delete(schema.tags);
  await db.delete(schema.postsToTags);

  /*
    category
  */
  const categories: InsertCategory[] = [
    {
      title: "カテゴリー壱",
      slug: "slug1",
      userId: user[0]!.id,
    },
    {
      title: "カテゴリー弐",
      slug: "slug2",
      userId: user[0]!.id,
    },
    {
      title: "カテゴリー参",
      slug: "slug3",
      userId: user[0]!.id,
    },
  ];

  const categoriesInserted = await db
    .insert(schema.categories)
    .values(categories);
  console.log(categoriesInserted);

  /*
    tag
  */
  const tags: InsertTag[] = [
    {
      title: "タグ壱",
      slug: "slug1",
      userId: user[0]!.id,
    },
    {
      title: "タグ弐",
      slug: "slug2",
      userId: user[0]!.id,
    },
    {
      title: "タグ参",
      slug: "slug3",
      userId: user[0]!.id,
    },
  ];

  const tagsInserted = await db.insert(schema.tags).values(tags);
  console.log(tagsInserted);

  /*
    Post
  */
  const cate: Category[] = await db.select().from(schema.categories).limit(1);

  const posts: InsertPost[] = [
    {
      title: "ポスト1",
      slug: "post1",
      entry: "post1です。",
      isPublish: true,
      description: "ポスト1です。",
      thumbnailUrl: "https://img.sori883.dev/images/0001/kitune500.png",
      categorySlug: cate[0]!.slug,
      userId: user[0]!.id,
    },
    {
      title: "ポスト2",
      slug: "post2",
      entry: "post2です。",
      isPublish: true,
      description: "ポスト2です。",
      thumbnailUrl: "https://img.sori883.dev/images/0001/kitune500.png",
      categorySlug: cate[0]!.slug,
      userId: user[0]!.id,
    },
    {
      title: "ポスト3",
      slug: "post3",
      entry: "post3です。",
      isPublish: true,
      description: "ポスト3です。",
      thumbnailUrl: "https://img.sori883.dev/images/0001/kitune500.png",
      categorySlug: cate[0]!.slug,
      userId: user[0]!.id,
    },
  ];

  const postsInserted = await db.insert(schema.posts).values(posts);
  console.log(postsInserted);

  /*
    tagとpostの中間テーブル
  */
  const selectPost: Post[] = await db.select().from(schema.posts);
  const selectTag: Tag[] = await db.select().from(schema.tags).limit(1);

  const postsToTags: InsertPostsToTags[] = selectPost.map((item) => ({
    postId: item.id,
    tagId: selectTag[0]!.id,
  }));

  const postsToTagsInserted = await db
    .insert(schema.postsToTags)
    .values(postsToTags);
  console.log(postsToTagsInserted);
}

void main();
