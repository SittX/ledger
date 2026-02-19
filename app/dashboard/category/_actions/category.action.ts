"use server";

import { db } from "@/database";
import { category, TCategoryFormValues } from "@/database/schema/category";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function categoryCreateAction(data: TCategoryFormValues) {
    const userId = await getSessionUserId();

    await db.insert(category)
        .values({ ...data, userId })
        .returning();

    revalidatePath("/dashboard/category")
    redirect("/dashboard/category")
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