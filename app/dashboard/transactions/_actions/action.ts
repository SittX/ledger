"use server";
import { db } from '@/database';
import { transaction, TTransactionFormValues } from '../../../../database/schema/transaction';
import { account } from '@/database/schema';
import { eq } from 'drizzle-orm';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// TODO: This will be a DB transaction
export async function transactionCreateAction(
    transactionType: "Income" | "Expense" | "Transfer",
    values: TTransactionFormValues) {
    const userId = await getSessionUserId();
    console.log("Form values", values);

    const accountId = values.accountId as string;

    const selectedAccount = await db.select()
        .from(account)
        .where(eq(account.id, accountId));

    await db.insert(transaction)
        .values({ ...values, userId, transactionType });

    const existingBalance = Number(selectedAccount[0].balance);
    let finalBalance = existingBalance;
    if (transactionType == "Expense") {
        finalBalance = existingBalance - Number(values.amount);
    } else {
        finalBalance = existingBalance + Number(values.amount);
    }

    console.log("Final Balance", finalBalance);

    await db.update(account)
        .set({ balance: finalBalance.toString() })
        .where(eq(account.id, accountId))

    revalidatePath("/dashboard/transactions");
    redirect("/dashboard/transactions")
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

