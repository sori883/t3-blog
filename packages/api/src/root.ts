import { authRouter } from "./router/auth";
import { categoryRouter } from "./router/category";
import { postRouter } from "./router/post";
import { tagRouter } from "./router/tag";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  post: postRouter,
  category: categoryRouter,
  tag: tagRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
