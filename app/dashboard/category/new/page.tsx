import CategoryForm from '../_components/CategoryForm';

export default function CategoryCreatePage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col">
                <h1 className="text-xl font-semibold">Create new Category</h1>
                <p className="text-md text-primary-content/50">Create new category</p>
            </div>
            <CategoryForm />
        </div>
    );
}
