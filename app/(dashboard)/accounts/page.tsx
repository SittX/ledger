import { TAccount } from "@/schemas/account";
import { getAllAccounts } from "@/services/account.service";
import { DollarSign, Plus, Star } from "lucide-react";
import Link from "next/link";

export default async function AccountPage() {
  const accounts: TAccount[] = await getAllAccounts(1);
  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-2xl font-bold">Accounts</h1>
          <p className="text-lg text-muted-foreground">
            Manage all of your financial accounts
          </p>
        </div>
        <div>
          <Link href="/accounts/new">
            <button className="btn btn-md btn-primary">
              Create new Account <Plus />
            </button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
        {accounts.map((account) => (
          <div
            key={account.id}
            className="card card-border bg-base-300 min-w-60 max-w-100 p-3"
          >
            <div className="card-title flex items-center justify-between">
              <div className="flex flex-col">
                <DollarSign />
                <p className="text-xl font-bold">{account.title}</p>
                <p className="text-md">{account.accountType}</p>
              </div>
              <div>
                <button className="card">
                  <Star />
                </button>
              </div>
            </div>
            <div className="card-body">
              <p className="text-2xl text-default-200">${account.balance}</p>
            </div>
            <div className="card-actions">
              <div className="flex gap-3">
                <Link href={`/accounts/${account.id}`}>
                  <button className="btn">View Details</button>
                </Link>
                <button className="btn btn-primary">Add Transaction</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
