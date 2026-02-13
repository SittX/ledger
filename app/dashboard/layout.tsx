import type { Metadata } from "next";
import Sidebar from "@/components/ui/Sidebar";
import Header from "@/components/ui/Navbar";

export const metadata: Metadata = {
  title: "Ledger",
  description: "Ledger dashboard",
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
        <div className="h-full py-3 px-5 bg-base-100">{children}</div>
      </div>
    </main>
  );
}
