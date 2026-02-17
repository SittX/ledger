import { accountCreateAction } from '../_actions/action';
import AccountForm from '../_components/AccountForm';

export default function AccountCreatePage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-lg font-semibold">Create New Account</h1>
                <p className="text-base-content/50 text-base">Fill in the details below to create a new account.</p>
            </div>

            <AccountForm onSubmit={accountCreateAction} action={'New'} />
        </div>
    );
}
