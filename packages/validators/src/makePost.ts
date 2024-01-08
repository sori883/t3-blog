import { z } from "zod";

export const CreatePostSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  entry: z.string().min(1),
  isPublish: z.boolean(),
  description: z.string().min(1),
  thumbnailUrl: z.string().min(1),
  githubUrl: z.string().min(1).url(),
  categorySlug: z.string().min(1),
  tagSlug: z.string().min(1).array(),
  userId: z.string().min(1),
});

export type CreatePost = z.infer<typeof CreatePostSchema>;
