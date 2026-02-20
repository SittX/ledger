import { db } from "@/database";
import { account, transaction } from "@/database/schema";
import { TTransaction, TTransactionFormValues } from "@/database/schema/transaction";
import { getSessionUserId } from "@/lib/auth-utils";
import { eq } from "drizzle-orm";

export async function createNewTransaction(data: TTransactionFormValues, transactionType: string) {
    const accountId = data.accountId as string;

    const selectedAccount = await db.select()
        .from(account)
        .where(eq(account.id, accountId));

    const userId = await getSessionUserId();

    await db.insert(transaction)
        .values({ ...data, userId, transactionType });

    const existingBalance = Number(selectedAccount[0].balance);
    let finalBalance = existingBalance;
    if (transactionType == "Expense") {
        finalBalance = existingBalance - Number(data.amount);
    } else {
        finalBalance = existingBalance + Number(data.amount);
    }

    console.log("Final Balance", finalBalance);

    await db.update(account)
        .set({ balance: finalBalance.toString() })
        .where(eq(account.id, accountId))
}

export function getAllTransactionForUser(userId: string): Promise<TTransaction[]> {
    return db.select().from(transaction)
        .where(eq(transaction.userId, userId));
}

export function getAllTransactionForAccount(accountId: string): Promise<TTransaction[]> {
    return db.select().from(transaction)
        .where(eq(transaction.accountId, accountId));
}