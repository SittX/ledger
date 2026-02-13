import Link from "next/link";
import { features } from "@/config/features";
import {
  ArrowRight,
  CheckCircle2,
  BarChart3,
  Shield,
  Sparkles,
} from "lucide-react";

export default function MarketingPage() {
  return (
    <div className="font-sans">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-base-300 bg-linear-to-b from-base-200 to-base-300 px-4 py-16 sm:px-6 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-wider text-primary">
            Personal finance, simplified
          </p>
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-base-content sm:text-5xl lg:text-6xl">
            One place to track money,{" "}
            <span className="text-primary">budgets, and goals</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-base-content/80">
            Ledger brings accounts, transactions, categories, subscriptions,
            budgets, and savings goals into a single dashboard. No spreadsheets,
            no guesswork—just clear numbers and control.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/sign-up" className="btn btn-primary btn-lg gap-2">
              Get started free
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/#features" className="btn btn-outline btn-lg">
              See features
            </Link>
          </div>
        </div>
      </section>

      {/* Social proof / benefits strip */}
      <section className="border-b border-base-300 bg-base-300/50 px-4 py-8 sm:px-6">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-12 gap-y-6 text-center">
          <div className="flex items-center gap-2 text-base-content/80">
            <BarChart3 className="h-5 w-5 text-primary" />
            <span>Transactions & categories</span>
          </div>
          <div className="flex items-center gap-2 text-base-content/80">
            <CheckCircle2 className="h-5 w-5 text-success" />
            <span>Budgets & goals</span>
          </div>
          <div className="flex items-center gap-2 text-base-content/80">
            <Shield className="h-5 w-5 text-info" />
            <span>Your data stays yours</span>
          </div>
          <div className="flex items-center gap-2 text-base-content/80">
            <Sparkles className="h-5 w-5 text-secondary" />
            <span>Simple, fast dashboard</span>
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section
        id="features"
        className="scroll-mt-14 px-4 py-16 sm:px-6 sm:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold text-base-content sm:text-4xl">
              Everything you need in the dashboard
            </h2>
            <p className="mx-auto max-w-2xl text-base-content/70">
              Each feature is built to work together—accounts, transactions,
              categories, subscriptions, budgets, and goals—so you get a full
              picture without the complexity.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={feature.slug}
                  href={`/features/${feature.slug}`}
                  className="group card card-border bg-base-100 transition-all hover:border-primary/30 hover:shadow-lg"
                >
                  <div className="card-body">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-content">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="card-title text-lg">{feature.title}</h3>
                    <p className="text-sm text-base-content/70">
                      {feature.shortDescription}
                    </p>
                    <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary">
                      Learn more
                      <ArrowRight className="h-3.5 w-3 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <Link href="/features" className="link link-primary font-medium">
              View all feature details →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-base-300 bg-base-300/30 px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-2xl font-bold text-base-content sm:text-3xl">
            Ready to take control of your finances?
          </h2>
          <p className="mb-8 text-base-content/70">
            Sign up in seconds. No credit card required. Start tracking today.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/sign-up" className="btn btn-primary btn-lg">
              Create free account
            </Link>
            <Link href="/sign-in" className="btn btn-ghost btn-lg">
              Sign in
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-base-300 px-4 py-8 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-content font-bold">
              L
            </div>
            <span className="font-semibold text-base-content">Ledger</span>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-base-content/70">
            <Link href="/#features" className="hover:text-base-content">
              Features
            </Link>
            <Link href="/features" className="hover:text-base-content">
              All features
            </Link>
            <Link href="/sign-in" className="hover:text-base-content">
              Sign in
            </Link>
            <Link href="/sign-up" className="hover:text-base-content">
              Sign up
            </Link>
          </nav>
        </div>
        <p className="mx-auto mt-6 max-w-6xl text-center text-xs text-base-content/50">
          © {new Date().getFullYear()} Ledger. Track your finances, manage
          accounts, and reach your goals.
        </p>
      </footer>
    </div>
  );
}
