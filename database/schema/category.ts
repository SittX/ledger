import { boolean, foreignKey, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { user } from "./auth";
import { createSelectSchema } from "drizzle-zod";
import z from "zod";

// System/base categories - isSystemDefault : True, these are application-provided defaults
export const category = pgTable("categories", {
    id: uuid().defaultRandom().primaryKey(),
    title: varchar({ length: 255 }).notNull(),
    description: varchar({ length: 255 }),
    categoryType: varchar("category_type", { length: 30 }),
    icon: varchar({ length: 10 }),
    color: varchar({ length: 10 }).default("2fc2db"),
    isSystemDefault: boolean("is_system_default").default(false),
    parentId: uuid("parent_id"),
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


export const CategorySchema = createSelectSchema(category);

export const CategoryFormValuesSchema = CategorySchema.omit({
    id: true,
    userId: true,
    isSystemDefault: true
}).extend({
    color: CategorySchema.shape.color.optional(),
    icon: CategorySchema.shape.icon.optional(),
    parentId: CategorySchema.shape.parentId.optional(),
});

export type TCategoryFormValues = z.infer<typeof CategoryFormValuesSchema>;
export type TCategory = z.infer<typeof CategorySchema>;