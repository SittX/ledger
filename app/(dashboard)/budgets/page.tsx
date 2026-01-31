import { Plus } from "lucide-react";
import Link from "next/link";

export default function BudgetPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-2xl font-bold">Budgets</h1>
          <p className="text-lg text-muted-foreground">Manage all budgets</p>
        </div>
        <div>
          <Link href="/accounts/new">
            <button className="btn btn-md btn-primary">
              Create New Budget <Plus />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
