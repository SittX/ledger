import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans">
      <h1>Home</h1>
      <p>Welcome to the home page</p>
      <Link href="/sign-in">Login</Link>
      <Link href="/sign-up">Register</Link>
    </div>
  );
}
