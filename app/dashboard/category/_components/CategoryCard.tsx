import { TCategory } from '@/database/schema/category';
import { Home } from 'lucide-react';
import Link from 'next/link';

type CategoryCardProps = {
    data: TCategory;
};

export default function CategoryCard({ data }: CategoryCardProps) {
    return (
        <div className="card bg-base-300 w-80">
            <div className="card-body space-y-6">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Home size={20} />

                        <div className="flex flex-col">
                            <p className="text-lg font-semibold">{data.title}</p>
                            <p className="text-md text-base-content/50">{data.description}</p>
                        </div>
                    </div>

                    <span className="badge badge-soft badge-success">{data.categoryType}</span>
                </div>
                <div className="card-actions justify-end">
                    <Link href={`/dashboard/category/${data.id}`}>
                        <button className="btn btn-soft btn-primary">View Details</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
