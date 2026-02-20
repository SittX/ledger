"use server";

import { TCategoryFormValues } from "@/database/schema/category";
import { createNewCategory } from "@/services/category.service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function categoryCreateAction(data: TCategoryFormValues) {
    await createNewCategory(data);

    revalidatePath("/dashboard/category")
    redirect("/dashboard/category")
}
