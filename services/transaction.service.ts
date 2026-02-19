import { db } from "@/database";
import { transaction } from "@/database/schema";
import { TTransaction } from "@/database/schema/transaction";
import { eq } from "drizzle-orm";

export function getAllTransactionForUser(userId: string): Promise<TTransaction[]> {
    return db.select().from(transaction)
        .where(eq(transaction.userId, userId));
}

export function getAllTransactionForAccount(accountId: string): Promise<TTransaction[]> {
    return db.select().from(transaction)
        .where(eq(transaction.accountId, accountId));
}