import Link from 'next/link';
import { features } from '@/config/features';
import { ArrowRight, CheckCircle2, BarChart3, Shield, Sparkles } from 'lucide-react';

export default function MarketingPage() {
    return (
        <div className="font-sans">
            {/* Hero */}
            <section className="border-base-300 from-base-200 to-base-300 relative overflow-hidden border-b bg-linear-to-b px-4 py-16 sm:px-6 sm:py-24 lg:py-32">
                <div className="mx-auto max-w-4xl text-center">
                    <p className="text-primary mb-4 text-sm font-medium tracking-wider uppercase">
                        Personal finance, simplified
                    </p>
                    <h1 className="text-base-content mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                        One place to track money, <span className="text-primary">budgets, and goals</span>
                    </h1>
                    <p className="text-base-content/80 mx-auto mb-10 max-w-2xl text-lg">
                        Ledger brings accounts, transactions, categories, subscriptions, budgets, and savings goals into
                        a single dashboard. No spreadsheets, no guesswork—just clear numbers and control.
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
            <section className="border-base-300 bg-base-300/50 border-b px-4 py-8 sm:px-6">
                <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-12 gap-y-6 text-center">
                    <div className="text-base-content/80 flex items-center gap-2">
                        <BarChart3 className="text-primary h-5 w-5" />
                        <span>Transactions & categories</span>
                    </div>
                    <div className="text-base-content/80 flex items-center gap-2">
                        <CheckCircle2 className="text-success h-5 w-5" />
                        <span>Budgets & goals</span>
                    </div>
                    <div className="text-base-content/80 flex items-center gap-2">
                        <Shield className="text-info h-5 w-5" />
                        <span>Your data stays yours</span>
                    </div>
                    <div className="text-base-content/80 flex items-center gap-2">
                        <Sparkles className="text-secondary h-5 w-5" />
                        <span>Simple, fast dashboard</span>
                    </div>
                </div>
            </section>

            {/* Features grid */}
            <section id="features" className="scroll-mt-14 px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-12 text-center">
                        <h2 className="text-base-content mb-3 text-3xl font-bold sm:text-4xl">
                            Everything you need in the dashboard
                        </h2>
                        <p className="text-base-content/70 mx-auto max-w-2xl">
                            Each feature is built to work together—accounts, transactions, categories, subscriptions,
                            budgets, and goals—so you get a full picture without the complexity.
                        </p>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature) => {
                            const Icon = feature.icon;
                            return (
                                <Link
                                    key={feature.slug}
                                    href={`/features/${feature.slug}`}
                                    className="group card card-border bg-base-100 hover:border-primary/30 transition-all hover:shadow-lg">
                                    <div className="card-body">
                                        <div className="bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-content mb-3 flex h-10 w-10 items-center justify-center rounded-lg transition-colors">
                                            <Icon className="h-5 w-5" />
                                        </div>
                                        <h3 className="card-title text-lg">{feature.title}</h3>
                                        <p className="text-base-content/70 text-sm">{feature.shortDescription}</p>
                                        <span className="text-primary mt-2 inline-flex items-center gap-1 text-sm font-medium">
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
            <section className="border-base-300 bg-base-300/30 border-t px-4 py-16 sm:px-6 sm:py-20">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-base-content mb-4 text-2xl font-bold sm:text-3xl">
                        Ready to take control of your finances?
                    </h2>
                    <p className="text-base-content/70 mb-8">
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
            <footer className="border-base-300 border-t px-4 py-8 sm:px-6">
                <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
                    <div className="flex items-center gap-2">
                        <div className="bg-primary text-primary-content flex h-8 w-8 items-center justify-center rounded-lg font-bold">
                            L
                        </div>
                        <span className="text-base-content font-semibold">Ledger</span>
                    </div>
                    <nav className="text-base-content/70 flex flex-wrap items-center justify-center gap-6 text-sm">
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
                <p className="text-base-content/50 mx-auto mt-6 max-w-6xl text-center text-xs">
                    © 2026 Ledger. Track your finances, manage accounts, and reach your goals.
                </p>
            </footer>
        </div>
    );
}
