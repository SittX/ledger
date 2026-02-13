import { getAccountById } from '@/services/account.service';
import { accountUpdateAction } from '../../_actions/action';
import AccountForm from '../../_components/AccountForm';

export default async function AccountDetailsEditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    // TODO: Here I have done account! to ensure that the result data is not undefined. Is it normal? Is there any way to handle this?
    const account = await getAccountById(Number(id));

    return (
        <div className="min-w-full space-y-6 xl:space-y-12">
            <div className="max-w-md">
                <h1 className="text-lg font-semibold">Edit existing Account</h1>
                <p className="text-base-content/50 text-base">Fill in the details below to update an account.</p>
            </div>
            <AccountForm onSubmit={accountUpdateAction} action={'Edit'} initialValues={account!} />
        </div>
    );
}
