"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#features", label: "Features" },
  { href: "/features", label: "All features" },
];

export default function MarketingHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-base-300 bg-base-200/95 backdrop-blur supports-backdrop-filter:bg-base-200/80">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-base-content"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-content">
            L
          </div>
          <span className="text-lg">Ledger</span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-4">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "text-primary"
                    : "text-base-content/70 hover:bg-base-300 hover:text-base-content",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/sign-in"
            className="btn btn-ghost btn-sm hidden sm:inline-flex"
          >
            Sign in
          </Link>
          <Link href="/sign-up" className="btn btn-primary btn-sm">
            Sign up
          </Link>
        </div>
      </div>
    </header>
  );
}
