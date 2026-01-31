import { Plus } from "lucide-react";
import Link from "next/link";

export default function GoalPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-2xl font-bold">Goals</h1>
          <p className="text-lg text-muted-foreground">Manage all goals</p>
        </div>
        <div>
          <Link href="/accounts/new">
            <button className="btn btn-md btn-primary">
              Create New Goal <Plus />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
