import { Suspense } from "react";
import type { Metadata } from "next";
import { sanityFetch } from "@/lib/sanity/client";
import { newsListQuery } from "@/lib/sanity/queries";
import { PageHero } from "@/components/ui/PageHero";
import { NewsGridClient } from "@/components/news/NewsGridClient";
import type { NewsArticle } from "@/types";

export const metadata: Metadata = {
  title: "News",
  description: "Latest news, announcements, press releases, and publications from the Western Balkans Fund.",
};

export default async function NewsPage() {
  let articles: NewsArticle[] = [];

  try {
    articles = await sanityFetch<NewsArticle[]>(newsListQuery, {}, {
      revalidate: 1800,
      tags: ["news"],
    });
  } catch {}

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
          <Suspense fallback={null}>
            <NewsGridClient articles={articles} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
