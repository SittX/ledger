import { getAllCategoryForUser } from '@/services/category.service';
import AccountTransferForm from '../_components/AccountTransferForm';
import TransactionForm from '../_components/TransactionForm';
import { getAllAccounts } from '@/services/account.service';

export default async function TransactionCreatePage() {
    const accounts = await getAllAccounts();
    const categories = await getAllCategoryForUser();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-lg font-bold">New Transaction</h1>
                <p className="text-base-content/50 text-base">Record a new transaction.</p>
            </div>

            <div className="tabs tabs-box bg-base-300 p-4">
                <input type="radio" name="my_tabs_6" className="tab" aria-label="Income" defaultChecked />
                <div className="tab-content bg-base-100 border-base-300 scroll-y-auto">
                    <TransactionForm action="Income" accounts={accounts} categories={categories} />
                </div>

                <input type="radio" name="my_tabs_6" className="tab" aria-label="Expense" />
                <div className="tab-content bg-base-100 border-base-300">
                    <TransactionForm action="Expense" accounts={accounts} categories={categories} />
                </div>

                <input type="radio" name="my_tabs_6" className="tab" aria-label="Transfer" />
                <div className="tab-content bg-base-100 border-base-300">
                    <AccountTransferForm accounts={accounts} />
                </div>
            </div>
        </div>
    );
}
