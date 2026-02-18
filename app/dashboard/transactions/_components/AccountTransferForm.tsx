'use client';
import { TAccount } from '@/database/schema/account';

type TransferFormProps = {
    accounts: TAccount[];
};

export default function AccountTransferForm({ accounts }: TransferFormProps) {
    return (
        <form action="">
            <div className="card">
                <div className="card-body space-y-4">
                    <div className="card-title">
                        <h1>Account Transfer</h1>
                    </div>
                    <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <div className="space-y-2">
                            <label className="select">
                                <span className="label">From Account</span>

                                {/* Need to add onChange event handler to display available balance for each selected account */}
                                <select className="select" name="accountType" aria-label="Account type">
                                    {accounts.map((account) => {
                                        return (
                                            <option key={account.id} value={account.id}>
                                                {account.title}
                                            </option>
                                        );
                                    })}
                                </select>
                            </label>
                            <p className="text-info/50">Current Balance :</p>
                        </div>

                        <div className="space-y-2">
                            <label className="select">
                                <span className="label">To Account</span>
                                <select className="select" name="accountType" aria-label="Account type">
                                    {accounts.map((account) => {
                                        return (
                                            <option key={account.id} value={account.id}>
                                                {account.title}
                                            </option>
                                        );
                                    })}
                                </select>
                            </label>
                            <p className="text-info/50">Current Balance :</p>
                        </div>
                    </section>

                    <div className="divider" />

                    <section className="space-y-4">
                        <h3 className="text-lg font-semibold">Amount & Date</h3>
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            <label className="floating-label">
                                <span>Amount</span>
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
