import { getAllCategoryForUser } from '@/services/category.service';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import CategoryCard from './_components/CategoryCard';
import { Suspense } from 'react';
import { TCategory } from '@/database/schema/category';

async function CategoryList() {
    const categories: TCategory[] = await getAllCategoryForUser();
    const systemCategories = categories.filter((category) => category.isSystemDefault).slice(0, 6);
    const userCategories = categories.filter((category) => !category.isSystemDefault);

    return (
        <section className="space-y-8">
            <div className="space-y-2">
                <h3 className="text-lg font-semibold">User Created Categories</h3>
                <Suspense>
                    <div className="flex flex-wrap gap-6">
                        {userCategories.map((category) => {
                            return <CategoryCard data={category} key={category.id} />;
                        })}
                    </div>
                </Suspense>
            </div>

            <div className="space-y-2">
                <h3 className="text-lg font-semibold">System Categories</h3>
                <Suspense>
                    <div className="flex flex-wrap gap-6">
                        {systemCategories.map((category) => {
                            return <CategoryCard data={category} key={category.id} />;
                        })}
                    </div>
                </Suspense>
            </div>
        </section>
    );
}

export default function CategoryPage() {
    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold">Categories</h1>
                    <p className="text-base-content/50 text-sm">Manage all categories</p>
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
            <Suspense>
                <CategoryList />
            </Suspense>
        </div>
    );
}
