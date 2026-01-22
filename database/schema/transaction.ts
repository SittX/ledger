import {
    boolean,
    integer,
    numeric,
    pgTable,
    serial,
    timestamp,
    varchar,
} from "drizzle-orm/pg-core";
import { appSchema } from "./schema";
import { category } from "./category";
import { account } from "./account";
import { profile } from "./profile";

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
    userId: integer("user_id").references(() => profile.id).notNull(),
    payeeId: integer("payee_id"),
    status: varchar({ length: 20 }),
    isDeleted: boolean("is_deleted").default(false),
    reconciliationDate: timestamp("reconciliation_date"),
    createdBy: integer("created_by").references(() => profile.id),
    updatedBy: integer("updated_by").references(() => profile.id),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").$onUpdateFn(() => new Date()),
});
