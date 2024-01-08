export interface CreatePostRequest {
  title: string;
  slug: string;
  entry: string;
  isPublish: boolean;
  description: string;
  thumbnailUrl: string;
  githubUrl: string;
  categorySlug: string;
  tagSlug: string[];
  userId: string;
}

export interface PostMeta {
  title: string;
  slug: string;
  isPublish: boolean;
  description: string;
  thumbnailUrl: string;
  tagSlug: string[];
  categorySlug: string;
  entry: string;
}
