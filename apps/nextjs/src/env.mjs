import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  shared: {
    VERCEL_URL: z
      .string()
      .optional()
      .transform((v) => (v ? `https://${v}` : undefined)),
    PORT: z.coerce.number().default(3000),
  },
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app isn't
   * built with invalid env vars.
   */
  server: {
    APP_URL: z.string().url(),
    DATABASE_URL: z.string().url(),
    APP_DOMAIN: z.string(),
    CONTACT_URL: z.string().url(),
  },
  /**
   * Specify your client-side environment variables schema here.
   * For them to be exposed to the client, prefix them with `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_APP_DOMAIN: z.string(),
    NEXT_PUBLIC_APP_URL: z.string().url(),
  },
  /**
   * Destructure all variables from `process.env` to make sure they aren't tree-shaken away.
   */
  runtimeEnv: {
    APP_URL: process.env.APP_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    VERCEL_URL: process.env.VERCEL_URL,
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL,
    APP_DOMAIN: process.env.APP_DOMAIN,
    NEXT_PUBLIC_APP_DOMAIN: process.env.NEXT_PUBLIC_APP_DOMAIN,
    CONTACT_URL: process.env.CONTACT_URL
  },
  skipValidation:
    !!process.env.CI ||
    !!process.env.SKIP_ENV_VALIDATION ||
    process.env.npm_lifecycle_event === "lint",
});
