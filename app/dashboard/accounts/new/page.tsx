import { accountCreateAction } from "../_actions/action";
import AccountForm from "../_components/AccountForm";

export default function AccountCreatePage() {
  return (
    <div className="min-w-full space-y-6 xl:space-y-12">
      <div className="max-w-md">
        <h1 className="text-lg font-semibold">Create New Account</h1>
        <p className="text-base text-base-content/50">
          Fill in the details below to create a new account.
        </p>
      </div>
      <AccountForm onSubmit={accountCreateAction} />
    </div>
  );
}
