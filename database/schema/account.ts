import { numeric, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { appSchema } from "./schema";

export const accountTypes = appSchema.enum('account_types', ["current", "saving", "investment"]);

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