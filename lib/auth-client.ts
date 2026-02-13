import { createAuthClient } from "better-auth/react";

const getBaseUrl = () => {
    if (process.env.VERCEL_URL) {
        return `https://${process.env.VERCEL_URL}`;
    }
    console.log("Vercel URL not found. Fallback to local development URL.");
    return "http://localhost:3000";
};

export const authClient = createAuthClient({
    baseURL: getBaseUrl(),
});