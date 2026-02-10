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
import { user } from "./user";

// Forward references - these will be imported when needed
// goal, subscription, attachment, payee tables

export const transaction = pgTable("transactions", {
    id: serial().primaryKey(),
    title: varchar({ length: 255 }),
    notes: varchar({ length: 255 }),
    transactionType: varchar("transaction_type", { length: 20 }),
    categoryId: integer("category_id").references(() => category.id),
    goalId: integer("goal_id"),
    subscriptionId: integer("subscription_id"),
    accountId: integer("account_id").references(() => account.id),
    amount: numeric({ precision: 12, scale: 2 }).notNull(),
    transactionDate: timestamp("transaction_date"),
    attachmentId: integer("attachment_id"),
    userId: uuid("user_id").references(() => user.id).notNull(),
    payeeId: integer("payee_id"),
    status: varchar({ length: 20 }),
    isDeleted: boolean("is_deleted").default(false),
    reconciliationDate: timestamp("reconciliation_date"),
    createdBy: uuid("created_by").references(() => user.id),
    updatedBy: uuid("updated_by").references(() => user.id),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").$onUpdateFn(() => new Date()),
});
