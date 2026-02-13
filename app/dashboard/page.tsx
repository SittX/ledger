import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans">
      <h1>Dashboard</h1>
      <p>Welcome to the dashboard</p>
      <Link href="/sign-in">Login</Link>
      <Link href="/sign-up">Register</Link>
    </div>
  );
}
