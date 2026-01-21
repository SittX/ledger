import {
    integer,
    numeric,
    serial,
    timestamp,
    varchar,
} from "drizzle-orm/pg-core";
import { appSchema } from "./schema";
import { currency } from "./curency";

export const accountTypes = appSchema.enum("account_types", [
    "current",
    "saving",
    "investment",
]);

export const account = appSchema.table("accounts", {
    id: serial().primaryKey(),
    accountType: accountTypes("account_type").default("current"),
    balance: numeric({ precision: 100, scale: 2 }),
    currencyId: integer("currency_code_id").references(() => currency.id),
    icon: varchar({ length: 80 }),
    color: varchar({ length: 10 }).default("2fc2db"),
    createdAt: timestamp().defaultNow(),
    updatedAt: timestamp().$onUpdateFn(() => new Date()),
});
