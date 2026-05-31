import type { Metadata } from "next";
import { sanityFetch } from "@/lib/sanity/client";
import { newsListQuery } from "@/lib/sanity/queries";
import { PageHero } from "@/components/ui/PageHero";
import { NewsCard } from "@/components/news/NewsCard";
import type { NewsArticle, NewsCategory } from "@/types";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

export const metadata: Metadata = {
  title: "News",
  description: "Latest news, announcements, press releases, and publications from the Western Balkans Fund.",
};

interface PageProps {
  searchParams: Promise<{ category?: NewsCategory; page?: string }>;
}

const categories = [
  { value: "all", label: "All" },
  { value: "announcement", label: "Announcements" },
  { value: "press-release", label: "Press Releases" },
  { value: "publication", label: "Publications" },
  { value: "story", label: "Stories" },
  { value: "call-for-applications", label: "Open Calls" },
];

export default async function NewsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  let articles: NewsArticle[] = [];

  try {
    articles = await sanityFetch<NewsArticle[]>(newsListQuery, {}, {
      revalidate: 1800,
      tags: ["news"],
    });
  } catch {}

  const filtered = params.category
    ? articles.filter((a) => a.category === params.category)
    : articles;

  return (
    <>
      <PageHero
        overline="Media"
        title="News & Announcements"
        description="Stay up to date with the latest from the Western Balkans Fund."
        variant="compact"
        breadcrumbs={[{ label: "News" }]}
      />

      <section className="section-padding bg-white">
        <div className="container-institutional">
          {/* Category filter tabs */}
          <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-100 pb-4">
            {categories.map(({ value, label }) => {
              const active = value === "all" ? !params.category : params.category === value;
              const href = value === "all" ? "/news" : `/news?category=${value}`;
              return (
                <Link
                  key={value}
                  href={href}
                  className={cn(
                    "px-4 py-2 rounded-sm text-sm font-medium transition-colors",
                    active
                      ? "bg-brand-500 text-white"
                      : "text-slate-600 hover:text-brand-600 hover:bg-slate-50"
                  )}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((article) => (
              <NewsCard key={article._id} article={article} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-slate-400">
              <p className="text-lg font-medium text-slate-600">No articles found</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
