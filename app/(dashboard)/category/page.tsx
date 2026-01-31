import { Plus } from "lucide-react";
import Link from "next/link";

export default function CategoryPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-2xl font-bold">Categories</h1>
          <p className="text-lg text-muted-foreground">Manage all categories</p>
        </div>
        <div>
          <Link href="/accounts/new">
            <button className="btn btn-md btn-primary">
              Create New Category <Plus />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
