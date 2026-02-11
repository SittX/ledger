// import { pgTable, serial, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
// import { appSchema } from "./schema";

// export const profile = pgTable("profiles", {
//     id: serial().primaryKey(),
//     userId: uuid("user_id").references(() => users.id),
//     fullName: varchar("full_name", { length: 255 }),
//     avatarUrl: text("avatar_url"),
//     timezone: varchar("timezone", { length: 50 }),
//     createdAt: timestamp("created_at").defaultNow(),
//     updatedAt: timestamp("updated_at").$onUpdateFn(() => new Date()),
// });
