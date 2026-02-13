import { TAccount } from "@/types/account";
import { getAllAccounts } from "@/services/account.service";
import { Plus, Star } from "lucide-react";
import Link from "next/link";
import DataDoesNotExistDisplay from "@/components/ui/DataDoesNotExistDisplay";

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
        <Link href="/dashboard/accounts/new" className="link">
          <button className="btn btn-soft btn-primary">
            <Plus size={16} />
            Create New Account
          </button>
        </Link>
      </div>

      <div className="flex flex-wrap gap-4">
        {accounts.length <= 0 && (
          <DataDoesNotExistDisplay
            message="Currently there is no account."
            link="/dashboard/accounts/new"
            text="Create New Account"
          />
        )}
        {accounts.map((account) => (
          <div key={account.id} className="card card-border bg-base-300 w-80">
            <div className="card-body p-4 space-y-4">
              <div className="card-title flex items-start justify-between">
                <div>
                  <p className="text-lg">{account.title}</p>
                  <p className="text-md md:text-sm text-base-content/50">
                    {account.accountType}
                  </p>
                </div>
                <button className="btn btn-circle">
                  <Star size={18} />
                </button>
              </div>

              <div>
                <p className="text-xl font-bold">{account.balance}</p>
                <p className="text-md md:text-sm text-base-content/50">MMK</p>
              </div>

              <div className="card-actions justify-end">
                <Link href={`/dashboard/accounts/${account.id}`}>
                  <button className="btn btn-soft btn-primary">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
