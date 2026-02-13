import {
    date,
    integer,
    numeric,
    pgTable,
    serial,
    timestamp,
    uuid,
    varchar,
} from "drizzle-orm/pg-core";
import { category } from "./category";
import { user } from "./auth";

export const goal = pgTable("goals", {
    id: serial().primaryKey(),
    title: varchar({ length: 255 }).notNull(),
    notes: varchar({ length: 255 }),
    amount: numeric({ precision: 12, scale: 2 }).notNull(),
    currentAmount: numeric("current_amount", { precision: 12, scale: 2 }).default("0"),
    startDate: date("start_date").defaultNow(),
    dueDate: date("due_date"),
    categoryId: integer("category_id").references(() => category.id),
    icon: varchar({ length: 10 }),
    color: varchar({ length: 10 }).default("2fc2db"),
    userId: uuid("user_id").references(() => user.id).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").$onUpdateFn(() => new Date()),
});
