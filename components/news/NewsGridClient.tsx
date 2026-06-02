"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import { NewsCard } from "./NewsCard";
import { NewsModal } from "./NewsModal";
import type { NewsArticle, Program } from "@/types";

const categories = [
  { value: "all",                    label: "All" },
  { value: "announcement",           label: "Announcements" },
  { value: "press-release",          label: "Press Releases" },
  { value: "publication",            label: "Publications" },
  { value: "story",                  label: "Stories" },
  { value: "call-for-applications",  label: "Open Calls" },
  { value: "event-recap",            label: "Event Recaps" },
];

interface Props {
  articles: NewsArticle[];
}

function articlePrograms(a: NewsArticle): Program[] {
  if ((a.programs?.length ?? 0) > 0) return a.programs!;
  if (a.program) return [a.program];
  return [];
}

export function NewsGridClient({ articles }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialProgramSlug = searchParams.get("program") ?? "all";

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeProgramSlug, setActiveProgramSlug] = useState<string>(initialProgramSlug);
  const [openArticle, setOpenArticle] = useState<NewsArticle | null>(null);

  useEffect(() => {
    setActiveProgramSlug(searchParams.get("program") ?? "all");
  }, [searchParams]);

  // Build unique program filter options from the article set
  const programOptions = useMemo(() => {
    const map = new Map<string, Program>();
    for (const a of articles) {
      for (const p of articlePrograms(a)) {
        if (p.slug?.current && !map.has(p.slug.current)) map.set(p.slug.current, p);
      }
    }
    return Array.from(map.values()).sort((a, b) => a.title.localeCompare(b.title));
  }, [articles]);

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      if (activeCategory !== "all" && a.category !== activeCategory) return false;
      if (activeProgramSlug !== "all") {
        const slugs = articlePrograms(a).map((p) => p.slug?.current);
        if (!slugs.includes(activeProgramSlug)) return false;
      }
      return true;
    });
  }, [articles, activeCategory, activeProgramSlug]);

  const setProgramFilter = (slug: string) => {
    setActiveProgramSlug(slug);
    const params = new URLSearchParams(searchParams.toString());
    if (slug === "all") params.delete("program");
    else params.set("program", slug);
    const qs = params.toString();
    router.replace(qs ? `/news?${qs}` : "/news", { scroll: false });
  };

  return (
    <>
      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            onClick={() => setActiveCategory(value)}
            className={cn(
              "px-4 py-2 rounded-sm text-sm font-medium transition-colors",
              activeCategory === value
                ? "bg-brand-500 text-white"
                : "text-slate-600 hover:text-brand-600 hover:bg-slate-50"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Program filter (only when there's something to filter by) */}
      {programOptions.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-100 pb-4">
          <button
            type="button"
            onClick={() => setProgramFilter("all")}
            className={cn(
              "px-3 py-1 rounded-full text-xs font-medium border transition-colors",
              activeProgramSlug === "all"
                ? "bg-brand-900 text-white border-brand-900"
                : "bg-white text-slate-600 border-slate-200 hover:border-brand-300 hover:text-brand-600"
            )}
          >
            All programs
          </button>
          {programOptions.map((p) => (
            <button
              key={p._id}
              type="button"
              onClick={() => setProgramFilter(p.slug.current)}
              className={cn(
                "px-3 py-1 rounded-full text-xs font-medium border transition-colors",
                activeProgramSlug === p.slug.current
                  ? "bg-brand-900 text-white border-brand-900"
                  : "bg-white text-slate-600 border-slate-200 hover:border-brand-300 hover:text-brand-600"
              )}
            >
              {p.title}
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((article) => (
            <NewsCard
              key={article._id}
              article={article}
              onClick={() => setOpenArticle(article)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-slate-400">
          <p className="text-lg font-medium text-slate-600">No articles found</p>
        </div>
      )}

      {/* Modal */}
      {openArticle && (
        <NewsModal
          article={openArticle}
          onClose={() => setOpenArticle(null)}
        />
      )}
    </>
  );
}
