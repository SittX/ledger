import {
    integer,
    numeric,
    pgTable,
    serial,
    timestamp,
} from "drizzle-orm/pg-core";
import { account } from "./account";

export const transfer = pgTable("transfers", {
    id: serial().primaryKey(),
    fromAccountId: integer("from_account_id").references(() => account.id).notNull(),
    toAccountId: integer("to_account_id").references(() => account.id).notNull(),
    amount: numeric({ precision: 12, scale: 2 }).notNull(),
    exchangeRate: numeric("exchange_rate", { precision: 12, scale: 6 }),
    transactionDate: timestamp("transaction_date"),
    fee: numeric({ precision: 12, scale: 2 }),
});
