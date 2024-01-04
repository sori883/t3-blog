import { connect } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";

import * as auth from "../src/schema/auth";
import * as post from "../src/schema/post";

export const schema = { ...auth, ...post };

export { mySqlTable as tableCreator } from "../src/schema/_table";

export * from "drizzle-orm";
export type * from "../src/schema/auth";
export type * from "../src/schema/post";

// export * from "drizzle-orm"だけではエクスポートされないので、
// 個別にエクスポート
export {
  union,
  unionAll,
  intersect,
  intersectAll,
  except,
  exceptAll,
} from "drizzle-orm/mysql-core";

const connection = connect({
  host: process.env.DB_HOST!,
  username: process.env.DB_USERNAME!,
  password: process.env.DB_PASSWORD!,
});

export const db = drizzle(connection, { schema });
