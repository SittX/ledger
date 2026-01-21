import { integer, numeric, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { appSchema } from "./schema";
import { account } from "./account";
import { category } from "./category";

export const transactionTypes = appSchema.enum("transaction_types", ["expense", "income"]);

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