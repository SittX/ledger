import {
    boolean,
    integer,
    numeric,
    pgEnum,
    pgTable,
    serial,
    timestamp,
    varchar,
} from "drizzle-orm/pg-core";
import { currency } from "./curency";
import { profile } from "./profile";

export const accountTypes = pgEnum("account_types", [
    "current",
    "saving",
    "investment",
]);

export const account = pgTable("accounts", {
    id: serial().primaryKey(),
    accountType: accountTypes("account_type").default("current"),
    balance: numeric({ precision: 12, scale: 2 }),
    isPrimaryAccount: boolean("is_primary_account").default(false),
    currencyCodeId: integer("currency_code_id").references(() => currency.id),
    icon: varchar({ length: 10 }),
    color: varchar({ length: 10 }).default("2fc2db"),
    userId: integer("user_id").references(() => profile.id).notNull(),
    includeInNetWorth: boolean("include_in_net_worth").default(true),
    isActive: boolean("is_active").default(false),
    createdBy: integer("created_by").references(() => profile.id),
    updatedBy: integer("updated_by").references(() => profile.id),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").$onUpdateFn(() => new Date()),
});
