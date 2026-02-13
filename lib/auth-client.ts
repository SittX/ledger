import { createAuthClient } from "better-auth/react";

const getBaseUrl = () => {
    const vercelUrl = process.env.NEXT_PUBLIC_VERCEL_URL || process.env.VERCEL_URL;
    if (vercelUrl) {
        return `https://${vercelUrl}`;
    }
    console.log("Vercel URL not found. Fallback to local development URL.");
    return "http://localhost:3000";
};

export const authClient = createAuthClient({
    baseURL: getBaseUrl(),
});