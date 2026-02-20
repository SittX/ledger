import { TCategory } from '@/database/schema/category';
import { Home } from 'lucide-react';
import Link from 'next/link';

type CategoryCardProps = {
    data: TCategory;
};

export default function CategoryCard({ data }: CategoryCardProps) {
    return (
        <div className="card bg-base-300 w-50">
            <div className="card-body space-y-4">
                <div className="flex items-center gap-4">
                    <Home size={18} />

                    <div className="flex flex-col">
                        <p className="text-md font-bold">{data.title}</p>
                        <p className="text-md text-base-content/50">{data.description}</p>
                    </div>
                </div>

                <span className="badge badge-soft badge-success badge-sm">{data.categoryType}</span>

                <div className="card-actions justify-start">
                    <Link href={`/dashboard/category/${data.id}`}>
                        <button className="btn btn-soft btn-primary btn-sm">View Details</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
