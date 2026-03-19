import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
// Note: `@shared/schema` contains zod validation/types, not Drizzle table definitions.
// Do not pass it into `drizzle()` as the ORM schema. If you have Drizzle table
// definitions, import them instead. For now we initialize Drizzle with the pool only.

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle(pool);
