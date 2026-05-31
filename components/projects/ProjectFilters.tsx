"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils/cn";

const statuses = [
  { value: "all", label: "All" },
  { value: "ongoing", label: "Ongoing" },
  { value: "completed", label: "Completed" },
];

const countries = [
  { value: "all", label: "All Countries" },
  { value: "AL", label: "🇦🇱 Albania" },
  { value: "BA", label: "🇧🇦 Bosnia & Herz." },
  { value: "XK", label: "🇽🇰 Kosovo*" },
  { value: "MK", label: "🇲🇰 North Macedonia" },
  { value: "ME", label: "🇲🇪 Montenegro" },
  { value: "RS", label: "🇷🇸 Serbia" },
];

interface ProjectFiltersProps {
  activeStatus?: string;
  activeCountry?: string;
}

export function ProjectFilters({ activeStatus, activeCountry }: ProjectFiltersProps) {
  const searchParams = useSearchParams();

  function buildUrl(key: string, value: string) {
    const next = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    return `/projects?${next.toString()}`;
  }

  return (
    <div className="flex flex-wrap gap-4">
      <div className="flex flex-wrap gap-2">
        {statuses.map(({ value, label }) => {
          const active = value === "all" ? !activeStatus : activeStatus === value;
          return (
            <Link
              key={value}
              href={buildUrl("status", value)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium transition-colors border",
                active
                  ? "bg-brand-500 text-white border-brand-500"
                  : "bg-white text-slate-600 border-slate-200 hover:border-brand-300"
              )}
            >
              {label}
            </Link>
          );
        })}
      </div>
      <select
        className="input max-w-[200px] text-sm py-1.5"
        defaultValue={activeCountry ?? "all"}
        onChange={(e) => {
          const url = buildUrl("country", e.target.value);
          window.location.href = url;
        }}
      >
        {countries.map(({ value, label }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
    </div>
  );
}
