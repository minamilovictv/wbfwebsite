import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { getImageUrl } from "@/lib/sanity/client";
import { formatDate } from "@/lib/utils/formatters";
import type { NewsArticle, NewsCategory } from "@/types";

const categoryConfig: Record<NewsCategory, { label: string }> = {
  announcement: { label: "Announcement" },
  "press-release": { label: "Press Release" },
  publication: { label: "Publication" },
  story: { label: "Story" },
  "event-recap": { label: "Event Recap" },
  "call-for-applications": { label: "Open Call" },
};

function NewsCard({ article, featured = false }: { article: NewsArticle; featured?: boolean }) {
  if (!article.slug?.current) return null;

  const imageUrl = getImageUrl(article.coverImage, { width: featured ? 900 : 600, height: featured ? 500 : 340 });
  const { label } = categoryConfig[article.category] ?? { label: article.category };

  if (featured) {
    return (
      <Link
        href={`/news/${article.slug.current}`}
        className="group grid md:grid-cols-2 gap-0 card-hover overflow-hidden"
      >
        <div className="relative h-64 md:h-full overflow-hidden bg-slate-100">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={article.coverImage?.alt ?? article.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-brand opacity-80" />
          )}
        </div>
        <div className="p-8 flex flex-col justify-center">
          <Badge variant="primary" className="mb-4 self-start">{label}</Badge>
          <h3 className="font-display text-2xl font-bold text-slate-900 group-hover:text-brand-600 transition-colors mb-3 text-balance">
            {article.title}
          </h3>
          <p className="text-slate-500 line-clamp-3 mb-5">{article.excerpt}</p>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Calendar className="w-3.5 h-3.5" />
            {formatDate(article.publishedAt)}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/news/${article.slug.current}`}
      className="group card-hover overflow-hidden flex flex-col"
    >
      <div className="relative h-48 overflow-hidden bg-slate-100">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={article.coverImage?.alt ?? article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-brand opacity-80" />
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <Badge variant="neutral" size="sm" className="mb-3 self-start">{label}</Badge>
        <h3 className="text-card-title group-hover:text-brand-600 transition-colors mb-2 text-balance flex-1">
          {article.title}
        </h3>
        <p className="text-sm text-slate-500 line-clamp-2 mb-4">{article.excerpt}</p>
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {formatDate(article.publishedAt)}
          </span>
          <span className="flex items-center gap-1 text-brand-500 font-medium group-hover:gap-1.5 transition-all">
            Read <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

interface NewsGridProps {
  articles?: NewsArticle[];
}

export function NewsGrid({ articles = [] }: NewsGridProps) {
  if (articles.length === 0) return null;

  const [featured, ...rest] = articles;

  return (
    <section className="section-padding bg-white">
      <div className="container-institutional">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <SectionHeader
            overline="Latest News"
            title="News & Announcements"
            description="Stay informed on WBF's latest activities, grants, and regional cooperation initiatives."
          />
          <Link href="/news" className="shrink-0 btn-ghost btn-sm">
            All News <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="space-y-5">
          {featured && <NewsCard article={featured} featured />}
          {rest.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {rest.slice(0, 3).map((a) => (
                <NewsCard key={a._id} article={a} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
