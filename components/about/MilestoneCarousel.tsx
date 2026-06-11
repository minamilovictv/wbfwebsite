"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Flag, ArrowUpRight } from "lucide-react";
import { getImageUrl } from "@/lib/sanity/client";
import { cn } from "@/lib/utils/cn";
import type { Milestone } from "@/types";

function MilestoneCard({ milestone }: { milestone: Milestone }) {
  const imageUrl = getImageUrl(milestone.image, { width: 640, height: 360 });
  const external = milestone.ctaUrl?.startsWith("http");

  const card = (
    <div className="card h-full flex flex-col overflow-hidden group">
      {/* Featured image */}
      <div className="relative aspect-[16/9] shrink-0 bg-slate-100 overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={milestone.image?.alt ?? milestone.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 82vw, (max-width: 1024px) 46vw, 23vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-brand flex items-center justify-center">
            <Flag className="w-8 h-8 text-white/40" strokeWidth={1.5} />
          </div>
        )}
        <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-brand-700 text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full shadow-sm">
          {milestone.date}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-[15px] font-semibold text-slate-900 leading-snug mb-2">
          {milestone.title}
        </h3>
        {milestone.description && (
          <p className="text-[13px] text-slate-500 leading-relaxed">{milestone.description}</p>
        )}
        {milestone.ctaUrl && (
          <span className="mt-auto pt-3 inline-flex items-center gap-1 text-[13px] font-semibold text-brand-600 group-hover:text-brand-800 transition-colors">
            {milestone.ctaLabel ?? "Learn more"}
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        )}
      </div>
    </div>
  );

  if (!milestone.ctaUrl) return card;
  return external ? (
    <a href={milestone.ctaUrl} target="_blank" rel="noopener noreferrer" className="block h-full">
      {card}
    </a>
  ) : (
    <Link href={milestone.ctaUrl} className="block h-full">
      {card}
    </Link>
  );
}

export function MilestoneCarousel({ milestones }: { milestones: Milestone[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
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
  }, [updateArrows, milestones.length]);

  const scrollBy = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.85, behavior: "smooth" });
  };

  if (milestones.length === 0) return null;

  return (
    <div className="relative">
      {/* Arrows */}
      <div className="flex justify-end gap-2 mb-5">
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          disabled={!canPrev}
          aria-label="Previous milestones"
          className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:border-brand-500 hover:text-brand-600 transition-colors disabled:opacity-30 disabled:pointer-events-none"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => scrollBy(1)}
          disabled={!canNext}
          aria-label="Next milestones"
          className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:border-brand-500 hover:text-brand-600 transition-colors disabled:opacity-30 disabled:pointer-events-none"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Track — native horizontal scroll with snap (touch swipe on mobile) */}
      <div
        ref={trackRef}
        onScroll={updateArrows}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-thin pb-2 -mx-1 px-1"
        role="region"
        aria-label="WBF milestones timeline"
      >
        {milestones.map((m) => (
          <div
            key={m._id}
            className={cn(
              "snap-start shrink-0 w-[82%] sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.7rem)] xl:w-[calc(25%-0.75rem)]",
            )}
          >
            <MilestoneCard milestone={m} />
          </div>
        ))}
      </div>
    </div>
  );
}
