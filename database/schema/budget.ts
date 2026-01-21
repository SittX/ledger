import {
    boolean,
    date,
    numeric,
    pgTable,
    serial,
    timestamp,
    varchar,
} from "drizzle-orm/pg-core";
import { appSchema } from "./schema";

export const budgetTypes = appSchema.enum("budget_types", [
    "saving",
    "expense",
    "income",
]);

export const budget = appSchema.table("budgets", {
    id: serial().primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    description: varchar("description", { length: 500 }),
    amountLimit: numeric("amount_limit", { precision: 100, scale: 2 }).notNull(),
    period: varchar("period", { enum: ["daily", "weekly", "monthly", "yearly"], length: 10, }).notNull(),
    startDate: date("start_date").notNull(),
    endDate: date("end_date").notNull(),
    isRollover: boolean("is_rollover").default(false),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});
