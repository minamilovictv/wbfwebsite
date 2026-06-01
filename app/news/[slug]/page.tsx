import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { sanityFetch, getImageUrl } from "@/lib/sanity/client";
import { newsBySlugQuery } from "@/lib/sanity/queries";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { formatDate, toPlainText } from "@/lib/utils/formatters";
import { Calendar, User, ArrowLeft } from "lucide-react";
import type { NewsArticle } from "@/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const article = await sanityFetch<NewsArticle | null>(newsBySlugQuery, { slug }, { revalidate: 1800 });
    if (!article) return {};
    return {
      title: article.seo?.title ?? article.title,
      description: article.seo?.description ?? article.excerpt,
      openGraph: {
        title: article.title,
        description: article.excerpt,
        publishedTime: article.publishedAt,
        images: article.coverImage ? [getImageUrl(article.coverImage, { width: 1200, height: 630 }) ?? ""] : [],
      },
    };
  } catch {
    return {};
  }
}

const categoryLabels: Record<string, string> = {
  announcement: "Announcement",
  "press-release": "Press Release",
  publication: "Publication",
  story: "Story",
  "event-recap": "Event Recap",
  "call-for-applications": "Open Call",
};

export default async function NewsArticlePage({ params }: PageProps) {
  const { slug } = await params;
  let article: NewsArticle | null = null;

  try {
    article = await sanityFetch<NewsArticle | null>(newsBySlugQuery, { slug }, {
      revalidate: 1800,
      tags: [`news:${slug}`],
    });
  } catch {
    notFound();
  }

  if (!article) notFound();

  const coverUrl = getImageUrl(article.coverImage, { width: 1200, height: 630 });

  return (
    <article className="bg-white">
      {/* Cover image */}
      {coverUrl && (
        <div className="relative h-[28rem] overflow-hidden">
          <Image
            src={coverUrl}
            alt={article.coverImage?.alt ?? article.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="container-institutional max-w-3xl py-12">
        <Breadcrumb
          items={[
            { label: "News", href: "/news" },
            { label: article.title },
          ]}
          className="mb-8"
        />

        <Badge variant="primary" className="mb-4">
          {categoryLabels[article.category] ?? article.category}
        </Badge>

        <h1 className="font-display text-4xl font-bold text-slate-900 mb-4 text-balance">
          {article.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-8 pb-8 border-b border-slate-100">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {formatDate(article.publishedAt)}
          </span>
          {article.author && (
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              {article.author.fullName}
            </span>
          )}
        </div>

        {/* Lead */}
        <p className="text-xl text-slate-600 leading-relaxed mb-8 font-medium">{article.excerpt}</p>

        {/* Body — in production this would be rendered PortableText */}
        <div className="prose prose-slate prose-lg max-w-none">
          <p style={{ whiteSpace: "pre-wrap" }}>{toPlainText(article.body)}</p>
        </div>

        {/* Related links */}
        <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between">
          <Link href="/news" className="flex items-center gap-2 text-sm text-brand-600 hover:text-brand-700 font-medium">
            <ArrowLeft className="w-4 h-4" />
            Back to News
          </Link>
          {article.program?.slug?.current && (
            <Link
              href={`/programs/${article.program.slug.current}`}
              className="text-sm text-teal-600 hover:text-teal-700 font-medium"
            >
              {article.program.title} →
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
