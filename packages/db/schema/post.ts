import { relations, sql } from "drizzle-orm";
import {
  boolean,
  int,
  primaryKey,
  serial,
  text,
  timestamp,
  unique,
  varchar,
} from "drizzle-orm/mysql-core";

import { mySqlTable } from "./_table";
import { users } from "./auth";

export const posts = mySqlTable(
  "posts",
  {
    id: serial("id").primaryKey().autoincrement(),
    slug: varchar("slug", { length: 50 }).notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    entry: text("entry").notNull(),
    isPublish: boolean("is_publish").default(false).notNull(),
    categoryId: int("category_id"),
    description: varchar("description", { length: 255 }).notNull(),
    thumbnailUrl: varchar("thumbnail_url", { length: 255 }).notNull(),
    userId: varchar("user_id", { length: 255 }).notNull(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),
  },
  (t) => ({
    unqName: unique().on(t.slug),
  }),
);

export const postRelations = relations(posts, ({ one, many }) => ({
  user: one(users, { fields: [posts.userId], references: [users.id] }),
  category: one(categories, {
    fields: [posts.categoryId],
    references: [categories.id],
  }),
  postsToTags: many(postsToTags), // @ADD
}));

export const categories = mySqlTable(
  "categories",
  {
    id: serial("id").primaryKey().autoincrement(),
    title: varchar("title", { length: 256 }).notNull(),
    slug: varchar("slug", { length: 50 }).notNull(),
    userId: varchar("user_id", { length: 255 }).notNull(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),
  },
  (t) => ({
    unqName: unique().on(t.slug),
  }),
);

export const categoriesRelations = relations(categories, ({ one, many }) => ({
  user: one(users, { fields: [categories.userId], references: [users.id] }),
  posts: many(posts),
}));

export const tags = mySqlTable(
  "tags",
  {
    id: serial("id").primaryKey().autoincrement(),
    title: varchar("title", { length: 256 }).notNull(),
    slug: varchar("slug", { length: 50 }).notNull(),
    userId: varchar("user_id", { length: 255 }).notNull(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),
  },
  (t) => ({
    unqName: unique().on(t.slug),
  }),
);

export const tagsRelations = relations(tags, ({ one, many }) => ({
  user: one(users, { fields: [tags.userId], references: [users.id] }),
  postsToTags: many(postsToTags),
}));

export const postsToTags = mySqlTable(
  "posts_to_tags",
  {
    postId: int("post_id").notNull(),
    tagId: int("tags_id").notNull(),
  },
  (t) => ({
    pk: primaryKey(t.postId, t.tagId),
  }),
);

// @see https://orm.drizzle.team/docs/rqb#foreign-keys
export const postsToTagsRelations = relations(postsToTags, ({ one }) => ({
  post: one(posts, {
    fields: [postsToTags.postId],
    references: [posts.id],
  }),
  tag: one(tags, {
    fields: [postsToTags.tagId],
    references: [tags.id],
  }),
}));

export type Post = typeof posts.$inferSelect;
export type InsertPost = typeof posts.$inferInsert;
export type Category = typeof categories.$inferSelect;
export type InsertCategory = typeof categories.$inferInsert;
export type Tag = typeof tags.$inferSelect;
export type InsertTag = typeof tags.$inferInsert;
export type ostsToTags = typeof postsToTags.$inferSelect;
export type InsertPostsToTags = typeof postsToTags.$inferInsert;
