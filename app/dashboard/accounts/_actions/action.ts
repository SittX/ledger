"use server";

import { createAccount, updateAccountById } from "@/services/account.service";
import { redirect, RedirectType } from "next/navigation";
import { TAccountFormValues } from "@/database/schema/account";

export async function accountCreateAction(data: TAccountFormValues) {
    await createAccount(data);
    redirect("/dashboard/accounts", RedirectType.replace);
}

export async function accountUpdateAction(accountId: number, data: TAccountFormValues) {
    await updateAccountById(accountId, data);
    redirect("/dashboard/accounts", RedirectType.replace);
}

