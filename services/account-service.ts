import { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { db } from "@/database";
import { account } from '@/database/schema';
import { createInsertSchema } from 'drizzle-zod';

// TODO: Implement account creation logic
// - Zod Validation
// - Database Insertion (Drizzle)
// - Error Handling
// - Return Created Account Data

type Account = InferSelectModel<typeof account>;
type AccountInsert = InferInsertModel<typeof account>;
const accountCreateSchema = createInsertSchema(account);

export function getAllAccountsByUserId(userId: number): Promise<Account[]> {
    return db.select().from(account);
}

export async function createAccount(payload: AccountInsert): Promise<Account | undefined> {
    const data = accountCreateSchema.parse(payload);

    const [created] = await db.insert(account).values(data).returning();
    return created;
}


