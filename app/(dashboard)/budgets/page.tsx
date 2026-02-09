import { Plus } from "lucide-react";
import Link from "next/link";

export default function BudgetPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">Budgets</h1>
          <p className="text-lg text-base-content/50">
            Manage all your budgets
          </p>
        </div>
        <Link href="/budgets/new">
          <button className="btn btn-primary">
            <Plus /> Create New Budget
          </button>
        </Link>
      </div>

      {/* Body */}
      <div className="flex flex-wrap">
        <div className="card bg-base-300">
          <div className="card-body">
            <p className="text-lg">Coming Soon!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
