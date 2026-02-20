import {
    boolean,
    integer,
    numeric,
    pgTable,
    serial,
    timestamp,
    uuid,
    varchar,
} from "drizzle-orm/pg-core";
import { category } from "./category";
import { account } from "./account";
import { user } from "./auth";
import { createInsertSchema } from "drizzle-zod";
import z from "zod";
import { InferSelectModel } from "drizzle-orm";
import { goal } from "./goal";
import { subscription } from "./subscription";
import { attachment } from "./attachment";
import { payee } from './payee';

// Forward references - these will be imported when needed
// goal, subscription, attachment, payee tables

export const transaction = pgTable("transactions", {
    id: uuid().defaultRandom().primaryKey(),
    title: varchar({ length: 255 }),
    notes: varchar({ length: 255 }),
    transactionType: varchar("transaction_type", { length: 20 }),
    categoryId: uuid("category_id").references(() => category.id),
    goalId: uuid("goal_id").references(() => goal.id),
    subscriptionId: uuid("subscription_id").references(() => subscription.id),
    accountId: uuid("account_id").references(() => account.id),
    amount: numeric({ precision: 12, scale: 2 }).notNull(),
    transactionDate: timestamp("transaction_date"),
    attachmentId: uuid("attachment_id").references(() => attachment.id),
    userId: uuid("user_id").references(() => user.id).notNull(),
    payeeId: uuid("payee_id"),
    status: varchar({ length: 20 }),
    isDeleted: boolean("is_deleted").default(false),
    reconciliationDate: timestamp("reconciliation_date"),
    createdBy: uuid("created_by").references(() => user.id),
    updatedBy: uuid("updated_by").references(() => user.id),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").$onUpdateFn(() => new Date()),
});


export const TransactionCreateSchema = createInsertSchema(transaction);
export const TransactionFormSchema = TransactionCreateSchema.omit({
    userId: true,
    payeeId: true,
    createdAt: true,
    createdBy: true,
    updatedAt: true,
    updatedBy: true
});

export type TTransactionFormValues = z.infer<typeof TransactionFormSchema>;
export type TTransaction = InferSelectModel<typeof transaction>;