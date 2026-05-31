"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import { NewsCard } from "./NewsCard";
import { NewsModal } from "./NewsModal";
import type { NewsArticle, NewsCategory } from "@/types";

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

export function NewsGridClient({ articles }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [openArticle, setOpenArticle] = useState<NewsArticle | null>(null);

  const filtered =
    activeCategory === "all"
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  return (
    <>
      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-100 pb-4">
        {categories.map(({ value, label }) => (
          <button
            key={value}
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
