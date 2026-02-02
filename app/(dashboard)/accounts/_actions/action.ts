"use server";

import { TAccountInsert } from "@/schemas/account";
import { createAccount, updateAccountById } from "@/services/account.service";
import { redirect, RedirectType } from "next/navigation";


export async function createAccountAction(formData: FormData) {
    const rawData: TAccountInsert = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        balance: formData.get("balance") as string,
        includeInNetWorth: formData.get("includeInNetworth") === "on",
        isPrimaryAccount: formData.get("primaryAccount") === "on",
        isActive: formData.get("isActive") === "on",
        // currencyCodeId: Number(formData.get("currencyCodeId")),
        accountType: (formData.get("accountType") as "current" | "saving" | "investment" | null),
        userId: Number(formData.get("userId")),
    };

    createAccount(rawData);

    redirect("/accounts", RedirectType.replace);

    // const validatedData = accountCreateSchema.parse(rawData);

    // console.log("Form Data", formData);
    // console.log("Validated Data", validatedData);

    // const insertedAccount = await db.insert(account).values(validatedData).returning();
    // console.log("Inserted Account", insertedAccount);
}

export async function updateAccountAction(accountId: number, formData: FormData) {
    const rawData: Partial<TAccountInsert> = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        balance: formData.get("balance") as string,
        includeInNetWorth: formData.get("includeInNetworth") === "on",
        isPrimaryAccount: formData.get("primaryAccount") === "on",
        isActive: formData.get("isActive") === "on",
        // currencyCodeId: Number(formData.get("currencyCodeId")),
        accountType: (formData.get("accountType") as "current" | "saving" | "investment" | null),
    }

    updateAccountById(accountId, rawData);
    redirect("/accounts", RedirectType.replace);
}