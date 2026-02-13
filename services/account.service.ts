import { db } from "@/database";
import { account } from "@/database/schema";
import { AccountFormSchema, TAccount, TAccountFormValues } from "@/database/schema/account";
import { auth } from "@/lib/auth";
import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";

/**
 * 1. GetAllAccount
 * 2. GetAccountById
 * 3. Create Account 
 *      - Create new account
 *      - Is Primary Account should only be allowed to set to one account
 * 3. Update Account  
 *      - Should only allow to update if the account user is the logged in user
 * 4. Update update 
 * 4. Delete Account by Id 
 */

export async function getAllAccounts(): Promise<TAccount[]> {
    const userId = await getSessionUserId();

    return db.select()
        .from(account)
        .where(eq(account.userId, userId))
        .orderBy(account.createdAt);
}

export async function getAccountById(id: number): Promise<TAccount | undefined> {
    const userId = await getSessionUserId();

    const response = await db.select()
        .from(account)
        .where(and(eq(account.id, id), eq(account.userId, userId)));

    return response[0];
}

export async function createAccount(payload: TAccountFormValues): Promise<TAccount | undefined> {
    const userId = await getSessionUserId();

    const validatedData = AccountFormSchema.parse(payload);

    const response = await db.insert(account)
        .values({ ...validatedData, userId, isPrimaryAccount: false })
        .returning();

    return response[0];
}

export async function togglePrimaryAccount(id: number, status: boolean, formData: FormData): Promise<void> {
    const userId = await getSessionUserId();

    await db.update(account)
        .set({ isPrimaryAccount: status })
        .where(and(eq(account.id, id), eq(account.userId, userId)));
}


export async function updateAccountById(id: number, payload: TAccountFormValues): Promise<TAccount | undefined> {
    const userId = await getSessionUserId();

    const validatedData = AccountFormSchema.parse(payload);

    const response = await db.update(account)
        .set(validatedData)
        .where(and(eq(account.id, id), eq(account.userId, userId)))
        .returning();

    return response[0];
};

export async function deleteAccountById(id: number): Promise<void> {
    const userId = await getSessionUserId();

    await db.delete(account)
        .where(and(eq(account.id, id), eq(account.userId, userId)));
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

