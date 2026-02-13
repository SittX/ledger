import { db } from "@/database";
import {
    user,
    session,
    userAccount,
    verification,
    userRelations,
    sessionRelations,
    accountRelations,
} from "@/database/schema/auth";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL,
    secret: process.env.BETTER_AUTH_SECRET,
    advanced: {
        database: {
            generateId: "uuid",
        },
    },
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: {
            user,
            session,
            account: userAccount,
            verification,
            userRelations,
            sessionRelations,
            accountRelations,
        },
    }),
    emailAndPassword: {
        enabled: true,
    },
    plugins: [nextCookies()],
});