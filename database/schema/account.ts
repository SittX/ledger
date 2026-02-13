import {
    boolean,
    integer,
    numeric,
    pgEnum,
    pgTable,
    serial,
    timestamp,
    uuid,
    varchar,
} from "drizzle-orm/pg-core";
import { currency } from "./currency";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { user } from "./auth";

export const accountTypes = pgEnum("account_types", [
    "current",
    "saving",
    "investment",
]);

export const account = pgTable("accounts", {
    id: serial().primaryKey(),
    title: varchar({ length: 255 }).notNull(),
    description: varchar({ length: 500 }),
    accountType: accountTypes("account_type").default("current"),
    balance: numeric({ precision: 12, scale: 2 }),
    isPrimaryAccount: boolean("is_primary_account").default(false),
    currencyCodeId: integer("currency_code_id").references(() => currency.id),
    icon: varchar({ length: 10 }),
    color: varchar({ length: 10 }).default("2fc2db"),
    userId: uuid("user_id").references(() => user.id).notNull(),
    includeInNetWorth: boolean("include_in_net_worth").default(true),
    isActive: boolean("is_active").default(false),
    createdBy: uuid("created_by").references(() => user.id),
    updatedBy: uuid("updated_by").references(() => user.id),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").$onUpdateFn(() => new Date()),
});

export const AccountCreateSchema = createInsertSchema(account);
export const AccountSelectSchema = createSelectSchema(account);