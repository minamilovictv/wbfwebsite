"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ExternalLink, Calendar, Tag } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { getImageUrl } from "@/lib/sanity/client";
import { formatDate, toPlainText } from "@/lib/utils/formatters";
import { cn } from "@/lib/utils/cn";
import type { NewsArticle, NewsCategory } from "@/types";

const categoryConfig: Record<NewsCategory, { label: string; variant: "primary" | "teal" | "gold" | "neutral" }> = {
  announcement:           { label: "Announcement",  variant: "primary" },
  "press-release":        { label: "Press Release", variant: "teal" },
  publication:            { label: "Publication",   variant: "gold" },
  story:                  { label: "Story",         variant: "neutral" },
  "event-recap":          { label: "Event Recap",   variant: "neutral" },
  "call-for-applications":{ label: "Open Call",     variant: "teal" },
};

function getVideoEmbed(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtube.com") || u.hostname.includes("youtu.be")) {
      const id = u.searchParams.get("v") ?? u.pathname.split("/").pop() ?? "";
      return `https://www.youtube.com/embed/${id}?rel=0`;
    }
    if (u.hostname.includes("vimeo.com")) {
      const id = u.pathname.split("/").filter(Boolean).pop() ?? "";
      return `https://player.vimeo.com/video/${id}`;
    }
  } catch {}
  return null;
}

interface Props {
  article: NewsArticle;
  onClose: () => void;
}

export function NewsModal({ article, onClose }: Props) {
  const cat = categoryConfig[article.category] ?? { label: article.category, variant: "neutral" as const };

  // Gallery: cover + extra images
  const allImages = [
    ...(article.coverImage ? [article.coverImage] : []),
    ...(article.gallery ?? []),
  ];
  const [imgIndex, setImgIndex] = useState(0);

  const prev = useCallback(() => setImgIndex((i) => (i - 1 + allImages.length) % allImages.length), [allImages.length]);
  const next = useCallback(() => setImgIndex((i) => (i + 1) % allImages.length), [allImages.length]);

  // Keyboard handling
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && allImages.length > 1) prev();
      if (e.key === "ArrowRight" && allImages.length > 1) next();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, prev, next, allImages.length]);

  const currentImg = allImages[imgIndex];
  const currentImgUrl = currentImg ? getImageUrl(currentImg, { width: 1200, height: 700 }) : null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 lg:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={article.title}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto flex flex-col">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow hover:bg-slate-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4 text-slate-600" />
        </button>

        {/* Media — image gallery or first video */}
        {allImages.length > 0 && (
          <div className="relative w-full aspect-video bg-slate-900 rounded-t-xl overflow-hidden shrink-0">
            {currentImgUrl ? (
              <Image
                src={currentImgUrl}
                alt={currentImg?.alt ?? article.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 750px"
                priority
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-brand-800 to-brand-600" />
            )}

            {/* Gallery nav */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={next}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Dots */}
                <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                  {allImages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setImgIndex(i)}
                      className={cn(
                        "w-2 h-2 rounded-full transition-all",
                        i === imgIndex ? "bg-white scale-125" : "bg-white/50"
                      )}
                      aria-label={`Image ${i + 1}`}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Caption */}
            {currentImg?.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-4 pb-3 pt-6">
                <p className="text-white text-xs">{currentImg.caption}</p>
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-6 lg:p-8 flex flex-col gap-5">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <Badge variant={cat.variant} size="sm">{cat.label}</Badge>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(article.publishedAt)}
            </span>
            {article.author && (
              <span className="flex items-center gap-1">· {article.author.fullName}</span>
            )}
          </div>

          {/* Program chips */}
          {(() => {
            const progs =
              (article.programs?.length ?? 0) > 0
                ? article.programs!
                : article.program
                  ? [article.program]
                  : [];
            if (progs.length === 0) return null;
            return (
              <div className="flex flex-wrap gap-1.5">
                {progs
                  .filter((p) => p.slug?.current)
                  .map((p) => (
                    <a
                      key={p._id}
                      href={`/programs/${p.slug.current}`}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-50 text-brand-700 border border-brand-200 hover:bg-brand-100 transition-colors"
                    >
                      {p.title}
                    </a>
                  ))}
              </div>
            );
          })()}

          {/* Title */}
          <div>
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-slate-900 text-balance leading-tight">
              {article.title}
            </h2>
            {article.subtitle && (
              <p className="text-lg text-slate-500 mt-2 font-light">{article.subtitle}</p>
            )}
          </div>

          {/* Body */}
          {article.body ? (
            <div className="text-slate-600 leading-relaxed text-[15px] whitespace-pre-line">
              {toPlainText(article.body)}
            </div>
          ) : (
            <p className="text-slate-600 leading-relaxed text-[15px]">{article.excerpt}</p>
          )}

          {/* Videos */}
          {article.videos && article.videos.length > 0 && (
            <div className="space-y-4">
              {article.videos.map((v) => {
                const embed = getVideoEmbed(v.url);
                if (!embed) return null;
                return (
                  <div key={v._key}>
                    {v.title && <p className="text-sm font-semibold text-slate-700 mb-2">{v.title}</p>}
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-slate-900">
                      <iframe
                        src={embed}
                        title={v.title ?? "Video"}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {article.tags.map((tag) => (
                <span key={tag} className="flex items-center gap-1 px-2 py-0.5 bg-slate-100 text-slate-500 text-xs rounded-full">
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Related links */}
          {article.links && article.links.length > 0 && (
            <div className="border-t border-slate-100 pt-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">Related Links</p>
              <div className="flex flex-col gap-2">
                {article.links.map((link) => (
                  <a
                    key={link._key}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-brand-600 hover:text-brand-800 hover:underline transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
