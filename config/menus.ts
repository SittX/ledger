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
                name: "Home", href: "/", icon: Home, order: 1
            },
            { name: "History", href: "/transactions", icon: ChartColumn, order: 2 },
        ],
    },
    {
        title: "MANAGEMENT",
        items: [
            { name: "Accounts", href: "/accounts", icon: Wallet, order: 3 },
            { name: "Category", href: "/category", icon: Tags, order: 4 },
            {
                name: "Subscriptions",
                href: "/subscriptions",
                icon: BellRing,
                order: 5,
            },
            { name: "Budgets", href: "/budgets", icon: ChartPie, order: 6 },
            { name: "Goals", href: "/goals", icon: Goal, order: 7 },
        ],
    },
];