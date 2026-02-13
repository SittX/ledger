import { foreignKey, integer, pgTable, serial, uuid, varchar } from "drizzle-orm/pg-core";
import { user } from "./auth";


// User-defined categories - separate from system categories
export const userCategory = pgTable("user_categories", {
    id: serial().primaryKey(),
    title: varchar({ length: 255 }).notNull(),
    description: varchar({ length: 255 }),
    categoryType: varchar("category_type", { length: 30 }),
    icon: varchar({ length: 10 }),
    color: varchar({ length: 10 }).default("2fc2db"),
    parentCategoryId: integer("parent_category_id"),
    userId: uuid("user_id").references(() => user.id).notNull(),
},
    (table) => [
        foreignKey({
            columns: [table.parentCategoryId],
            foreignColumns: [table.id],
            name: "user_category_parent_id_fk",
        }),
    ],
);
