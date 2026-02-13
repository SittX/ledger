import { Home, ChartColumn, Wallet, Tags, BellRing, ChartPie, Calendar1, Goal } from "lucide-react";

export interface MenuItem {
    name: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    order: number;
}

export interface MenuSection {
    title: string;
    items: MenuItem[];
}

export const menuSections: MenuSection[] = [
    {
        title: "TRANSACTIONS",
        items: [
            {
                name: "Home", href: "/dashboard", icon: Home, order: 1
            },
            { name: "Transactions", href: "/dashboard/transactions", icon: ChartColumn, order: 2 },
        ],
    },
    {
        title: "MANAGEMENT",
        items: [
            { name: "Accounts", href: "/dashboard/accounts", icon: Wallet, order: 3 },
            { name: "Category", href: "/dashboard/category", icon: Tags, order: 4 },
            {
                name: "Subscriptions",
                href: "/dashboard/subscriptions",
                icon: BellRing,
                order: 5,
            },
            { name: "Budgets", href: "/dashboard/budgets", icon: ChartPie, order: 6 },
            { name: "Goals", href: "/dashboard/goals", icon: Goal, order: 7 },
        ],
    },
];