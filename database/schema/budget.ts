import {
    boolean,
    date,
    integer,
    numeric,
    pgEnum,
    pgTable,
    serial,
    timestamp,
    varchar,
} from "drizzle-orm/pg-core";
import { appSchema } from "./schema";
import { category } from "./category";
import { profile } from "./profile";

export const recurringFrequency = pgEnum("recurring_frequency", [
    "daily",
    "weekly",
    "monthly",
    "yearly",
]);

export const budget = pgTable("budgets", {
    id: serial().primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    notes: varchar("notes", { length: 255 }),
    budgetType: varchar("budget_type", { length: 30 }),
    amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
    startDate: date("start_date").notNull(),
    endDate: date("end_date"),
    isRecurring: boolean("is_recurring").default(false),
    recurringFrequency: recurringFrequency("recurring_frequency"),
    status: varchar("status", { length: 20 }).default("active"),
    alertThresholdPercentage: integer("alert_threshold_percentage").default(80),
    categoryId: integer("category_id").references(() => category.id),
    spentAmount: numeric("spent_amount", { precision: 12, scale: 2 }).default("0"),
    spentAtLastUpdate: timestamp("spent_at_last_update"),
    icon: varchar("icon", { length: 10 }),
    color: varchar("color", { length: 10 }).default("2fc2db"),
    userId: integer("user_id").references(() => profile.id).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").$onUpdateFn(() => new Date()),
});
