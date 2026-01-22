import {
    boolean,
    integer,
    pgTable,
    serial,
    timestamp,
    varchar,
} from "drizzle-orm/pg-core";
import { appSchema } from "./schema";
import { profile } from "./profile";

export const payee = pgTable("payees", {
    id: serial().primaryKey(),
    name: varchar({ length: 255 }).notNull(),
    phone: varchar({ length: 20 }),
    website: varchar({ length: 255 }),
    notes: varchar({ length: 500 }),
    isFavorite: boolean("is_favorite").default(false),
    userId: integer("user_id").references(() => profile.id).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").$onUpdateFn(() => new Date()),
});
