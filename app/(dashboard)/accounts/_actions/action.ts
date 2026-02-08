"use server";

import { TAccountInsert } from "@/types/account";
import { createAccount, updateAccountById } from "@/services/account.service";
import { redirect, RedirectType } from "next/navigation";
import { db } from "@/database";
import { currency } from "@/database/schema";
import { eq } from "drizzle-orm";
import { AccountCreateSchema } from "@/database/schema/account";


export async function accountCreateAction(formData: FormData) {
    const rawData = validateRawFormData(formData);

    await resolveCurrencyCodeIdFromForm(rawData, formData);

    const validated = AccountCreateSchema.safeParse(rawData);
    if (!validated.success) {
        throw new Error(`Invalid account data: ${validated.error.message}`);
    }

    await createAccount(validated.data);
    redirect("/accounts", RedirectType.replace);
}

export async function updateAccountAction(accountId: number, formData: FormData) {
    const rawData = validateRawFormData(formData);

    await resolveCurrencyCodeIdFromForm(rawData, formData);

    const validated = AccountCreateSchema.partial().safeParse(rawData);
    if (!validated.success) {
        throw new Error(`Invalid account data: ${validated.error.message}`);
    }

    await updateAccountById(accountId, validated.data);
    redirect("/accounts", RedirectType.replace);
}

export async function accountUpsertAction(formData: FormData) {
    const idRaw = formData.get("id");
    const id = idRaw ? Number(idRaw) : undefined;

    if (id) {
        return updateAccountAction(id, formData);
    }

    return accountCreateAction(formData);
}

function validateRawFormData(formData: FormData): Partial<TAccountInsert> {
    const titleRaw = formData.get("title");
    const descriptionRaw = formData.get("description");
    const balanceRaw = formData.get("balance");

    const rawData: Partial<TAccountInsert> = {
        title: titleRaw ? String(titleRaw) : undefined,
        description:
            descriptionRaw === null || descriptionRaw === ""
                ? null
                : String(descriptionRaw),
        balance: balanceRaw === null || balanceRaw === "" ? null : String(balanceRaw),
        includeInNetWorth: formData.get("includeInNetWorth") === "on",
        isPrimaryAccount: formData.get("isPrimaryAccount") === "on",
        isActive: formData.get("isActive") === "on",
        accountType: (formData.get("accountType") as "current" | "saving" | "investment" | null),
    }

    return rawData;
}

async function resolveCurrencyCodeIdFromForm(rawData: Partial<TAccountInsert>, formData: FormData) {
    const currencyCode = formData.get("currencyCode") as string | null;
    if (!currencyCode) return;

    const found = await db.select().from(currency).where(eq(currency.currencyCode, currencyCode)).then((r) => r[0]);
    if (found) rawData.currencyCodeId = found.id;
}