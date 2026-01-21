import { foreignKey, integer, serial, varchar } from "drizzle-orm/pg-core";
import { appSchema } from "./schema";

export const categoryTypes = appSchema.enum("category_types", [
    "expense",
    "income",
]);

export const category = appSchema.table(
    "categories",
    {
        id: serial().primaryKey(),
        name: varchar({ length: 255 }).notNull(),
        type: varchar({ length: 30 }).notNull(),
        description: varchar({ length: 255 }),
        icon: varchar({ length: 80 }),
        color: varchar({ length: 10 }).default("2fc2db"),
        parentId: integer("parent_id"),
    },
    (table) => [
        foreignKey({
            columns: [table.parentId],
            foreignColumns: [table.id],
            name: "category_parent_id_fk",
        }),
    ],
);
