import Image from "next/image";
import { Calendar } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { getImageUrl } from "@/lib/sanity/client";
import { formatDate } from "@/lib/utils/formatters";
import type { NewsArticle, NewsCategory } from "@/types";

const categoryConfig: Record<NewsCategory, { label: string; variant: "primary" | "teal" | "gold" | "neutral" }> = {
  announcement:            { label: "Announcement",  variant: "primary" },
  "press-release":         { label: "Press Release", variant: "teal" },
  publication:             { label: "Publication",   variant: "gold" },
  story:                   { label: "Story",         variant: "neutral" },
  "event-recap":           { label: "Event Recap",   variant: "neutral" },
  "call-for-applications": { label: "Open Call",     variant: "teal" },
};

interface Props {
  article: NewsArticle;
  onClick: () => void;
}

export function NewsCard({ article, onClick }: Props) {
  const imageUrl = getImageUrl(article.coverImage, { width: 600, height: 340 });
  const cat = categoryConfig[article.category] ?? { label: article.category, variant: "neutral" as const };
  const hasGallery = (article.gallery?.length ?? 0) > 0;
  const hasVideo = (article.videos?.length ?? 0) > 0;

  return (
    <button
      onClick={onClick}
      className="group card-hover overflow-hidden flex flex-col text-left w-full"
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
        <div className="absolute top-3 left-3 flex gap-1.5">
          <Badge variant={cat.variant} size="sm">{cat.label}</Badge>
          {hasGallery && (
            <span className="px-1.5 py-0.5 bg-black/50 text-white text-[10px] rounded backdrop-blur-sm">
              📷 {(article.gallery?.length ?? 0) + (article.coverImage ? 1 : 0)}
            </span>
          )}
          {hasVideo && (
            <span className="px-1.5 py-0.5 bg-black/50 text-white text-[10px] rounded backdrop-blur-sm">
              ▶ Video
            </span>
          )}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-card-title group-hover:text-brand-600 transition-colors mb-2 text-balance flex-1">
          {article.title}
        </h3>
        {article.subtitle && (
          <p className="text-xs text-slate-400 mb-1 font-medium">{article.subtitle}</p>
        )}
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
    </button>
  );
}
