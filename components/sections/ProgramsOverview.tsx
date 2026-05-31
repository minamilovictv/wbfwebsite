import Link from "next/link";
import Image from "next/image";
import {
  Users, Globe2, Leaf, Cpu, BookOpen, Building2, HeartHandshake, ArrowRight
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { getImageUrl } from "@/lib/sanity/client";
import type { Program, ProgramPillar } from "@/types";
import { cn } from "@/lib/utils/cn";

const pillarConfig: Record<ProgramPillar, { label: string; icon: React.ElementType; color: string; bg: string }> = {
  "regional-cooperation": { label: "Regional Cooperation", icon: Globe2, color: "text-brand-600", bg: "bg-brand-50" },
  "youth-mobility": { label: "Youth Mobility", icon: Users, color: "text-teal-600", bg: "bg-teal-50" },
  "cultural-heritage": { label: "Cultural Heritage", icon: BookOpen, color: "text-gold-600", bg: "bg-gold-50" },
  "economic-development": { label: "Economic Development", icon: Building2, color: "text-emerald-600", bg: "bg-emerald-50" },
  "civil-society": { label: "Civil Society", icon: HeartHandshake, color: "text-violet-600", bg: "bg-violet-50" },
  environment: { label: "Environment", icon: Leaf, color: "text-green-600", bg: "bg-green-50" },
  digitalization: { label: "Digitalization", icon: Cpu, color: "text-sky-600", bg: "bg-sky-50" },
  "science-research": { label: "Science & Research", icon: BookOpen, color: "text-rose-600", bg: "bg-rose-50" },
};

const FALLBACK_PILLARS: ProgramPillar[] = [
  "regional-cooperation",
  "youth-mobility",
  "civil-society",
  "environment",
  "cultural-heritage",
  "economic-development",
];

function ProgramCard({ program }: { program: Program }) {
  const config = pillarConfig[program.pillar];
  const Icon = config?.icon ?? Globe2;
  const imageUrl = getImageUrl(program.coverImage, { width: 600, height: 360 });

  return (
    <Link
      href={`/programs/${program.slug.current}`}
      className="group card-hover overflow-hidden flex flex-col"
    >
      <div className="relative h-44 bg-slate-100 overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={program.coverImage?.alt ?? program.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-brand opacity-80 flex items-center justify-center">
            <Icon className="w-12 h-12 text-white/50" />
          </div>
        )}
        <div className="absolute top-3 left-3">
          <Badge variant="primary" size="sm">{config?.label ?? program.pillar}</Badge>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className={cn("w-8 h-8 rounded-md flex items-center justify-center mb-3", config?.bg ?? "bg-slate-50")}>
          <Icon className={cn("w-4 h-4", config?.color ?? "text-slate-600")} />
        </div>
        <h3 className="text-card-title group-hover:text-brand-600 transition-colors mb-2 flex-1">
          {program.title}
        </h3>
        <p className="text-sm text-slate-500 line-clamp-2 mb-4">{program.shortDescription}</p>
        <div className="flex items-center gap-1 text-sm text-brand-500 font-medium group-hover:gap-2 transition-all">
          Learn more <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  );
}

function PillarCard({ pillar }: { pillar: ProgramPillar }) {
  const config = pillarConfig[pillar];
  const Icon = config.icon;
  return (
    <Link
      href={`/programs?pillar=${pillar}`}
      className="group flex flex-col items-center text-center p-6 card-hover"
    >
      <div className={cn("w-14 h-14 rounded-lg flex items-center justify-center mb-4 transition-colors", config.bg, "group-hover:scale-110 transition-transform duration-200")}>
        <Icon className={cn("w-7 h-7", config.color)} />
      </div>
      <h3 className="text-sm font-semibold text-slate-800 group-hover:text-brand-600 transition-colors">
        {config.label}
      </h3>
    </Link>
  );
}

interface ProgramsOverviewProps {
  programs?: Program[];
}

export function ProgramsOverview({ programs = [] }: ProgramsOverviewProps) {
  return (
    <section className="section-padding bg-white">
      <div className="container-institutional">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <SectionHeader
            overline="Our Programs"
            title="Program Portfolio"
            description="From youth exchanges to environmental initiatives, our programs advance cooperation across the Western Balkans."
          />
          <Link href="/programs" className="shrink-0 btn-outline btn-sm">
            All Programs <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {programs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {programs.map((p) => (
              <ProgramCard key={p._id} program={p} />
            ))}
          </div>
        ) : (
          /* Fallback — pillars only when no CMS data */
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {FALLBACK_PILLARS.map((pillar) => (
              <PillarCard key={pillar} pillar={pillar} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
