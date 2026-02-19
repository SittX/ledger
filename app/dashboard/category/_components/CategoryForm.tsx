'use client';

import { CategoryFormValuesSchema, TCategoryFormValues } from '@/database/schema/category';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { categoryCreateAction } from '../_actions/category.action';

export default function CategoryForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TCategoryFormValues>({
        resolver: zodResolver(CategoryFormValuesSchema),
    });

    console.log(errors);

    function onSubmit(formData: TCategoryFormValues) {
        categoryCreateAction(formData);
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-base-200 mx-auto max-w-lg space-y-6 rounded-md xl:mx-0 xl:w-xl">
            <div className="card">
                <div className="card-body space-y-4">
                    <div className="space-y-2">
                        <label className="floating-label">
                            <span>Title</span>
                            <input
                                type="text"
                                id="title"
                                className="input w-full"
                                placeholder="Title"
                                required
                                {...register('title')}
                            />
                        </label>
                        {errors.title && <p className="text-error">{errors.title.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="floating-label">
                            <span>Category Type</span>
                            <input
                                type="text"
                                id="categoryType"
                                className="input w-full"
                                placeholder="Category Type"
                                {...register('categoryType')}
                                required
                            />
                        </label>
                        {errors.categoryType && <p className="text-error">{errors.categoryType.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="floating-label">
                            <span>Description</span>
                            <textarea
                                id="description"
                                className="textarea w-full"
                                placeholder="Description"
                                {...register('description')}
                            />
                        </label>
                        {errors.description && <p className="text-error">{errors.description.message}</p>}
                    </div>

                    <div className="card-actions justify-end">
                        <button type="reset" className="btn btn-ghost">
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}
