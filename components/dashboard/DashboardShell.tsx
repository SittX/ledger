'use client';

import { Suspense, useState, type ReactNode } from 'react';

import { FloatingActionButton } from '@/components/ui/FloatingActionButton';
import Header from '@/components/ui/navbar';
import Sidebar from '@/components/ui/sidebar';

interface DashboardShellProps {
    children: ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    return (
        <Suspense>
            <main className="flex min-h-screen">
                <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
                <div className="flex w-full min-w-0 flex-1 flex-col">
                    <div className="sticky top-0 z-30">
                        <Header onToggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
                    </div>
                    <div className="bg-base-100 min-w-0 flex-1 px-5 py-3">{children}</div>
                    <div className="relative z-20">
                        <FloatingActionButton />
                    </div>
                </div>
            </main>
        </Suspense>
    );
}
