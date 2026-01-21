import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const currency = pgTable("currency", {
    id: serial().primaryKey(),
    name: varchar("name", { length: 30 }).unique(),
    currencyCode: varchar("currency_code", { length: 10 }).unique(
        "currency_code_unique",
    ),
    symbol: varchar("symbol", { length: 10 }).unique("currency_symbol_unique"),
});
