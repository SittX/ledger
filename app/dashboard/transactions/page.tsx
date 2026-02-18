// id serial not null,
//   title character varying(255) null,
//   notes character varying(255) null,
//   transaction_type character varying(20) null,
//   category_id integer null,
//   goal_id integer null,
//   subscription_id integer null,
//   account_id integer null,
//   amount numeric(12, 2) not null,
//   transaction_date timestamp without time zone null,
//   attachment_id integer null,
//   user_id integer not null,
//   payee_id integer null,
//   status character varying(20) null,
//   is_deleted boolean null default false,

import { auth } from '@/lib/auth';
import { getAllTransactionForUser } from '@/services/transaction.service';
import { headers } from 'next/headers';

//   reconciliation_date timestamp without time zone null,
export default async function TransactionPage() {
    const userId = await getSessionUserId();

    const rows = await getAllTransactionForUser(userId);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-xl font-semibold">Transaction History</h1>
                <p className="text-base-content/50 text-lg">Recent Transactions</p>
            </div>

            <div className="overflow-x-auto">
                <table className="table-pin-cols table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((r, i) => (
                            <tr key={i}>
                                <td>{r.transactionDate?.toDateString()}</td>
                                <td>{r.notes}</td>
                                <td>{r.categoryId}</td>
                                <td className={r.transactionType === 'Income' ? 'text-success' : 'text-error'}>
                                    {r.transactionType === 'Income' ? ' + ' + r.amount : ' - ' + r.amount}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// Utility functions
async function getSessionUserId() {
    const sessionHeaders = await headers();

    const session = await auth.api.getSession({
        headers: sessionHeaders,
    });

    if (!session || !session.user) {
        throw new Error('Unauthorized: You must be logged in to create an account.');
    }

    const userId = session.user.id;
    return userId;
}
