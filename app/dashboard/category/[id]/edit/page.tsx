import { Suspense } from 'react';

export default async function CategoryEditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return (
        <Suspense>
            <div>
                <p>Editing ID of {id}</p>
            </div>
        </Suspense>
    );
}
