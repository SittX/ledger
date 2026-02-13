import { relations, sql } from "drizzle-orm";
import {
    pgSchema,
    index,
    foreignKey,
    uuid,
    text,
    timestamp,
    unique,
    boolean,
} from "drizzle-orm/pg-core";
import { account } from "./account";
import { budget } from "./budget";
import { category } from "./category";
import { goal } from "./goal";
import { payee } from "./payee";
import { subscription } from "./subscription";
import { transaction } from "./transaction";

export const neonAuth = pgSchema("neon_auth");

// Core better-auth tables (order: referenced tables first for FK resolution)

export const user = neonAuth.table("user", {
    id: uuid().defaultRandom().primaryKey().notNull(),
    name: text().notNull(),
    email: text().notNull(),
    emailVerified: boolean().notNull(),
    image: text(),
    createdAt: timestamp({ withTimezone: true, mode: "string" })
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
    updatedAt: timestamp({ withTimezone: true, mode: "string" })
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
    role: text(),
    banned: boolean(),
    banReason: text(),
    banExpires: timestamp({ withTimezone: true, mode: "string" }),
}, (table) => [unique("user_email_key").on(table.email)]);

export const session = neonAuth.table("session", {
    id: uuid().defaultRandom().primaryKey().notNull(),
    expiresAt: timestamp({ withTimezone: true, mode: "string" }).notNull(),
    token: text().notNull(),
    createdAt: timestamp({ withTimezone: true, mode: "string" })
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
    updatedAt: timestamp({ withTimezone: true, mode: "string" })
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
    ipAddress: text(),
    userAgent: text(),
    userId: uuid().notNull(),
}, (table) => [
    index("session_userId_idx").using("btree", table.userId.asc().nullsLast().op("uuid_ops")),
    foreignKey({
        columns: [table.userId],
        foreignColumns: [user.id],
        name: "session_userId_fkey",
    }).onDelete("cascade"),
    unique("session_token_key").on(table.token),
]);

export const userAccount = neonAuth.table("account", {
    id: uuid().defaultRandom().primaryKey().notNull(),
    accountId: text().notNull(),
    providerId: text().notNull(),
    userId: uuid().notNull(),
    accessToken: text(),
    refreshToken: text(),
    idToken: text(),
    accessTokenExpiresAt: timestamp({ withTimezone: true, mode: "string" }),
    refreshTokenExpiresAt: timestamp({ withTimezone: true, mode: "string" }),
    scope: text(),
    password: text(),
    createdAt: timestamp({ withTimezone: true, mode: "string" })
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
    updatedAt: timestamp({ withTimezone: true, mode: "string" })
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
}, (table) => [
    index("account_userId_idx").using("btree", table.userId.asc().nullsLast().op("uuid_ops")),
    foreignKey({
        columns: [table.userId],
        foreignColumns: [user.id],
        name: "account_userId_fkey",
    }).onDelete("cascade"),
]);

export const verification = neonAuth.table("verification", {
    id: uuid().defaultRandom().primaryKey().notNull(),
    identifier: text().notNull(),
    value: text().notNull(),
    expiresAt: timestamp({ withTimezone: true, mode: "string" }).notNull(),
    createdAt: timestamp({ withTimezone: true, mode: "string" })
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
    updatedAt: timestamp({ withTimezone: true, mode: "string" })
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
}, (table) => [
    index("verification_identifier_idx")
        .using("btree", table.identifier.asc().nullsLast().op("text_ops")),
]);

// Relations for better-auth Drizzle adapter (and app use)

export const userRelations = relations(user, ({ many }) => ({
    sessionInNeonAuths: many(session),
    accountInNeonAuths: many(userAccount),
    accounts_userId: many(account, {
        relationName: "accounts_userId_userInNeonAuth_id",
    }),
    accounts_createdBy: many(account, {
        relationName: "accounts_createdBy_userInNeonAuth_id",
    }),
    accounts_updatedBy: many(account, {
        relationName: "accounts_updatedBy_userInNeonAuth_id",
    }),
    categories: many(category),
    budgets: many(budget),
    goals: many(goal),
    payees: many(payee),
    subscriptions: many(subscription),
    transactions_userId: many(transaction, {
        relationName: "transactions_userId_userInNeonAuth_id",
    }),
    transactions_createdBy: many(transaction, {
        relationName: "transactions_createdBy_userInNeonAuth_id",
    }),
    transactions_updatedBy: many(transaction, {
        relationName: "transactions_updatedBy_userInNeonAuth_id",
    }),
}));

export const sessionRelations = relations(session, ({ one }) => ({
    userInNeonAuth: one(user, {
        fields: [session.userId],
        references: [user.id],
    }),
}));

export const accountRelations = relations(userAccount, ({ one }) => ({
    userInNeonAuth: one(user, {
        fields: [userAccount.userId],
        references: [user.id],
    }),
}));
