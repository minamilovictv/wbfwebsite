"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { NewsCard } from "@/components/news/NewsCard";
import { NewsModal } from "@/components/news/NewsModal";
import type { NewsArticle } from "@/types";

interface Props {
  programSlug: string;
  programTitle: string;
  articles?: NewsArticle[];
  total?: number;
}

export function ProgramNews({ programSlug, programTitle, articles, total }: Props) {
  const items = articles ?? [];
  const totalCount = total ?? items.length;
  const hasMore = totalCount > items.length;
  const trackRef = useRef<HTMLDivElement>(null);
  const [openArticle, setOpenArticle] = useState<NewsArticle | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateButtons = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    updateButtons();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateButtons, { passive: true });
    window.addEventListener("resize", updateButtons);
    return () => {
      el.removeEventListener("scroll", updateButtons);
      window.removeEventListener("resize", updateButtons);
    };
  }, [updateButtons, items.length]);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-news-slide]");
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  if (items.length === 0) return null;

  const showNav = items.length > 1 || hasMore;

  return (
    <section className="section-padding bg-white" id="news">
      <div className="container-institutional">
        <div className="flex items-end justify-between gap-6 mb-10 flex-wrap">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-600 mb-3">
              05 / News & Updates
            </p>
            <h2 className="font-display text-3xl font-bold text-slate-900 mb-3">
              Latest from {programTitle}
            </h2>
            <p className="text-base text-slate-500">
              {totalCount > items.length
                ? `Showing the ${items.length} most recent of ${totalCount} related articles.`
                : "Project updates, stories, and announcements."}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {hasMore && (
              <Link
                href={`/news?program=${programSlug}`}
                className="text-sm font-semibold text-brand-600 hover:text-brand-700 inline-flex items-center gap-1"
              >
                View all <ArrowRight className="w-4 h-4" />
              </Link>
            )}
            {showNav && (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => scrollBy(-1)}
                  disabled={!canScrollLeft}
                  aria-label="Previous"
                  className={cn(
                    "w-10 h-10 rounded-full border flex items-center justify-center transition-colors",
                    canScrollLeft
                      ? "border-slate-200 text-slate-700 hover:border-brand-400 hover:text-brand-600"
                      : "border-slate-100 text-slate-300 cursor-not-allowed",
                  )}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollBy(1)}
                  disabled={!canScrollRight}
                  aria-label="Next"
                  className={cn(
                    "w-10 h-10 rounded-full border flex items-center justify-center transition-colors",
                    canScrollRight
                      ? "border-slate-200 text-slate-700 hover:border-brand-400 hover:text-brand-600"
                      : "border-slate-100 text-slate-300 cursor-not-allowed",
                  )}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div
          ref={trackRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 -mx-2 px-2 [scrollbar-width:thin]"
        >
          {items.map((article) => (
            <div
              key={article._id}
              data-news-slide
              className="snap-start shrink-0 w-[88%] sm:w-[55%] md:w-[42%] lg:w-[32%]"
            >
              <NewsCard article={article} onClick={() => setOpenArticle(article)} />
            </div>
          ))}

          {hasMore && (
            <div
              data-news-slide
              className="snap-start shrink-0 w-[88%] sm:w-[55%] md:w-[42%] lg:w-[32%]"
            >
              <Link
                href={`/news?program=${programSlug}`}
                className="card-hover flex flex-col items-center justify-center text-center h-full min-h-[20rem] p-8 border border-dashed border-slate-200 hover:border-brand-400 group"
              >
                <div className="w-12 h-12 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center mb-4 group-hover:bg-brand-100">
                  <ArrowRight className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-slate-900 mb-1">
                  See all {totalCount} articles
                </h3>
                <p className="text-sm text-slate-500">
                  Browse the full archive for {programTitle}.
                </p>
              </Link>
            </div>
          )}
        </div>
      </div>

      {openArticle && <NewsModal article={openArticle} onClose={() => setOpenArticle(null)} />}
    </section>
  );
}
