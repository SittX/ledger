import { Home, Plus } from "lucide-react";
import Link from "next/link";

export default function CategoryPage() {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-lg font-semibold">Categories</h1>
          <p className="text-lg text-base-content/50">Manage all categories</p>
        </div>
        <div>
          <Link href="/category/new">
            <button className="btn btn-primary">
              <Plus size={16} />
              Create New Category
            </button>
          </Link>
        </div>
      </div>

      {/* Body Section */}
      <div className="flex flex-wrap">
        <div className="card bg-base-300 w-80">
          <div className="card-body space-y-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Home size={20} />

                <div className="flex flex-col">
                  <p className="text-lg font-semibold">Hello world</p>
                  <p className="text-md text-base-content/50">Description</p>
                </div>
              </div>

              <span className="badge badge-soft badge-success">Income</span>
            </div>

            <div className="card-actions justify-end">
              <Link href={"/category/1"}>
                <button className="btn btn-soft btn-primary">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
