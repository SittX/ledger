import { getAccountById } from "@/services/account.service";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function AccountEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const accountData = await getAccountById(Number(id));

  const rows = [
    {
      date: "Feb 1, 2026",
      description: "Mobile Bills",
      category: "Subscriptions",
      amount: "- 10,000 MMK",
      amountClass: "text-error",
      rowClass: "hover:bg-base-300 hover:cursor-pointer",
    },
    {
      date: "Feb 14, 2026",
      description: "Dinner at M Tower",
      category: "Foods",
      amount: "- 80,000 MMK",
      amountClass: "text-error",
      rowClass: "hover:bg-base-300 hover:cursor-pointer",
    },
    {
      date: "Feb 28, 2026",
      description: "Monthly salary",
      category: "Salary",
      amount: "+ 800,000 MMK",
      amountClass: "text-success",
      rowClass: "hover:bg-base-300 hover:cursor-pointer",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Account Details</h1>
        <Link href={`/dashboard/accounts/${id}/edit`}>
          <button className="btn btn-primary">Edit</button>
        </Link>
      </div>

      <div>
        <Link href={"/dashboard/accounts"}>
          <button className="btn btn-primary">
            <ArrowLeft size={16} />
            Back to Accounts
          </button>
        </Link>
      </div>

      <div className="card bg-base-300">
        <div className="card-body space-y-6">
          <div className="card-title">
            <p className="text-xl font-bold">Information</p>
            {accountData?.isPrimaryAccount && (
              <span className="badge badge-outline badge-info">
                Primary Account
              </span>
            )}
          </div>
          <div className=" grid grid-cols-1 lg:grid-cols-2 gap-y-6">
            <div>
              <h3 className="text-md text-base-content/50">Name</h3>
              <p className="text-lg">{accountData?.title}</p>
            </div>
            <div>
              <h3 className="text-md text-base-content/50">Description</h3>
              <p className="text-lg">{accountData?.description}</p>
            </div>
            <div className="col-span-2">
              <h3 className="text-md text-base-content/50">Balance</h3>
              <p className="text-lg">{accountData?.balance}</p>
            </div>
            <div>
              <h3 className="text-md text-base-content/50">
                Include In NetWorth
              </h3>
              <p className="text-lg">
                {accountData?.includeInNetWorth ? "true" : "false"}
              </p>
            </div>

            <div>
              <h3 className="text-md text-base-content/50">Account Type</h3>
              <p className="text-lg">{accountData?.accountType}</p>
            </div>

            <div>
              <h3 className="text-md text-base-content/50">Status</h3>
              {accountData?.isActive && (
                <span className={`badge badge-success `}>Active</span>
              )}
              {!accountData?.isActive && (
                <span className={`badge badge-disabled`}>Not Active</span>
              )}
            </div>
          </div>
          {/* TODO:Icon Picker and Color Picker will goes here */}
        </div>
      </div>

      {/* TODO: Weekly or Monthly Transactions related to this accounts will be shown here */}
      <div className="overflow-x-auto">
        <div>
          <h1 className="text-xl font-semibold">Transactions</h1>
        </div>
        <table className="table table-pin-cols">
          {/* head */}
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
              <tr key={i} className={r.rowClass}>
                <td>{r.date}</td>
                <td>{r.description}</td>
                <td>{r.category}</td>
                <td className={r.amountClass}>{r.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
