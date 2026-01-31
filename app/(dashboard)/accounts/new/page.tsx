import AccountCreateForm from "../_components/AccountCreateForm";

export default function AccountCreatePage() {
  return (
    <div className="min-w-full">
      <div className="max-w-md">
        <h1 className="text-2xl font-bold">Create New Account</h1>
        <p className="text-gray-600 mb-4">
          Fill in the details below to create a new account.
        </p>
      </div>
      <AccountCreateForm />
    </div>
  );
}
