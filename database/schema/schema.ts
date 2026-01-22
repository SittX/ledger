import { pgSchema, uuid } from "drizzle-orm/pg-core";

export const appSchema = pgSchema("app");

// Note: auth.users is managed by Supabase, so we don't define it here
// Foreign keys to auth.users can be added manually in migrations if needed
export const authSchema = pgSchema("auth");

export const users = authSchema.table("users", {
    id: uuid("id").primaryKey(),
});