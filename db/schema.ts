import { foreignKey, integer, numeric, pgSchema, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const appSchema = pgSchema("app");

export const accountTypes = appSchema.enum('account_types', ["current", "saving", "investment"]);

export const transactionTypes = appSchema.enum("transaction_types", ["expense", "income"]);

export const account = appSchema.table("accounts", {
    id: serial().primaryKey(),
    accountType: accountTypes("account_type").default("current"),
    balance: numeric({ precision: 100, scale: 2 }),
    currency: varchar({ length: 3 }),
    icon: varchar({ length: 80 }),
    color: varchar({ length: 10 }).default("2fc2db"),
    createdAt: timestamp().defaultNow(),
    updatedAt: timestamp().$onUpdateFn(() => new Date())
})

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

export const transaction = appSchema.table("transactions", {
    id: serial().primaryKey(),
    title: varchar({ length: 255 }),
    transactionType: transactionTypes("transaction_type"),
    description: text(),
    amount: numeric({ precision: 100, scale: 2 }),
    transaction_datetime: timestamp().defaultNow(),
    categoryId: integer("category_id").references(() => category.id),
    accountId: integer("account_id").references(() => account.id),
    createdAt: timestamp().defaultNow(),
    updatedAt: timestamp().$onUpdateFn(() => new Date())
})