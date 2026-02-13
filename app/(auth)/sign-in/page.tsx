"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { data, error: signInError } = await authClient.signIn.email({
      email,
      password,
      callbackURL: "/dashboard",
    });
    setLoading(false);
    if (signInError) {
      setError(signInError.message ?? "Sign in failed");
      return;
    }
    if (data) {
      router.push("/dashboard");
      router.refresh();
    }
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="w-full max-w-sm rounded-lg border border-base-300 bg-base-100 p-6 shadow-lg">
        <h1 className="mb-6 text-center text-xl font-bold">Sign in</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && (
            <div className="rounded-md bg-error/20 px-3 py-2 text-sm text-error">
              {error}
            </div>
          )}
          <label className="form-control w-full">
            <span className="label-text">Email</span>
            <input
              type="email"
              placeholder="you@example.com"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </label>
          <label className="form-control w-full">
            <span className="label-text">Password</span>
            <input
              type="password"
              placeholder="••••••••"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </label>
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-base-content/70">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="link link-primary">
            Sign up
          </Link>
        </p>
      </div>
    </Suspense>
  );
}
