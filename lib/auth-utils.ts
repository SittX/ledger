import { headers } from "next/headers";
import { auth } from "./auth";

export async function getSessionUserId(): Promise<string> {
    const sessionHeaders = await headers();

    const session = await auth.api.getSession({
        headers: sessionHeaders,
    });

    if (!session || !session.user) {
        throw new Error("Unauthorized: You must be logged in to create an account.");
    }

    const userId = session.user.id;
    return userId;
}