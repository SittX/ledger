import { FloatingActionButton } from '@/components/ui/FloatingActionButton';
import Header from '@/components/ui/navbar';
import Sidebar from '@/components/ui/sidebar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Ledger',
    description: 'Ledger dashboard',
};

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="1 0 flex">
            <Sidebar />
            <div className="w-screen">
                <Header />
                <div className="bg-base-100 h-full px-5 py-3">{children}</div>
                <FloatingActionButton />
            </div>
        </main>
    );
}
