import Link from "next/link";
import Image from "next/image";
import { Calendar } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { getImageUrl } from "@/lib/sanity/client";
import { formatDate } from "@/lib/utils/formatters";
import type { NewsArticle, NewsCategory } from "@/types";

const categoryConfig: Record<NewsCategory, { label: string; variant: "primary" | "teal" | "gold" | "neutral" }> = {
  announcement: { label: "Announcement", variant: "primary" },
  "press-release": { label: "Press Release", variant: "teal" },
  publication: { label: "Publication", variant: "gold" },
  story: { label: "Story", variant: "neutral" },
  "event-recap": { label: "Event Recap", variant: "neutral" },
  "call-for-applications": { label: "Open Call", variant: "teal" },
};

export function NewsCard({ article }: { article: NewsArticle }) {
  const imageUrl = getImageUrl(article.coverImage, { width: 600, height: 340 });
  const cat = categoryConfig[article.category] ?? { label: article.category, variant: "neutral" as const };

  return (
    <Link
      href={`/news/${article.slug.current}`}
      className="group card-hover overflow-hidden flex flex-col"
    >
      <div className="relative h-48 bg-slate-100 overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={article.coverImage?.alt ?? article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-brand-100 to-brand-200" />
        )}
        <div className="absolute top-3 left-3">
          <Badge variant={cat.variant} size="sm">{cat.label}</Badge>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-card-title group-hover:text-brand-600 transition-colors mb-2 text-balance flex-1">
          {article.title}
        </h3>
        <p className="text-sm text-slate-500 line-clamp-2 mb-4">{article.excerpt}</p>
        <div className="flex items-center gap-2 text-xs text-slate-400 mt-auto">
          <Calendar className="w-3.5 h-3.5" />
          {formatDate(article.publishedAt)}
          {article.author && (
            <>
              <span>·</span>
              <span>{article.author.fullName}</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
