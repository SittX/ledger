"use server";
import { TTransactionFormValues } from '../../../../database/schema/transaction';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createNewTransaction } from '@/services/transaction.service';

export async function transactionCreateAction(transactionType: "Income" | "Expense" | "Transfer", values: TTransactionFormValues) {
    await createNewTransaction(values, transactionType);

    revalidatePath("/dashboard/transactions");
    redirect("/dashboard/transactions")
}

