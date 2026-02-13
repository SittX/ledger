import type { Metadata } from "next";
import MarketingHeader from "@/components/marketing/MarketingHeader";

export const metadata: Metadata = {
  title: "Ledger — Track your finances, manage accounts, reach your goals",
  description:
    "Track your finances, manage accounts, and reach your goals in one place. Transactions, budgets, goals, and subscriptions.",
};

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-base-200">
      <MarketingHeader />
      {children}
    </div>
  );
}
