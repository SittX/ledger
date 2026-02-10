import {
    date,
    integer,
    pgEnum,
    pgTable,
    serial,
    timestamp,
    uuid,
    varchar,
} from "drizzle-orm/pg-core";
import { category } from "./category";
import { user } from "./user";

export const subscriptionType = pgEnum("subscription_type", [
    "monthly",
    "yearly",
    "quarterly",
]);

export const subscription = pgTable("subscriptions", {
    id: serial().primaryKey(),
    title: varchar({ length: 255 }).notNull(),
    notes: varchar({ length: 255 }),
    categoryId: integer("category_id").references(() => category.id),
    subscriptionType: subscriptionType("subscription_type"),
    recurringDays: integer("recurring_days"),
    dueDate: date("due_date"),
    userId: uuid("user_id").references(() => user.id).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").$onUpdateFn(() => new Date()),
});
