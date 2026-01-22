import {
    date,
    integer,
    numeric,
    pgTable,
    serial,
    timestamp,
    varchar,
} from "drizzle-orm/pg-core";
import { appSchema } from "./schema";
import { category } from "./category";
import { profile } from "./profile";

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
    userId: integer("user_id").references(() => profile.id).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").$onUpdateFn(() => new Date()),
});
