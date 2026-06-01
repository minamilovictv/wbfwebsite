import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Globe2 } from "lucide-react";
import { Badge, StatusBadge } from "@/components/ui/Badge";
import { getImageUrl } from "@/lib/sanity/client";
import { formatCurrency, getCountryFlag } from "@/lib/utils/formatters";
import type { Program } from "@/types";

const pillarLabels: Record<string, string> = {
  "regional-cooperation": "Regional Cooperation",
  "youth-mobility": "Youth Mobility",
  "cultural-heritage": "Cultural Heritage",
  "economic-development": "Economic Development",
  "civil-society": "Civil Society",
  environment: "Environment",
  digitalization: "Digitalization",
  "science-research": "Science & Research",
};

interface ProgramCardProps {
  program: Program;
}

export function ProgramCard({ program }: ProgramCardProps) {
  if (!program.slug?.current) return null;

  const imageUrl = getImageUrl(program.coverImage, { width: 600, height: 340 });

  return (
    <Link
      href={`/programs/${program.slug.current}`}
      className="group card-hover overflow-hidden flex flex-col"
    >
      {/* Cover */}
      <div className="relative h-48 bg-slate-100 overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={program.coverImage?.alt ?? program.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-brand flex items-center justify-center">
            <Globe2 className="w-12 h-12 text-white/30" />
          </div>
        )}
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute bottom-3 left-3">
          <Badge variant="primary" size="sm">
            {pillarLabels[program.pillar] ?? program.pillar}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <StatusBadge status={program.status} />
        </div>
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-card-title group-hover:text-brand-600 transition-colors mb-2 text-balance">
          {program.title}
        </h3>
        <p className="text-sm text-slate-500 line-clamp-2 mb-4 flex-1">
          {program.shortDescription}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-100 pt-4 mt-auto">
          <div className="flex gap-1">
            {program.countries.slice(0, 4).map((c) => (
              <span key={c} title={c}>{getCountryFlag(c)}</span>
            ))}
            {program.countries.length > 4 && (
              <span>+{program.countries.length - 4}</span>
            )}
          </div>
          {program.totalBudget && (
            <span className="font-medium text-slate-600">
              {formatCurrency(program.totalBudget, program.currency)}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 text-brand-500 text-sm font-medium mt-4 group-hover:gap-2 transition-all">
          Explore program <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  );
}
