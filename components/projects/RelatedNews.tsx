"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { NewsCard } from "@/components/news/NewsCard";
import { NewsModal } from "@/components/news/NewsModal";
import type { NewsArticle } from "@/types";

export function RelatedNews({ articles }: { articles: NewsArticle[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [openArticle, setOpenArticle] = useState<NewsArticle | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }, []);

  useEffect(() => {
    updateArrows();
    window.addEventListener("resize", updateArrows);
    return () => window.removeEventListener("resize", updateArrows);
  }, [updateArrows, articles.length]);

  if (articles.length === 0) return null;

  const useCarousel = articles.length > 3;

  const scrollBy = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.85, behavior: "smooth" });
  };

  return (
    <div className="mb-8">
      <div className="flex items-end justify-between mb-4">
        <h2 className="text-xl font-display font-bold text-slate-900">Related News</h2>
        {useCarousel && (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              disabled={!canPrev}
              aria-label="Previous news"
              className="w-9 h-9 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:border-brand-500 hover:text-brand-600 transition-colors disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              disabled={!canNext}
              aria-label="Next news"
              className="w-9 h-9 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:border-brand-500 hover:text-brand-600 transition-colors disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {useCarousel ? (
        <div
          ref={trackRef}
          onScroll={updateArrows}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-thin pb-2 -mx-1 px-1"
          role="region"
          aria-label="Related news carousel"
        >
          {articles.map((article) => (
            <div
              key={article._id}
              className="snap-start shrink-0 w-[85%] sm:w-[calc(50%-0.65rem)] lg:w-[calc(33.333%-0.85rem)]"
            >
              <NewsCard article={article} onClick={() => setOpenArticle(article)} />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.map((article) => (
            <NewsCard key={article._id} article={article} onClick={() => setOpenArticle(article)} />
          ))}
        </div>
      )}

      {openArticle && <NewsModal article={openArticle} onClose={() => setOpenArticle(null)} />}
    </div>
  );
}
