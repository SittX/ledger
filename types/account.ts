import { account } from '@/database/schema';
import { InferInsertModel, InferSelectModel } from 'drizzle-orm';

export type TAccount = InferSelectModel<typeof account>;
export type TAccountInsert = InferInsertModel<typeof account>;
