'use client';
import { TAccount } from '@/database/schema/account';
import { TransactionFormSchema, TTransactionFormValues } from '@/database/schema/transaction';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { transactionCreateAction } from '../_actions/action';

type TransactionFormProps = {
    action: 'Income' | 'Expense' | 'Transfer';
    accounts: TAccount[];
};

/**
 * TODO:
 * 1. Setup RHF with zod
 * 2. Register input with RHF
 * 3. Handle submitted value with form action
 */

export default function TransactionForm({ action, accounts }: TransactionFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TTransactionFormValues>({
        resolver: zodResolver(TransactionFormSchema),
    });

    console.log(errors);

    async function onSubmit(data: TTransactionFormValues) {
        transactionCreateAction(action, data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="card">
                <div className="card-body">
                    <section className="space-y-4">
                        <h3 className="text-lg font-semibold">{action} Account</h3>
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            <label className="select">
                                <span className="label">Account</span>
                                <select
                                    className="select"
                                    aria-label="Account"
                                    {...register('accountId', { valueAsNumber: true })}>
                                    <option value="" disabled>
                                        Pick an account
                                    </option>
                                    {accounts.map((account) => {
                                        return (
                                            <option key={account.id} value={account.id}>
                                                {account.title}
                                            </option>
                                        );
                                    })}
                                </select>
                            </label>
                        </div>
                    </section>

                    <div className="divider"></div>

                    <section className="space-y-4">
                        <h3 className="text-lg font-semibold">Amount & Date</h3>
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            <label className="floating-label">
                                <span>Amount {action == 'Income' ? 'Credit (+)' : 'Debit (-)'}</span>
                                <input
                                    type="number"
                                    id="amount"
                                    className="input required number w-full"
                                    placeholder="Amount"
                                    {...register('amount')}
                                    required
                                />
                            </label>

                            <label className="floating-label">
                                <span>Date & Time</span>
                                <input
                                    type="datetime-local"
                                    id="transaction_datetime"
                                    className="input required date w-full"
                                    {...register('transactionDate', { valueAsDate: true })}
                                    required
                                />
                            </label>
                        </div>
                    </section>

                    <div className="divider"></div>

                    <section className="space-y-4">
                        <h3 className="text-lg font-semibold">Description</h3>
                        <div className="space-y-6">
                            <label className="floating-label">
                                <span>Title</span>
                                <input
                                    type="text"
                                    id="title"
                                    className="input required w-full"
                                    placeholder="Title"
                                    {...register('title')}
                                    required
                                />
                            </label>

                            <label className="floating-label">
                                <span>Notes (Optional)</span>
                                <textarea
                                    id="notes"
                                    className="textarea w-full"
                                    placeholder="Notes (Optional)"
                                    {...register('notes')}
                                />
                            </label>
                        </div>
                    </section>

                    <div className="divider"></div>

                    <section className="space-y-4">
                        <h3 className="text-lg font-semibold">Details</h3>
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            <label className="select">
                                <span className="label">Category</span>
                                <select
                                    className="select"
                                    aria-label="Account type"
                                    {...register('categoryId', { valueAsNumber: true })}>
                                    <option value="" disabled>
                                        Pick a category
                                    </option>
                                    <option value="1">Food & Dining</option>
                                    <option value="2">Subscriptions</option>
                                    <option value="3">Drinks</option>
                                    <option value="4">Shopping</option>
                                    <option value="5">Transportation</option>
                                    <option value="6">Utilities</option>
                                    <option value="7">Entertainment</option>
                                    <option value="8">Health & Wellness</option>
                                </select>
                            </label>

                            <label className="floating-label">
                                <span>Payee</span>
                                <input
                                    type="text"
                                    id="payee"
                                    className="input required w-full"
                                    placeholder="Payee"
                                    {...register('payeeId', { valueAsNumber: true })}
                                />
                            </label>
                        </div>
                    </section>

                    <div className="divider"></div>

                    <section className="space-y-4">
                        <h3 className="text-lg font-semibold">Attachments</h3>
                        <div className="space-y-6">
                            <div>
                                <label className="label">
                                    <span className="label-text">Receipts or Documents (Optional)</span>
                                </label>
                                <input
                                    type="file"
                                    id="attachments"
                                    name="attachments"
                                    className="file-input file-input-bordered w-full"
                                    multiple
                                    accept="image/*,application/pdf"
                                />
                                <p className="text-base-content/40 mt-1 text-xs">Supported formats: JPG, PNG, PDF</p>
                            </div>
                        </div>
                    </section>

                    <section className="card-actions justify-end">
                        <button className="btn btn-ghost" type="reset">
                            Cancel
                        </button>
                        <button className="btn btn-primary" type="submit">
                            Submit
                        </button>
                    </section>
                </div>
            </div>
        </form>
    );
}
