import { Client } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";

import * as auth from "./schema/auth";
import * as post from "./schema/post";

export const schema = { ...auth, ...post };

export { mySqlTable as tableCreator } from "./schema/_table";

export * from "drizzle-orm";
export type * from "./schema/auth";
export type * from "./schema/post";


// export * from "drizzle-orm"だけではエクスポートされないので、
// 個別にエクスポート
export {
  union,
  unionAll,
  intersect,
  intersectAll,
  except,
  exceptAll 
} from 'drizzle-orm/mysql-core';

export const db = drizzle(
  new Client({
    url: process.env.DATABASE_URL,
  }).connection(),
  { schema },
);
