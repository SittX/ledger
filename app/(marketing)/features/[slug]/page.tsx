import Link from "next/link";
import { notFound } from "next/navigation";
import { getFeatureBySlug, getFeatureSlugs, features } from "@/config/features";
import { ArrowLeft, Check } from "lucide-react";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getFeatureSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const feature = getFeatureBySlug(slug);
  if (!feature) return { title: "Feature — Ledger" };
  return {
    title: `${feature.title} — Ledger`,
    description: feature.shortDescription,
  };
}

export default async function FeatureDetailPage({ params }: Props) {
  const { slug } = await params;
  const feature = getFeatureBySlug(slug);
  if (!feature) notFound();

  const Icon = feature.icon;
  const currentIndex = features.findIndex((f) => f.slug === slug);
  const prevFeature = currentIndex > 0 ? features[currentIndex - 1] : null;
  const nextFeature =
    currentIndex >= 0 && currentIndex < features.length - 1
      ? features[currentIndex + 1]
      : null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <Link
        href="/#features"
        className="mb-8 inline-flex items-center gap-2 text-sm text-base-content/70 hover:text-base-content"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to features
      </Link>

      <article>
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon className="h-6 w-6" />
        </div>
        <p className="mb-2 text-sm font-medium uppercase tracking-wider text-primary">
          {feature.tagline}
        </p>
        <h1 className="mb-4 text-3xl font-bold text-base-content sm:text-4xl">
          {feature.title}
        </h1>
        <p className="mb-8 text-lg text-base-content/80">
          {feature.shortDescription}
        </p>

        <div className="prose prose-base max-w-none text-base-content/90">
          <p className="lead">{feature.description}</p>

          <h2 className="mt-10 text-xl font-semibold text-base-content">
            What you get
          </h2>
          <ul className="mt-3 space-y-2">
            {feature.highlights.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h2 className="mt-10 text-xl font-semibold text-base-content">
            How it works
          </h2>
          <div className="mt-3 space-y-4">
            {feature.details.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </article>

      <nav
        className="mt-12 flex flex-col gap-4 border-t border-base-300 pt-8 sm:flex-row sm:justify-between"
        aria-label="Feature navigation"
      >
        {prevFeature ? (
          <Link
            href={`/features/${prevFeature.slug}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            {prevFeature.title}
          </Link>
        ) : (
          <span />
        )}
        {nextFeature ? (
          <Link
            href={`/features/${nextFeature.slug}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            {nextFeature.title}
            <ArrowLeft className="h-4 w-4 rotate-180" />
          </Link>
        ) : (
          <span />
        )}
      </nav>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link href="/dashboard" className="btn btn-ghost">
          Go to app
        </Link>
        <Link href="/sign-up" className="btn btn-primary">
          Sign up free
        </Link>
      </div>
    </div>
  );
}
