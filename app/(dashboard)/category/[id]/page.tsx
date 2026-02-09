import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function CategoryDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Category Details</h1>
      </div>

      <div className="card bg-base-300">
        <div className="card-body ">
          <div className="card-title">
            <p className="text-xl">Information</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-6">
            <div>
              <h3 className="text-md text-base-content/50">Title</h3>
              <p className="text-lg font-semibold">Category Title</p>
            </div>
            <div>
              <h3 className="text-md text-base-content/50">Category</h3>
              <p className="text-lg font-semibold">Category Type</p>
            </div>
            <div className="col-span-2">
              <h3 className="text-md text-base-content/50">Description</h3>
              <p className="text-lg font-semibold">Description</p>
            </div>
          </div>
          {/* TODO:Icon Picker and Color Picker will goes here */}
        </div>
      </div>

      <div>
        <Link href={"/category"}>
          <button className="btn btn-primary">
            <ArrowLeft size={16} />
            Back to category
          </button>
        </Link>
      </div>
    </div>
  );
}
