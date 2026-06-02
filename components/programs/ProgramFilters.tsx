"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import type { ProgramPillar } from "@/types";

const pillars: { value: ProgramPillar | "all"; label: string }[] = [
  { value: "all", label: "All Programs" },
  { value: "regional-cooperation", label: "Regional Cooperation" },
  { value: "youth-mobility", label: "Youth Mobility" },
  { value: "civil-society", label: "Civil Society" },
  { value: "governance", label: "Governance" },
  { value: "cultural-heritage", label: "Cultural Heritage" },
  { value: "economic-development", label: "Economic Development" },
  { value: "environment", label: "Environment" },
  { value: "digitalization", label: "Digitalization" },
  { value: "science-research", label: "Science & Research" },
];

interface ProgramFiltersProps {
  activePillar?: string;
  activeStatus?: string;
}

export function ProgramFilters({ activePillar, activeStatus }: ProgramFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {pillars.map(({ value, label }) => {
        const isActive = value === "all" ? !activePillar : activePillar === value;
        const href = value === "all" ? "/programs" : `/programs?pillar=${value}`;
        return (
          <Link
            key={value}
            href={href}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-medium transition-colors border",
              isActive
                ? "bg-brand-500 text-white border-brand-500"
                : "bg-white text-slate-600 border-slate-200 hover:border-brand-300 hover:text-brand-600"
            )}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
