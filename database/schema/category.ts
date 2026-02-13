import { foreignKey, integer, pgTable, serial, uuid, varchar } from "drizzle-orm/pg-core";
import { user } from "./auth";

// System/base categories - no user_id, these are application-provided defaults
export const category = pgTable("categories", {
    id: serial().primaryKey(),
    title: varchar({ length: 255 }).notNull(),
    description: varchar({ length: 255 }),
    categoryType: varchar("category_type", { length: 30 }),
    icon: varchar({ length: 10 }),
    color: varchar({ length: 10 }).default("2fc2db"),
    parentId: integer("parent_id"),
    userId: uuid("user_id").references(() => user.id)
},
    (table) => [
        foreignKey({
            columns: [table.parentId],
            foreignColumns: [table.id],
            name: "category_parent_id_fk",
        }),
    ],
);
