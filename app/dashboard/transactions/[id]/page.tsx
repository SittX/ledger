import { ArrowLeft, Info } from "lucide-react";
import Link from "next/link";

export default async function TransactionDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Transaction Details</h1>
      <div className="card border border-primary p-4 bg-base-300">
        <div className="card-title">
          <p className="text-xl">Information</p>
          <Info size={"16"} />
        </div>
        <div className="card-body grid grid-cols-1 lg:grid-cols-2 gap-y-6">
          <div>
            <h3 className="text-md text-base-content/50">Title</h3>
            <p className="text-lg font-semibold">Transaction Title</p>
          </div>

          <div>
            <h3 className="text-md text-base-content/50">Date</h3>
            <p className="text-lg font-semibold">Feb 1, 2026</p>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-md text-base-content/50">Description</h3>
            <p className="text-lg font-semibold">Transaction Title</p>
          </div>

          <div>
            <h3 className="text-md text-base-content/50">Category</h3>
            <p className="text-lg font-semibold">Bills</p>
          </div>

          <div>
            <h3 className="text-md text-base-content/50">Account</h3>
            <p className="text-lg font-semibold">Saving</p>
          </div>

          <div>
            <h3 className="text-md text-base-content/50">Balance</h3>
            <p className="text-lg font-semibold text-error">- 10,000 MMK</p>
          </div>
        </div>
      </div>

      <div className="card p-4 border border-primary">
        <p className="font-xl font-bold">Attachments</p>
      </div>

      <Link href={"/dashboard/transactions"}>
        <button className="btn btn-primary">
          <ArrowLeft size={16} />
          Back to Transactions
        </button>
      </Link>
    </div>
  );
}
