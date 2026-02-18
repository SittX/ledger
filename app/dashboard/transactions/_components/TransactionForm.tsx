import { TAccount } from '@/database/schema/account';

type TransactionFormProps = {
    action: 'Income' | 'Expense' | 'Transfer';
    accounts: TAccount[];
};

export default function TransactionForm({ action, accounts }: TransactionFormProps) {
    return (
        <form action={action}>
            <div className="card">
                <div className="card-body">
                    <section className="space-y-4">
                        <h3 className="text-lg font-semibold">{action} Account</h3>
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            <label className="select">
                                <span className="label">Account</span>
                                <select className="select" name="accountType" aria-label="Account type">
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
                                    name="amount"
                                    className="input required number w-full"
                                    placeholder="Amount"
                                    required
                                />
                            </label>

                            <label className="floating-label">
                                <span>Date & Time</span>
                                <input
                                    type="datetime-local"
                                    id="transaction_datetime"
                                    name="transaction_datetime"
                                    className="input required date w-full"
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
                                    name="title"
                                    className="input required w-full"
                                    placeholder="Title"
                                    required
                                />
                            </label>

                            <label className="floating-label">
                                <span>Notes (Optional)</span>
                                <textarea
                                    id="notes"
                                    name="notes"
                                    className="textarea w-full"
                                    placeholder="Notes (Optional)"
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
                                <select className="select" name="accountType" aria-label="Account type">
                                    <option value="" disabled>
                                        Pick a category
                                    </option>
                                    <option value="food">Food & Dining</option>
                                    <option value="subscription">Subscriptions</option>
                                    <option value="drinks">Drinks</option>
                                    <option value="shopping">Shopping</option>
                                    <option value="transportation">Transportation</option>
                                    <option value="utilities">Utilities</option>
                                    <option value="entertainment">Entertainment</option>
                                    <option value="health">Health & Wellness</option>
                                </select>
                            </label>

                            <label className="floating-label">
                                <span>Payee</span>
                                <input
                                    type="text"
                                    id="payee"
                                    name="payee"
                                    className="input required w-full"
                                    placeholder="Payee"
                                    required
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
