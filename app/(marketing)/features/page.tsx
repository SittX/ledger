import Link from "next/link";
import { features } from "@/config/features";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Features — Ledger",
  description:
    "Explore Ledger's features: dashboard overview, transactions, accounts, categories, subscriptions, budgets, and goals.",
};

export default function FeaturesIndexPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="mb-12">
        <h1 className="mb-3 text-3xl font-bold text-base-content sm:text-4xl">
          Features
        </h1>
        <p className="text-base-content/70">
          Everything in the Ledger dashboard, explained. Click any feature to
          read more.
        </p>
      </div>

      <ul className="space-y-4">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <li key={feature.slug}>
              <Link
                href={`/features/${feature.slug}`}
                className="group flex items-start gap-4 rounded-xl border border-base-300 bg-base-100 p-4 transition-colors hover:border-primary/30 hover:bg-base-100 sm:p-5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="font-semibold text-base-content group-hover:text-primary">
                    {feature.title}
                  </h2>
                  <p className="mt-1 text-sm text-base-content/70">
                    {feature.shortDescription}
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 shrink-0 text-base-content/40 transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="mt-12 text-center">
        <Link href="/#features" className="link link-primary">
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
