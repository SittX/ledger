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

const getBaseUrl = () => {
    if (process.env.VERCEL_URL) {
        return `https://${process.env.VERCEL_URL}`;
    }
    return "http://localhost:3000";
};

export const auth = betterAuth({
    baseURL: getBaseUrl(),
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