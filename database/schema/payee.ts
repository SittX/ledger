import {
    boolean,
    integer,
    pgTable,
    serial,
    timestamp,
    uuid,
    varchar,
} from "drizzle-orm/pg-core";
import { user } from "./user";

export const payee = pgTable("payees", {
    id: serial().primaryKey(),
    name: varchar({ length: 255 }).notNull(),
    phone: varchar({ length: 20 }),
    website: varchar({ length: 255 }),
    notes: varchar({ length: 500 }),
    isFavorite: boolean("is_favorite").default(false),
    userId: uuid("user_id").references(() => user.id).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").$onUpdateFn(() => new Date()),
});
