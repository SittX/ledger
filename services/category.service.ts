import { db } from "@/database";
import { category } from "@/database/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq } from 'drizzle-orm';
import { TCategory } from "@/database/schema/category";

export async function getAllCategoryForUser(): Promise<TCategory[]> {
    const userId = await getSessionUserId();

    return db.select().from(category)
        .where(eq(category.userId, userId));
}

// Utility functions
async function getSessionUserId() {
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