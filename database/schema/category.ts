import { foreignKey, integer, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { appSchema } from "./schema";

export const category = appSchema.table("categories", {
    id: serial().primaryKey(),
    title: varchar({ length: 255 }).notNull(),
    description: varchar({ length: 255 }),
    icon: varchar({ length: 80 }),
    color: varchar({ length: 10 }).default("2fc2db"),
    parentId: integer("parent_id"),
    createdAt: timestamp().defaultNow(),
    updatedAt: timestamp().$onUpdateFn(() => new Date())
}, (table) => [
    foreignKey({
        columns: [table.parentId],
        foreignColumns: [table.id],
        name: "category_parent_id_fk"
    })
])