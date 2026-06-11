"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import { INTERVENTION_AREAS } from "@/lib/intervention-areas";

const granteeTypes = [
  { value: "all", label: "All Grantees" },
  { value: "organization", label: "Organizations" },
  { value: "individual", label: "Individuals" },
];

const contractingParties = [
  { value: "all", label: "All Contracting Parties" },
  { value: "AL", label: "🇦🇱 Albania" },
  { value: "BA", label: "🇧🇦 Bosnia & Herzegovina" },
  { value: "XK", label: "🇽🇰 Kosovo*" },
  { value: "MK", label: "🇲🇰 North Macedonia" },
  { value: "ME", label: "🇲🇪 Montenegro" },
  { value: "RS", label: "🇷🇸 Serbia" },
];

export interface ProgramOption {
  slug: string;
  title: string;
}

interface GranteeFiltersProps {
  programs: ProgramOption[];
  activeProgram?: string;
  activeCountry?: string;
  activeType?: string;
  activeArea?: string;
}

export function GranteeFilters({
  programs,
  activeProgram,
  activeCountry,
  activeType,
  activeArea,
}: GranteeFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function setFilter(key: string, value: string) {
    const next = new URLSearchParams(searchParams.toString());
    if (value === "all") next.delete(key);
    else next.set(key, value);
    const qs = next.toString();
    router.replace(qs ? `/grantees?${qs}` : "/grantees", { scroll: false });
  }

  return (
    <div className="flex flex-col gap-4 mb-10">
      {/* Grantee type pills */}
      <div className="flex flex-wrap gap-2">
        {granteeTypes.map(({ value, label }) => {
          const active = value === "all" ? !activeType : activeType === value;
          return (
            <button
              key={value}
              type="button"
              onClick={() => setFilter("type", value)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium transition-colors border",
                active
                  ? "bg-brand-500 text-white border-brand-500"
                  : "bg-white text-slate-600 border-slate-200 hover:border-brand-300"
              )}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-3">
        {/* Program */}
        <select
          className="input max-w-60 text-sm py-1.5"
          value={activeProgram ?? "all"}
          onChange={(e) => setFilter("program", e.target.value)}
          aria-label="Filter by program"
        >
          <option value="all">All Programs</option>
          {programs.map(({ slug, title }) => (
            <option key={slug} value={slug}>{title}</option>
          ))}
        </select>

        {/* Contracting Party */}
        <select
          className="input max-w-60 text-sm py-1.5"
          value={activeCountry ?? "all"}
          onChange={(e) => setFilter("country", e.target.value)}
          aria-label="Filter by Contracting Party"
        >
          {contractingParties.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>

        {/* Area of Intervention */}
        <select
          className="input max-w-60 text-sm py-1.5"
          value={activeArea ?? "all"}
          onChange={(e) => setFilter("area", e.target.value)}
          aria-label="Filter by area of intervention"
        >
          <option value="all">All Areas of Intervention</option>
          {Object.entries(INTERVENTION_AREAS).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
