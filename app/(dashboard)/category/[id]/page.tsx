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
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Category Details</h1>
        <Link href={`/category/${id}/edit`}>
          <button className="btn btn-primary">Edit</button>
        </Link>
      </div>

      <div>
        <Link href={"/category"}>
          <button className="btn btn-primary">
            <ArrowLeft size={16} />
            Back to category
          </button>
        </Link>
      </div>

      <div className="card bg-base-300">
        <div className="card-body space-y-6">
          <div className="card-title">
            <p className="text-xl font-semibold">Information</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-6">
            <div>
              <h3 className="text-md text-base-content/50">Title</h3>
              <p className="text-lg">Category Title</p>
            </div>
            <div>
              <h3 className="text-md text-base-content/50">Category</h3>
              <p className="text-lg">Category Type</p>
            </div>
            <div className="col-span-2">
              <h3 className="text-md text-base-content/50">Description</h3>
              <p className="text-lg">Description</p>
            </div>
          </div>
          {/* TODO:Icon Picker and Color Picker will goes here */}
        </div>
      </div>

      {/* If the category is a parent category there will be child category listed down here */}
      <div className="card bg-base-300">
        <div className="card-body space-y-6">
          <div className="card-title">
            <p className="text-xl font-semibold">Children Categories</p>
          </div>
          <div className="overflow-x-auto">
            <table className="table table-pin-cols">
              {/* head */}
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Title</td>
                  <td>
                    <span className="badge badge-success">Date</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
