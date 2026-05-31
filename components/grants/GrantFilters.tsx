"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import type { GrantType, GrantStatus, CountryCode } from "@/types";

const statuses: { value: GrantStatus | "all"; label: string }[] = [
  { value: "all", label: "All Statuses" },
  { value: "open", label: "Open" },
  { value: "upcoming", label: "Upcoming" },
  { value: "evaluation", label: "Under Evaluation" },
  { value: "closed", label: "Closed" },
  { value: "awarded", label: "Awarded" },
];

const types: { value: GrantType | "all"; label: string }[] = [
  { value: "all", label: "All Types" },
  { value: "mobility", label: "Mobility" },
  { value: "project", label: "Project Grant" },
  { value: "institution-building", label: "Institution Building" },
  { value: "research", label: "Research" },
  { value: "cultural", label: "Cultural" },
  { value: "youth", label: "Youth" },
  { value: "civil-society", label: "Civil Society" },
  { value: "environmental", label: "Environmental" },
];

const countries: { value: CountryCode | "all"; label: string }[] = [
  { value: "all", label: "All Countries" },
  { value: "AL", label: "🇦🇱 Albania" },
  { value: "BA", label: "🇧🇦 Bosnia & Herz." },
  { value: "XK", label: "🇽🇰 Kosovo*" },
  { value: "MK", label: "🇲🇰 North Macedonia" },
  { value: "ME", label: "🇲🇪 Montenegro" },
  { value: "RS", label: "🇷🇸 Serbia" },
];

function buildHref(
  current: URLSearchParams,
  key: string,
  value: string
): string {
  const next = new URLSearchParams(current.toString());
  if (value === "all") {
    next.delete(key);
  } else {
    next.set(key, value);
  }
  return `/grants?${next.toString()}`;
}

interface FilterGroupProps {
  title: string;
  paramKey: string;
  options: { value: string; label: string }[];
  activeValue?: string;
}

function FilterGroup({ title, paramKey, options, activeValue }: FilterGroupProps) {
  const searchParams = useSearchParams();
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
        {title}
      </h4>
      <div className="space-y-1">
        {options.map(({ value, label }) => {
          const isActive = value === "all" ? !activeValue : activeValue === value;
          return (
            <Link
              key={value}
              href={buildHref(searchParams, paramKey, value)}
              className={cn(
                "block px-3 py-1.5 rounded-md text-sm transition-colors",
                isActive
                  ? "bg-brand-50 text-brand-700 font-medium"
                  : "text-slate-600 hover:bg-slate-50"
              )}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

interface GrantFiltersPanelProps {
  activeType?: string;
  activeStatus?: string;
  activeCountry?: string;
}

export function GrantFiltersPanel({ activeType, activeStatus, activeCountry }: GrantFiltersPanelProps) {
  return (
    <div className="bg-white rounded-lg border border-slate-100 p-5 space-y-6 sticky top-24">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-slate-800">Filters</h3>
        <Link href="/grants" className="text-xs text-brand-600 hover:text-brand-700">
          Clear all
        </Link>
      </div>

      <FilterGroup
        title="Status"
        paramKey="status"
        options={statuses}
        activeValue={activeStatus}
      />
      <FilterGroup
        title="Grant Type"
        paramKey="type"
        options={types}
        activeValue={activeType}
      />
      <FilterGroup
        title="Country"
        paramKey="country"
        options={countries}
        activeValue={activeCountry}
      />
    </div>
  );
}
