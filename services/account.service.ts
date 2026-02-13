import { db } from "@/database";
import { account } from "@/database/schema";
import { AccountFormSchema, TAccount, TAccountFormValues } from "@/database/schema/account";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

export async function getAllAccounts(): Promise<TAccount[]> {
    const sessionHeaders = await headers();

    const session = await auth.api.getSession({
        headers: sessionHeaders,
    });

    if (!session || !session.user) {
        throw new Error("Unauthorized: You must be logged in to view accounts.");
    }

    const userId = session.user.id;

    return db.select().from(account).where(eq(account.userId, userId));
}

export function getAccountById(id: number): Promise<TAccount | undefined> {
    return db.select().from(account).where(eq(account.id, id)).then((rows) => rows[0]);
}

export async function createAccount(payload: TAccountFormValues): Promise<TAccount | undefined> {
    const sessionHeaders = await headers();

    const session = await auth.api.getSession({
        headers: sessionHeaders,
    });

    if (!session || !session.user) {
        throw new Error("Unauthorized: You must be logged in to create an account.");
    }

    const userId = session.user.id;

    const validatedData = AccountFormSchema.parse(payload);

    return db.insert(account).values({ ...validatedData, userId }).returning().then((rows) => rows[0]);
}

export async function updateAccountById(id: number, payload: TAccountFormValues): Promise<TAccount | undefined> {
    return db.update(account)
        .set(payload)
        .where(eq(account.id, id))
        .returning()
        .then((rows) => rows[0]);
};



