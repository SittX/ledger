import { pgSchema, uuid } from "drizzle-orm/pg-core";

export const authSchema = pgSchema("neon_auth");

export const user = authSchema.table("user", {
  id: uuid("id").primaryKey(),
});
