import { db } from "@/database";
import { account } from "@/database/schema";
import { TAccount, TAccountInsert } from '@/types/account';
import { eq } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";

export function getAllAccounts(userId: number): Promise<TAccount[]> {
    return db.select().from(account);
}

export function getAccountById(id: number): Promise<TAccount | undefined> {
    return db.select().from(account).where(eq(account.id, id)).then((rows) => rows[0]);
}

export async function createAccount(payload: TAccountInsert): Promise<TAccount | undefined> {
    console.log(payload);
    const accountCreateSchema = createInsertSchema(account);
    const data = accountCreateSchema.parse(payload);

    return db.insert(account).values(data).returning().then((rows) => rows[0]);
}

export async function updateAccountById(id: number, payload: Partial<TAccountInsert>): Promise<TAccount | undefined> {
    return db.update(account)
        .set(payload)
        .where(eq(account.id, id))
        .returning()
        .then((rows) => rows[0]);
};


