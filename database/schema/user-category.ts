import { foreignKey, integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { appSchema } from "./schema";
import { profile } from "./profile";

// User-defined categories - separate from system categories
export const userCategory = pgTable("user_categories", {
    id: serial().primaryKey(),
    title: varchar({ length: 255 }).notNull(),
    description: varchar({ length: 255 }),
    categoryType: varchar("category_type", { length: 30 }),
    icon: varchar({ length: 10 }),
    color: varchar({ length: 10 }).default("2fc2db"),
    parentId: integer("parent_id"),
    userId: integer("user_id").references(() => profile.id).notNull(),
},
    (table) => [
        foreignKey({
            columns: [table.parentId],
            foreignColumns: [table.id],
            name: "user_category_parent_id_fk",
        }),
    ],
);
