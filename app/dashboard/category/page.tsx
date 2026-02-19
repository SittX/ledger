import { getAllCategoryForUser } from '@/services/category.service';
import { Home, Plus } from 'lucide-react';
import Link from 'next/link';
import CategoryCard from './_components/CategoryCard';

export default async function CategoryPage() {
    const categories = await getAllCategoryForUser();

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-lg font-semibold">Categories</h1>
                    <p className="text-base-content/50 text-lg">Manage all categories</p>
                </div>
                <div>
                    <Link href="/dashboard/category/new">
                        <button className="btn btn-primary">
                            <Plus size={16} />
                            Create New Category
                        </button>
                    </Link>
                </div>
            </div>

            {/* Body Section */}
            <div className="flex flex-wrap">
                {categories.map((category) => {
                    return <CategoryCard data={category} key={category.id} />;
                })}
            </div>
        </div>
    );
}
