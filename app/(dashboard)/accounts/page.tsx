import { TAccount } from "@/schemas/account";
import { getAllAccounts } from "@/services/account.service";
import { DollarSign, Plus, Star } from "lucide-react";
import Link from "next/link";

export default async function AccountPage() {
  const accounts: TAccount[] = await getAllAccounts(1);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold">Accounts</h1>
          <p className="text-base text-base-content/50 font-medium">
            Manage all of your financial accounts
          </p>
        </div>
        <Link href="/accounts/new" className="link">
          <button className="btn btn-md btn-primary">
            <Plus />
            Create New Account
          </button>
        </Link>
      </div>

      <div className="flex flex-wrap gap-4">
        {accounts.map((account) => (
          <div key={account.id} className="card card-border bg-base-300 w-80">
            <div className="card-body p-4 space-y-6">
              <div className="card-title flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-lg font-semibold">{account.title}</p>
                  <p className="text-base text-base-content/50 font-medium">
                    {account.accountType?.toLocaleUpperCase()}
                  </p>
                </div>
                <button className="btn btn-circle">
                  <Star />
                </button>
              </div>

              <p className="text-2xl font-bold">{account.balance}</p>

              <div className="card-actions">
                <div className="flex items-center space-x-2">
                  <button className="btn">Add Transaction</button>
                  <Link href={`/accounts/${account.id}`}>
                    <button className="btn btn-primary">View Details</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
